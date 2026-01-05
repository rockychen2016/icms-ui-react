import '../styles/globals.css'
import React from 'react'

export const metadata = {
  title: 'icms components playground',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
