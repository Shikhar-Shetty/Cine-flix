import type { ReactNode } from "react";
import  Header  from '@/components/Header';
import  Footer  from '@/components/Footer';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (

      <main>
        <Header/>
            {children}
        <Footer/>
      </main>
  );
}
