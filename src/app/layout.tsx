import localFont from "next/font/local";
import "./globals.css";
import { ClientProviders } from "@/shared/components/Providers";
import { ModalPaymentProvider } from "@/providers/ModalPaymentProvider";
import ModalPaymentController from "@/shared/components/ModalPayment/ModalPaymentController";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientProviders>
          {/* Solo un ModalPaymentProvider para la ventana de pagos */}
          <ModalPaymentProvider>
            {children}
            {/* Aquí montamos el “controller” que escucha isModalOpen */}
              <ModalPaymentController />
          </ModalPaymentProvider>
        </ClientProviders>
      </body>
    </html>
  );
}