import React from 'react';
import Footer from '../Footer/Footer';

interface LayoutProps {
  children: React.ReactNode;
  footer?: boolean;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  footer = true,
  className = 'layouted full-bleed defaultBg',
}) => {
  return (
    <>
      <main className={className}>{children}</main>
      {footer && <Footer />}
    </>
  );
};

export default Layout;
