import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Budget App",
  description: "Gérez votre budget personnel",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <nav className="bg-gray-900 text-white px-6 py-4 flex gap-6">
          <Link href="/" className="font-bold text-lg">
            💰 Budget App
          </Link>
          <Link href="/budget" className="hover:text-green-400">
            Budget
          </Link>
          <Link href="/expenses" className="hover:text-green-400">
            Dépenses
          </Link>
          <Link href="/incomes" className="hover:text-green-400">
            Revenus
          </Link>
          <Link href="/shopping-lists" className="hover:text-green-400">
            Courses
          </Link>
          <Link href="/saving-goals" className="hover:text-green-400">
            Épargne
          </Link>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
