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
        <nav>
          <Link href="/">Accueil</Link>
          <Link href="/budget">Budget</Link>
          <Link href="/expenses">Dépenses</Link>
          <Link href="/incomes">Revenus</Link>
          <Link href="/shopping-lists">Courses</Link>
          <Link href="/saving-goals">Épargne</Link>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}