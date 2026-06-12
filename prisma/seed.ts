import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: "Raw Materials" },
      update: {},
      create: { name: "Raw Materials", description: "Base materials used in manufacturing" },
    }),
    prisma.category.upsert({
      where: { name: "Finished Goods" },
      update: {},
      create: { name: "Finished Goods", description: "Completed products ready for sale" },
    }),
    prisma.category.upsert({
      where: { name: "Spare Parts" },
      update: {},
      create: { name: "Spare Parts", description: "Machine and equipment spare parts" },
    }),
    prisma.category.upsert({
      where: { name: "Packaging" },
      update: {},
      create: { name: "Packaging", description: "Packaging materials and supplies" },
    }),
    prisma.category.upsert({
      where: { name: "Tools & Equipment" },
      update: {},
      create: { name: "Tools & Equipment", description: "Tools used in production" },
    }),
  ]);

  // Create suppliers
  const suppliers = await Promise.all([
    prisma.supplier.create({
      data: {
        companyName: "Tata Steel Ltd",
        contactPerson: "Rajesh Kumar",
        phone: "+91 98765 43210",
        email: "rajesh@tatasteel.com",
        gstNumber: "27AABCT3518Q1ZP",
        address: "Mumbai, Maharashtra",
        notes: "Primary steel supplier",
      },
    }),
    prisma.supplier.create({
      data: {
        companyName: "Reliance Industries",
        contactPerson: "Priya Sharma",
        phone: "+91 87654 32109",
        email: "priya@ril.com",
        gstNumber: "27AAGCR5390K1ZS",
        address: "Navi Mumbai, Maharashtra",
        notes: "Chemical and polymer supplier",
      },
    }),
    prisma.supplier.create({
      data: {
        companyName: "Mahindra Logistics",
        contactPerson: "Amit Singh",
        phone: "+91 76543 21098",
        email: "amit@mahindra.com",
        gstNumber: "27AABCM4598P1Z8",
        address: "Pune, Maharashtra",
        notes: "Packaging and logistics",
      },
    }),
  ]);

  // Create products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: "Steel Rod 12mm",
        sku: "STL-ROD-12MM",
        barcode: "1234567890123",
        categoryId: categories[0].id,
        supplierId: suppliers[0].id,
        purchasePrice: 850,
        sellingPrice: 1020,
        quantity: 500,
        unit: "KG",
        reorderLevel: 100,
        description: "High-grade TMT steel rod, 12mm diameter",
      },
    }),
    prisma.product.create({
      data: {
        name: "Industrial Bearings 6205",
        sku: "BRG-6205",
        barcode: "2345678901234",
        categoryId: categories[2].id,
        supplierId: suppliers[0].id,
        purchasePrice: 145,
        sellingPrice: 220,
        quantity: 8,
        unit: "PCS",
        reorderLevel: 20,
        description: "Deep groove ball bearing 6205-2RS",
      },
    }),
    prisma.product.create({
      data: {
        name: "PVC Pipe 2 inch",
        sku: "PVC-2IN",
        barcode: "3456789012345",
        categoryId: categories[0].id,
        supplierId: suppliers[1].id,
        purchasePrice: 320,
        sellingPrice: 450,
        quantity: 200,
        unit: "MTR",
        reorderLevel: 50,
        description: "Schedule 40 PVC pressure pipe",
      },
    }),
    prisma.product.create({
      data: {
        name: "Cardboard Box 12x10x8",
        sku: "PKG-BOX-12",
        barcode: "4567890123456",
        categoryId: categories[3].id,
        supplierId: suppliers[2].id,
        purchasePrice: 25,
        sellingPrice: 40,
        quantity: 1200,
        unit: "PCS",
        reorderLevel: 200,
        description: "5-ply corrugated cardboard box",
      },
    }),
    prisma.product.create({
      data: {
        name: "Hydraulic Oil 46",
        sku: "OIL-HYD-46",
        barcode: "5678901234567",
        categoryId: categories[0].id,
        supplierId: suppliers[1].id,
        purchasePrice: 480,
        sellingPrice: 620,
        quantity: 12,
        unit: "LTR",
        reorderLevel: 50,
        description: "ISO VG 46 hydraulic oil, 205L drum",
      },
    }),
    prisma.product.create({
      data: {
        name: "Safety Helmet ISI",
        sku: "SFT-HELM-ISI",
        barcode: "6789012345678",
        categoryId: categories[4].id,
        supplierId: suppliers[2].id,
        purchasePrice: 180,
        sellingPrice: 280,
        quantity: 45,
        unit: "PCS",
        reorderLevel: 20,
        description: "ISI marked HDPE safety helmet",
      },
    }),
  ]);

  // Create users
  const hashedAdmin = await bcrypt.hash("Admin@123", 12);
  const hashedManager = await bcrypt.hash("Manager@123", 12);
  const hashedEmployee = await bcrypt.hash("Employee@123", 12);

  await Promise.all([
    prisma.user.upsert({
      where: { email: "admin@industrialvisit.com" },
      update: {},
      create: {
        name: "Admin User",
        email: "admin@industrialvisit.com",
        password: hashedAdmin,
        role: "ADMIN",
      },
    }),
    prisma.user.upsert({
      where: { email: "manager@industrialvisit.com" },
      update: {},
      create: {
        name: "Manager User",
        email: "manager@industrialvisit.com",
        password: hashedManager,
        role: "MANAGER",
      },
    }),
    prisma.user.upsert({
      where: { email: "employee@industrialvisit.com" },
      update: {},
      create: {
        name: "Employee User",
        email: "employee@industrialvisit.com",
        password: hashedEmployee,
        role: "EMPLOYEE",
      },
    }),
  ]);

  console.log("✅ Database seeded successfully!");
  console.log("📧 Login credentials:");
  console.log("   Admin:    admin@industrialvisit.com / Admin@123");
  console.log("   Manager:  manager@industrialvisit.com / Manager@123");
  console.log("   Employee: employee@industrialvisit.com / Employee@123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
