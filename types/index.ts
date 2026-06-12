// Global TypeScript types for the Industrial Inventory Management System

export type Role = "ADMIN" | "MANAGER" | "EMPLOYEE";
export type ProductStatus = "ACTIVE" | "INACTIVE" | "DISCONTINUED";
export type StockTransactionType = "IN" | "OUT";
export type PurchaseOrderStatus = "DRAFT" | "PENDING" | "APPROVED" | "RECEIVED" | "CANCELLED";
export type NotificationType = "LOW_STOCK" | "STOCK_IN" | "STOCK_OUT" | "NEW_ORDER" | "ORDER_APPROVED" | "SYSTEM";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string | null;
  isActive: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Category {
  id: string;
  name: string;
  description?: string | null;
  isActive: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
  _count?: { products: number };
}

export interface Supplier {
  id: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  email?: string | null;
  gstNumber?: string | null;
  address?: string | null;
  notes?: string | null;
  isActive: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
  _count?: { products: number };
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  barcode?: string | null;
  categoryId: string;
  supplierId?: string | null;
  purchasePrice: number;
  sellingPrice: number;
  quantity: number;
  unit: string;
  reorderLevel: number;
  description?: string | null;
  image?: string | null;
  status: ProductStatus;
  createdAt: Date | string;
  updatedAt: Date | string;
  category?: Category;
  supplier?: Supplier | null;
}

export interface StockTransaction {
  id: string;
  type: StockTransactionType;
  productId: string;
  quantity: number;
  price: number;
  invoiceNumber?: string | null;
  supplierId?: string | null;
  customerId?: string | null;
  remarks?: string | null;
  date: Date | string;
  createdById?: string | null;
  createdAt: Date | string;
  product?: Product;
  supplier?: Supplier | null;
  createdBy?: User | null;
}

export interface PurchaseOrderItem {
  id: string;
  purchaseOrderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  product?: Product;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierId: string;
  status: PurchaseOrderStatus;
  orderDate: Date | string;
  expectedDate?: Date | string | null;
  totalAmount: number;
  notes?: string | null;
  createdById?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  supplier?: Supplier;
  createdBy?: User | null;
  items?: PurchaseOrderItem[];
}

export interface Notification {
  id: string;
  userId?: string | null;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date | string;
  user?: User | null;
}

export interface AuditLog {
  id: string;
  userId?: string | null;
  action: string;
  entity: string;
  entityId?: string | null;
  oldValue?: unknown;
  newValue?: unknown;
  ipAddress?: string | null;
  userAgent?: string | null;
  createdAt: Date | string;
  user?: User | null;
}

// Dashboard Stats
export interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  totalSuppliers: number;
  totalStockValue: number;
  todayStockIn: number;
  todayStockOut: number;
  lowStockCount: number;
  recentTransactions: StockTransaction[];
}

// Chart Data
export interface MonthlyStockData {
  month: string;
  stockIn: number;
  stockOut: number;
}

export interface CategoryDistribution {
  name: string;
  value: number;
  color: string;
}

// API Response
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// Pagination
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Form Types
export interface ProductFormData {
  name: string;
  sku: string;
  barcode?: string;
  categoryId: string;
  supplierId?: string;
  purchasePrice: number;
  sellingPrice: number;
  quantity: number;
  unit: string;
  reorderLevel: number;
  description?: string;
  status: ProductStatus;
}

export interface CategoryFormData {
  name: string;
  description?: string;
  isActive: boolean;
}

export interface SupplierFormData {
  companyName: string;
  contactPerson: string;
  phone: string;
  email?: string;
  gstNumber?: string;
  address?: string;
  notes?: string;
}

export interface StockInFormData {
  productId: string;
  supplierId?: string;
  quantity: number;
  price: number;
  invoiceNumber?: string;
  date: string;
}

export interface StockOutFormData {
  productId: string;
  quantity: number;
  customerId?: string;
  date: string;
  remarks?: string;
}
