import React from 'react'
import AuthProvider from '../../../context/AuthProvider';

const AuthLayout = ({children}: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div>
      <AuthProvider>
        {children}
      </AuthProvider>
    </div>
  )
}

export default AuthLayout