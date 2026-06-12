import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "sonner";
import { QueryProvider } from "@/components/providers/QueryProvider";

export const metadata: Metadata = {
  title: {
    default: "ABC Industries — Industrial Inventory Management System",
    template: "%s | ABC Industries",
  },
  description:
    "Track stock, manage suppliers, monitor inventory movement, and make data-driven decisions from one secure cloud platform designed for modern industrial businesses.",
  keywords: ["inventory management", "industrial", "warehouse", "stock tracking", "ERP", "supply chain"],
  authors: [{ name: "ABC Industries" }],
  openGraph: {
    title: "ABC Industries — Industrial Inventory Management",
    description: "Enterprise-grade inventory management for modern industries",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          <QueryProvider>
            {children}
            <Toaster
              position="top-right"
              richColors
              closeButton
              toastOptions={{
                style: {
                  borderRadius: "10px",
                  fontSize: "14px",
                },
              }}
            />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
