import axios from 'axios';
import React from 'react';
import {validateToken as VALIDATE_TOKEN_URL} from '@/END_POINTS';
import {useRouter} from 'next/navigation';

let authToken: string | null;

const Protected = ({
  Page,
  redirectTo = '/',
}: {
  Page: React.FC;
  redirectTo?: string;
}) => {
  const router = useRouter();

  const [isAuthorized, setIsAuthorized] = React.useState<boolean>(false);

  if (typeof window !== 'undefined') {
    authToken = localStorage.getItem('auth-token');

    if (!authToken) router.push(redirectTo);
  }

  React.useEffect(() => {
    axios
      .get(VALIDATE_TOKEN_URL, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setIsAuthorized(true);
          return;
        }

        localStorage.removeItem('auth-token');
        router.push(redirectTo);
      })
      .catch((err) => {
        localStorage.removeItem('auth-token');
        router.push(redirectTo);
      });
  }, [router, redirectTo]);

  return isAuthorized ? <Page /> : null;
};

export default Protected;
