import React from 'react';
import {useRouter} from 'next/navigation';
import {getStorage, setStorage} from '@/utils/storage';
import {login as LOGIN_URL} from '@/END_POINTS';
import axios from 'axios';

/*
 * Protected Wrapper (For Validation)
 */

const Protected = ({
  Page,
  redirectTo = '/',
}: {
  Page: React.FC;
  redirectTo?: string;
}) => {
  const router = useRouter();

  const [loading, setLoading] = React.useState(true);

  // This will reassign the local storage items if the session is active but the data is not present
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const [authToken, userData] = getStorage(
        ['auth-token', 'user-data'],
        localStorage
      );

      // Only req if any of the following is missing
      if (!authToken || !userData) {
        axios
          .get(LOGIN_URL)
          .then((res) => {
            if (res.status === 200) {
              setStorage(
                {
                  'auth-token': res.data.jwt,
                  'user-data': JSON.stringify(res.data.user),
                },
                localStorage
              );
              setLoading(false);
            }
          })
          .catch((err: any): void => {
            console.debug(err);
            router.push(redirectTo);
          });
      } else {
        setLoading(false);
      }
    }
  }, [redirectTo, router]);

  return loading ? (
    <div
      style={{
        background: 'var(--background)',
        height: '100vh',
        width: '100vw',
      }}
    />
  ) : (
    <Page />
  );
};

export default Protected;
