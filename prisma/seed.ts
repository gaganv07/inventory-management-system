import { PrismaClient, Role, ProductStatus, StockTransactionType, PurchaseOrderStatus, NotificationType } from "@prisma/client";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

// Manually load .env variables
try {
  const envPath = path.resolve(process.cwd(), ".env");
  if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, "utf-8");
    envConfig.split("\n").forEach(line => {
      const parts = line.split("=");
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const value = parts.slice(1).join("=").trim().replace(/^["']|["']$/g, "");
        if (key && !process.env[key]) {
          process.env[key] = value;
        }
      }
    });
  }
} catch (err) {
  console.warn("Could not load .env file manually:", err);
}

import {
  mockUsers,
  mockCategories,
  mockSuppliers,
  mockProducts,
  mockPurchaseOrders,
  mockTransactions,
  mockNotifications,
  mockAuditLogs
} from "../lib/mock-data";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  console.log("🗑️ Clearing existing data...");
  await prisma.auditLog.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.stockTransaction.deleteMany();
  await prisma.purchaseOrderItem.deleteMany();
  await prisma.purchaseOrder.deleteMany();
  await prisma.product.deleteMany();
  await prisma.supplier.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  console.log("👥 Seeding Users (23)...");
  const hashedAdmin = await bcrypt.hash("Admin@123", 12);
  const hashedManager = await bcrypt.hash("Manager@123", 12);
  const hashedEmployee = await bcrypt.hash("Employee@123", 12);

  await Promise.all(
    mockUsers.map(user => {
      let password = hashedEmployee;
      if (user.role === "ADMIN") {
        password = hashedAdmin;
      } else if (user.role === "MANAGER") {
        password = hashedManager;
      }
      return prisma.user.create({
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          password,
          role: user.role as Role,
          isActive: user.isActive,
          createdAt: new Date(user.createdAt),
          updatedAt: new Date(user.updatedAt)
        }
      });
    })
  );

  console.log("📁 Seeding Categories (25)...");
  await Promise.all(
    mockCategories.map(cat =>
      prisma.category.create({
        data: {
          id: cat.id,
          name: cat.name,
          description: cat.description,
          isActive: cat.isActive,
          createdAt: new Date(cat.createdAt),
          updatedAt: new Date(cat.updatedAt)
        }
      })
    )
  );

  console.log("🏢 Seeding Suppliers (40)...");
  await Promise.all(
    mockSuppliers.map(sup =>
      prisma.supplier.create({
        data: {
          id: sup.id,
          companyName: sup.companyName,
          contactPerson: sup.contactPerson,
          phone: sup.phone,
          email: sup.email,
          gstNumber: sup.gstNumber,
          address: sup.address,
          notes: sup.notes,
          isActive: sup.isActive,
          createdAt: new Date(sup.createdAt),
          updatedAt: new Date(sup.updatedAt)
        }
      })
    )
  );

  console.log("📦 Seeding Products (500)...");
  // Seed in chunks to avoid overwhelming the database with 500 simultaneous connections
  const productChunks = [];
  const chunkSize = 50;
  for (let i = 0; i < mockProducts.length; i += chunkSize) {
    productChunks.push(mockProducts.slice(i, i + chunkSize));
  }

  for (const chunk of productChunks) {
    await Promise.all(
      chunk.map(prod =>
        prisma.product.create({
          data: {
            id: prod.id,
            name: prod.name,
            sku: prod.sku,
            barcode: prod.barcode,
            categoryId: prod.categoryId,
            supplierId: prod.supplierId,
            purchasePrice: prod.purchasePrice,
            sellingPrice: prod.sellingPrice,
            quantity: prod.quantity,
            unit: prod.unit,
            reorderLevel: prod.reorderLevel,
            description: prod.description,
            image: prod.image,
            status: prod.status as ProductStatus,
            createdAt: new Date(prod.createdAt),
            updatedAt: new Date(prod.updatedAt)
          }
        })
      )
    );
  }

  console.log("📋 Seeding Purchase Orders & Items (200)...");
  // Seed purchase orders sequentially to prevent transaction issues
  for (const po of mockPurchaseOrders) {
    await prisma.purchaseOrder.create({
      data: {
        id: po.id,
        poNumber: po.poNumber,
        supplierId: po.supplierId,
        status: po.status as PurchaseOrderStatus,
        orderDate: new Date(po.orderDate),
        expectedDate: po.expectedDate ? new Date(po.expectedDate) : null,
        totalAmount: po.totalAmount,
        notes: po.notes,
        createdById: po.createdById,
        createdAt: new Date(po.createdAt),
        updatedAt: new Date(po.updatedAt)
      }
    });

    if (po.items && po.items.length > 0) {
      await Promise.all(
        po.items.map(item =>
          prisma.purchaseOrderItem.create({
            data: {
              id: item.id,
              purchaseOrderId: item.purchaseOrderId,
              productId: item.productId,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              totalPrice: item.totalPrice
            }
          })
        )
      );
    }
  }

  console.log("🔄 Seeding Stock Transactions (5050)...");
  const transactionChunks = [];
  for (let i = 0; i < mockTransactions.length; i += 250) {
    transactionChunks.push(mockTransactions.slice(i, i + 250));
  }

  for (const chunk of transactionChunks) {
    await Promise.all(
      chunk.map(tx =>
        prisma.stockTransaction.create({
          data: {
            id: tx.id,
            type: tx.type as StockTransactionType,
            productId: tx.productId,
            quantity: tx.quantity,
            price: tx.price,
            invoiceNumber: tx.invoiceNumber,
            supplierId: tx.supplierId,
            customerId: tx.customerId,
            remarks: tx.remarks,
            date: new Date(tx.date),
            createdById: tx.createdById,
            createdAt: new Date(tx.createdAt)
          }
        })
      )
    );
  }

  console.log("🔔 Seeding Notifications (100)...");
  const notifChunks = [];
  for (let i = 0; i < mockNotifications.length; i += 50) {
    notifChunks.push(mockNotifications.slice(i, i + 50));
  }

  for (const chunk of notifChunks) {
    await Promise.all(
      chunk.map(notif => {
        let type: NotificationType = NotificationType.SYSTEM;
        if (notif.type === "warning") type = NotificationType.LOW_STOCK;
        else if (notif.type === "success") type = NotificationType.STOCK_IN;
        else if (notif.type === "info") type = NotificationType.NEW_ORDER;

        return prisma.notification.create({
          data: {
            id: notif.id,
            type,
            title: notif.title,
            message: notif.message,
            isRead: notif.isRead,
            createdAt: new Date(notif.createdAt)
          }
        });
      })
    );
  }

  console.log("📜 Seeding Audit Logs (1000)...");
  const auditChunks = [];
  for (let i = 0; i < mockAuditLogs.length; i += 200) {
    auditChunks.push(mockAuditLogs.slice(i, i + 200));
  }

  for (const chunk of auditChunks) {
    await Promise.all(
      chunk.map(log =>
        prisma.auditLog.create({
          data: {
            id: log.id,
            action: log.action,
            entity: log.entity,
            entityId: log.entityId,
            ipAddress: log.ipAddress,
            createdAt: new Date(log.createdAt)
          }
        })
      )
    );
  }

  console.log("✅ Database seeded successfully!");
  console.log("📧 Demo account access:");
  console.log("   Admin:    admin@abcindustries.com / Admin@123");
  console.log("   Manager:  manager@abcindustries.com / Manager@123");
  console.log("   Employee: employee@abcindustries.com / Employee@123");
}

main()
  .catch(e => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
