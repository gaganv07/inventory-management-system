import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "sonner";
import { QueryProvider } from "@/components/providers/QueryProvider";

export const metadata: Metadata = {
  title: {
    default: "IndusTrack — Enterprise Inventory Management Platform",
    template: "%s | IndusTrack",
  },
  description:
    "Track inventory, automate warehouse operations, manage suppliers, monitor stock movement, and generate real-time business insights from one secure cloud platform designed for modern manufacturing and industrial businesses.",
  keywords: ["inventory management", "industrial inventory", "warehouse optimization", "stock tracker", "B2B ERP", "supply chain analytics", "GST invoice billing"],
  authors: [{ name: "IndusTrack Pvt. Ltd." }],
  openGraph: {
    title: "IndusTrack — Enterprise Inventory Management",
    description: "Cloud-hosted inventory management platform for manufacturing & industrial businesses.",
    type: "website",
    url: "https://industrack.in",
  },
  twitter: {
    card: "summary_large_image",
    title: "IndusTrack — Enterprise Inventory Management",
    description: "Cloud-hosted inventory management platform for manufacturing & industrial businesses.",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "IndusTrack",
  "operatingSystem": "All",
  "applicationCategory": "BusinessApplication",
  "description": "Enterprise Inventory Management Platform for Manufacturers & Industrial Businesses.",
  "offers": {
    "@type": "Offer",
    "price": "15000",
    "priceCurrency": "INR"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "500"
  }
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
