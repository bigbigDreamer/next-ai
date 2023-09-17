import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import StyledComponentsRegistry from '../lib/AntdRegistry';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '起源·AI',
  description: '诸神黄昏·起源',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}
