// Mock data for demonstration — replace with real API calls when DB is connected

import type {
  Product, Category, Supplier, StockTransaction, PurchaseOrder,
  DashboardStats, MonthlyStockData, CategoryDistribution, User,
} from "@/types";

export const mockCategories: Category[] = [
  { id: "c1", name: "Raw Materials", description: "Base materials used in manufacturing", isActive: true, createdAt: "2024-01-10", updatedAt: "2024-06-01", _count: { products: 12 } },
  { id: "c2", name: "Finished Goods", description: "Completed products ready for sale", isActive: true, createdAt: "2024-01-10", updatedAt: "2024-06-01", _count: { products: 8 } },
  { id: "c3", name: "Spare Parts", description: "Machine and equipment spare parts", isActive: true, createdAt: "2024-01-15", updatedAt: "2024-06-01", _count: { products: 24 } },
  { id: "c4", name: "Packaging", description: "Packaging materials and supplies", isActive: true, createdAt: "2024-02-01", updatedAt: "2024-06-01", _count: { products: 6 } },
  { id: "c5", name: "Tools & Equipment", description: "Tools used in production", isActive: true, createdAt: "2024-02-10", updatedAt: "2024-06-01", _count: { products: 15 } },
  { id: "c6", name: "Safety & PPE", description: "Personal protective equipment", isActive: false, createdAt: "2024-03-01", updatedAt: "2024-06-01", _count: { products: 9 } },
];

export const mockSuppliers: Supplier[] = [
  { id: "s1", companyName: "Tata Steel Ltd", contactPerson: "Rajesh Kumar", phone: "+91 98765 43210", email: "rajesh@tatasteel.com", gstNumber: "27AABCT3518Q1ZP", address: "Mumbai, Maharashtra", isActive: true, createdAt: "2024-01-05", updatedAt: "2024-06-01", _count: { products: 15 } },
  { id: "s2", companyName: "Reliance Industries", contactPerson: "Priya Sharma", phone: "+91 87654 32109", email: "priya@ril.com", gstNumber: "27AAGCR5390K1ZS", address: "Navi Mumbai, Maharashtra", isActive: true, createdAt: "2024-01-08", updatedAt: "2024-06-01", _count: { products: 22 } },
  { id: "s3", companyName: "Mahindra Logistics", contactPerson: "Amit Singh", phone: "+91 76543 21098", email: "amit@mahindra.com", gstNumber: "27AABCM4598P1Z8", address: "Pune, Maharashtra", isActive: true, createdAt: "2024-02-01", updatedAt: "2024-06-01", _count: { products: 11 } },
  { id: "s4", companyName: "L&T Infrastructure", contactPerson: "Suresh Patel", phone: "+91 65432 10987", email: "suresh@lnt.com", gstNumber: "27AAACL1074F1ZO", address: "Chennai, Tamil Nadu", isActive: true, createdAt: "2024-02-15", updatedAt: "2024-06-01", _count: { products: 8 } },
  { id: "s5", companyName: "BHEL Suppliers", contactPerson: "Kavitha Rao", phone: "+91 54321 09876", email: "kavitha@bhel.com", gstNumber: "07AABCB5723P1Z8", address: "Delhi", isActive: false, createdAt: "2024-03-01", updatedAt: "2024-06-01", _count: { products: 4 } },
];

export const mockProducts: Product[] = [
  { id: "p1", name: "Steel Rod 12mm", sku: "STL-ROD-12MM", barcode: "1234567890123", categoryId: "c1", supplierId: "s1", purchasePrice: 850, sellingPrice: 1020, quantity: 500, unit: "KG", reorderLevel: 100, description: "High-grade TMT steel rod, 12mm diameter", status: "ACTIVE", createdAt: "2024-01-15", updatedAt: "2024-06-10", category: mockCategories[0], supplier: mockSuppliers[0] },
  { id: "p2", name: "Industrial Bearings 6205", sku: "BRG-6205", barcode: "2345678901234", categoryId: "c3", supplierId: "s1", purchasePrice: 145, sellingPrice: 220, quantity: 8, unit: "PCS", reorderLevel: 20, description: "Deep groove ball bearing 6205-2RS", status: "ACTIVE", createdAt: "2024-02-10", updatedAt: "2024-06-10", category: mockCategories[2], supplier: mockSuppliers[0] },
  { id: "p3", name: "PVC Pipe 2 inch", sku: "PVC-2IN", barcode: "3456789012345", categoryId: "c1", supplierId: "s2", purchasePrice: 320, sellingPrice: 450, quantity: 200, unit: "MTR", reorderLevel: 50, description: "Schedule 40 PVC pressure pipe", status: "ACTIVE", createdAt: "2024-02-20", updatedAt: "2024-06-10", category: mockCategories[0], supplier: mockSuppliers[1] },
  { id: "p4", name: "Cardboard Box 12x10x8", sku: "PKG-BOX-12", barcode: "4567890123456", categoryId: "c4", supplierId: "s3", purchasePrice: 25, sellingPrice: 40, quantity: 1200, unit: "PCS", reorderLevel: 200, description: "5-ply corrugated cardboard box", status: "ACTIVE", createdAt: "2024-03-05", updatedAt: "2024-06-10", category: mockCategories[3], supplier: mockSuppliers[2] },
  { id: "p5", name: "Hydraulic Oil 46", sku: "OIL-HYD-46", barcode: "5678901234567", categoryId: "c1", supplierId: "s2", purchasePrice: 480, sellingPrice: 620, quantity: 12, unit: "LTR", reorderLevel: 50, description: "ISO VG 46 hydraulic oil", status: "ACTIVE", createdAt: "2024-03-10", updatedAt: "2024-06-10", category: mockCategories[0], supplier: mockSuppliers[1] },
  { id: "p6", name: "Safety Helmet ISI", sku: "SFT-HELM-ISI", barcode: "6789012345678", categoryId: "c5", supplierId: "s3", purchasePrice: 180, sellingPrice: 280, quantity: 45, unit: "PCS", reorderLevel: 20, description: "ISI marked HDPE safety helmet", status: "ACTIVE", createdAt: "2024-03-15", updatedAt: "2024-06-10", category: mockCategories[4], supplier: mockSuppliers[2] },
  { id: "p7", name: "Electric Motor 5HP", sku: "MOT-5HP-3PH", barcode: "7890123456789", categoryId: "c3", supplierId: "s4", purchasePrice: 12500, sellingPrice: 16000, quantity: 3, unit: "PCS", reorderLevel: 5, description: "3-phase induction motor, 5HP, 1440RPM", status: "ACTIVE", createdAt: "2024-04-01", updatedAt: "2024-06-10", category: mockCategories[2], supplier: mockSuppliers[3] },
  { id: "p8", name: "Welding Electrode E6013", sku: "WLD-E6013-3.15", barcode: "8901234567890", categoryId: "c4", supplierId: "s1", purchasePrice: 85, sellingPrice: 120, quantity: 0, unit: "KG", reorderLevel: 50, description: "General purpose welding electrode 3.15mm", status: "ACTIVE", createdAt: "2024-04-10", updatedAt: "2024-06-10", category: mockCategories[3], supplier: mockSuppliers[0] },
  { id: "p9", name: "V-Belt A42", sku: "BELT-V-A42", barcode: "9012345678901", categoryId: "c3", supplierId: "s2", purchasePrice: 220, sellingPrice: 340, quantity: 18, unit: "PCS", reorderLevel: 25, description: "Classical V-belt A section, 42 inch", status: "ACTIVE", createdAt: "2024-04-20", updatedAt: "2024-06-10", category: mockCategories[2], supplier: mockSuppliers[1] },
  { id: "p10", name: "Angle Grinder 4.5in", sku: "TOOL-AG-4.5", barcode: "0123456789012", categoryId: "c5", supplierId: "s4", purchasePrice: 1800, sellingPrice: 2400, quantity: 7, unit: "PCS", reorderLevel: 3, description: "4.5 inch angle grinder 850W", status: "INACTIVE", createdAt: "2024-05-01", updatedAt: "2024-06-10", category: mockCategories[4], supplier: mockSuppliers[3] },
];

export const mockTransactions: StockTransaction[] = [
  { id: "t1", type: "IN", productId: "p1", quantity: 200, price: 850, invoiceNumber: "INV-2024-001", supplierId: "s1", date: new Date().toISOString(), createdAt: new Date().toISOString(), product: mockProducts[0], supplier: mockSuppliers[0] },
  { id: "t2", type: "OUT", productId: "p4", quantity: 50, price: 40, customerId: "Acme Corp", remarks: "Regular order", date: new Date(Date.now() - 3600000).toISOString(), createdAt: new Date(Date.now() - 3600000).toISOString(), product: mockProducts[3] },
  { id: "t3", type: "IN", productId: "p3", quantity: 100, price: 320, invoiceNumber: "INV-2024-002", supplierId: "s2", date: new Date(Date.now() - 7200000).toISOString(), createdAt: new Date(Date.now() - 7200000).toISOString(), product: mockProducts[2], supplier: mockSuppliers[1] },
  { id: "t4", type: "OUT", productId: "p6", quantity: 10, price: 280, customerId: "BuildWell Ltd", date: new Date(Date.now() - 10800000).toISOString(), createdAt: new Date(Date.now() - 10800000).toISOString(), product: mockProducts[5] },
  { id: "t5", type: "IN", productId: "p5", quantity: 30, price: 480, invoiceNumber: "INV-2024-003", supplierId: "s2", date: new Date(Date.now() - 86400000).toISOString(), createdAt: new Date(Date.now() - 86400000).toISOString(), product: mockProducts[4], supplier: mockSuppliers[1] },
];

export const mockPurchaseOrders: PurchaseOrder[] = [
  { id: "po1", poNumber: "PO-2024-0001", supplierId: "s1", status: "APPROVED", orderDate: "2024-06-01", expectedDate: "2024-06-15", totalAmount: 85000, notes: "Urgent order", createdAt: "2024-06-01", updatedAt: "2024-06-02", supplier: mockSuppliers[0], items: [] },
  { id: "po2", poNumber: "PO-2024-0002", supplierId: "s2", status: "PENDING", orderDate: "2024-06-05", expectedDate: "2024-06-20", totalAmount: 48000, createdAt: "2024-06-05", updatedAt: "2024-06-05", supplier: mockSuppliers[1], items: [] },
  { id: "po3", poNumber: "PO-2024-0003", supplierId: "s3", status: "RECEIVED", orderDate: "2024-05-20", expectedDate: "2024-06-05", totalAmount: 32000, createdAt: "2024-05-20", updatedAt: "2024-06-06", supplier: mockSuppliers[2], items: [] },
  { id: "po4", poNumber: "PO-2024-0004", supplierId: "s4", status: "DRAFT", orderDate: "2024-06-10", totalAmount: 125000, createdAt: "2024-06-10", updatedAt: "2024-06-10", supplier: mockSuppliers[3], items: [] },
  { id: "po5", poNumber: "PO-2024-0005", supplierId: "s1", status: "CANCELLED", orderDate: "2024-05-15", totalAmount: 62000, notes: "Cancelled by supplier", createdAt: "2024-05-15", updatedAt: "2024-05-18", supplier: mockSuppliers[0], items: [] },
];

export const mockDashboardStats: DashboardStats = {
  totalProducts: 74,
  totalCategories: 6,
  totalSuppliers: 12,
  totalStockValue: 8547290,
  todayStockIn: 350,
  todayStockOut: 120,
  lowStockCount: 5,
  recentTransactions: mockTransactions,
};

export const mockMonthlyStockData: MonthlyStockData[] = [
  { month: "Jan", stockIn: 4200, stockOut: 2800 },
  { month: "Feb", stockIn: 3800, stockOut: 3200 },
  { month: "Mar", stockIn: 5100, stockOut: 3900 },
  { month: "Apr", stockIn: 4600, stockOut: 4100 },
  { month: "May", stockIn: 5800, stockOut: 4500 },
  { month: "Jun", stockIn: 6200, stockOut: 5100 },
];

export const mockCategoryDistribution: CategoryDistribution[] = [
  { name: "Raw Materials", value: 34, color: "#6366f1" },
  { name: "Spare Parts", value: 26, color: "#8b5cf6" },
  { name: "Tools & Equip", value: 18, color: "#ec4899" },
  { name: "Packaging", value: 12, color: "#f97316" },
  { name: "Finished Goods", value: 7, color: "#22c55e" },
  { name: "Safety & PPE", value: 3, color: "#14b8a6" },
];

export const mockInventoryValueTrend = [
  { month: "Jan", value: 6800000 },
  { month: "Feb", value: 7100000 },
  { month: "Mar", value: 6950000 },
  { month: "Apr", value: 7400000 },
  { month: "May", value: 8100000 },
  { month: "Jun", value: 8547290 },
];

export const mockUsers: User[] = [
  { id: "u1", name: "Admin User", email: "admin@industrialvisit.com", role: "ADMIN", isActive: true, createdAt: "2024-01-01", updatedAt: "2024-06-01" },
  { id: "u2", name: "Ravi Sharma", email: "manager@industrialvisit.com", role: "MANAGER", isActive: true, createdAt: "2024-01-15", updatedAt: "2024-06-01" },
  { id: "u3", name: "Anitha Nair", email: "employee@industrialvisit.com", role: "EMPLOYEE", isActive: true, createdAt: "2024-02-01", updatedAt: "2024-06-01" },
  { id: "u4", name: "Kiran Patel", email: "kiran@industrialvisit.com", role: "EMPLOYEE", isActive: false, createdAt: "2024-03-01", updatedAt: "2024-06-01" },
];
