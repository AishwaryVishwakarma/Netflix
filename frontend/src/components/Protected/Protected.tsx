import React from 'react';
import {useRouter} from 'next/navigation';

/*
 * Protected Wrapper (For Validation)
 */

let authToken: string | null;

const Protected = ({
  Page,
  redirectTo = '/',
}: {
  Page: React.FC;
  redirectTo?: string;
}) => {
  const router = useRouter();

  if (typeof window !== 'undefined') {
    authToken = localStorage.getItem('auth-token');

    if (!authToken) router.push(redirectTo);
  }

  return <Page />;
};

export default Protected;
