import React from 'react'
interface AuthLayoutProps{
  children:React.ReactNode
}
export default function AuthLayout({children}:AuthLayoutProps) {
  return (
    <div className='container mx-auto'>
      <div className="grid grid-cols-1 h-screen items-center justify-center lg:grid-cols-2">
        <div>
          Logo
        </div>
        <div>
        {children}
        </div>
      </div>
    </div>
  )
}
