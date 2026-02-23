import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Business Loan Calculator - Compare Rates & Calculate Payments',
  description: 'Free business loan calculator. Compare term loans, lines of credit, SBA loans. Calculate monthly payments, total interest, and find the best rates for your business.',
  keywords: 'business loan calculator, commercial loan calculator, small business loan calculator, SBA loan calculator, business loan payment calculator',
  openGraph: {
    title: 'Business Loan Calculator - Compare Rates & Calculate Payments',
    description: 'Free business loan calculator. Compare term loans, lines of credit, SBA loans. Calculate monthly payments, total interest, and find the best rates.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}