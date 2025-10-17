import ReactQueryProviders from "@/providers/ReactQuery";
import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";

const onest = Onest({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Insightly - Connect and Share ",
  description:
    "Insightly is a platform to share your profile and receive feedback from others. Connect, share, and grow together!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${onest.className} bg-background-primary text-content-primary antialiased`}
      >
        <ReactQueryProviders>
          <div className="min-h-screen">
            <main>{children}</main>
          </div>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
