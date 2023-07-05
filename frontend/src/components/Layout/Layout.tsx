import React from 'react';
import Footer from '../Footer/Footer';

interface LayoutProps {
  children: React.ReactNode;
  footer?: boolean;
  className?: string;
  footerType?: 'auth' | 'home';
}

const Layout: React.FC<LayoutProps> = ({
  children,
  footer = true,
  className = 'layouted full-bleed defaultBg',
  footerType = 'home',
}) => {
  return (
    <>
      <main className={className}>{children}</main>
      {footer && <Footer type={footerType} />}
    </>
  );
};

export default Layout;
