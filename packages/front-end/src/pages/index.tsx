import clsx from 'clsx';
import Head from 'next/head';
import { Inter } from '@next/font/google';
import { GetServerSidePropsContext } from 'next';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
const inter = Inter({ subsets: ['latin'] });

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const sessionToken = ctx.req.cookies?.SESSION_TOKEN;
  if (sessionToken) {
    try {
      const authRes = await fetch(`http://${process.env.NEXT_PUBLIC_BACK_END_HOST}/auth`, {
        method: 'GET',
        headers: {
          Cookie: `SESSION_TOKEN=${sessionToken}`,
        },
      });

      if (authRes.ok) {
        const { success, data } = await authRes.json();

        if (success && data?.user?.id) {
          return {
            props: {
              sess: {
                id: data.user.id,
                username: data.user.username,
                displayName: data.user.displayName,
              },
              session_token: sessionToken,
            },
          };
        }
      }
    } catch (error) {
      console.error('Failed to fetch auth state during SSR!', error);
    }
  } else {
    console.debug('Cookie not present, refusing to check auth status!');
  }

  return {
    props: {},
  };
}

export type HomeProps = {
  sess?: {
    id: number;
    username: string;
    displayName: string;
  };
  session_token?: string;
};

export default function Home({ sess, session_token }: HomeProps) {

  const [token, setToken] = useState("");
  const [user,setUser] = useState({displayName:"",username:""});

  useEffect(()=>{
    setToken(session_token);
    setUser(sess);
  },[]);

  const handleClick = async () => {
    (window as any).ReactNativeWebView.postMessage(false);
  };



  return (
    <>
      <Head>
        <title>Atllas Takehome</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>
      <div
        style={{
          backgroundImage: `url('/bg.jpg')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "100vh",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
      <main className={clsx('w-full h-full', inter.className)}>
        { token?<Button onClick={handleClick}>Logout</Button>:""}
        <h1 className="border-b border-neutral-300 px-4 py-2 text-2xl font-medium text-center">
          User Profile
        </h1>
        <div className="p-4">
          <p className="text-neutral-500">{`How ya goin, ${
            user?.displayName || user?.username || 'stranger'
          }?`}</p>
        </div>
      </main>
      </div>
    </>
  );
}

const StyledButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #0056b3;
  }
`;

const Button = ({ onClick, children }) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};