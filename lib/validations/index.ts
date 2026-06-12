import { z } from "zod";

// Auth
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
  confirmPassword: z.string(),
}).refine((d) => d.newPassword === d.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Product
export const productSchema = z.object({
  name: z.string().min(1, "Product name is required").max(200),
  sku: z.string().min(1, "SKU is required"),
  barcode: z.string().optional(),
  categoryId: z.string().min(1, "Category is required"),
  supplierId: z.string().optional(),
  purchasePrice: z.number().min(0, "Purchase price must be non-negative"),
  sellingPrice: z.number().min(0, "Selling price must be non-negative"),
  quantity: z.number().int().min(0, "Quantity must be non-negative"),
  unit: z.string().min(1, "Unit is required"),
  reorderLevel: z.number().int().min(0),
  description: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "DISCONTINUED"]).default("ACTIVE"),
});

// Category
export const categorySchema = z.object({
  name: z.string().min(1, "Category name is required").max(100),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
});

// Supplier
export const supplierSchema = z.object({
  companyName: z.string().min(1, "Company name is required").max(200),
  contactPerson: z.string().min(1, "Contact person is required"),
  phone: z.string().min(10, "Valid phone number required"),
  email: z.string().email().optional().or(z.literal("")),
  gstNumber: z
    .string()
    .regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GST number format")
    .optional()
    .or(z.literal("")),
  address: z.string().optional(),
  notes: z.string().optional(),
});

// Stock In
export const stockInSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  supplierId: z.string().optional(),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
  price: z.number().min(0),
  invoiceNumber: z.string().optional(),
  date: z.string().min(1, "Date is required"),
});

// Stock Out
export const stockOutSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
  customerId: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  remarks: z.string().optional(),
});

// User
export const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  password: z.string().min(8).optional(),
  role: z.enum(["ADMIN", "MANAGER", "EMPLOYEE"]),
  isActive: z.boolean().default(true),
});

// Contact form (landing page)
export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  company: z.string().min(1, "Company name is required"),
  phone: z.string().min(10, "Valid phone required"),
  email: z.string().email("Valid email required"),
  message: z.string().min(10, "Please write at least 10 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type ProductInput = z.infer<typeof productSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
export type SupplierInput = z.infer<typeof supplierSchema>;
export type StockInInput = z.infer<typeof stockInSchema>;
export type StockOutInput = z.infer<typeof stockOutSchema>;
export type UserInput = z.infer<typeof userSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
