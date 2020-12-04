import React from 'react';
import Head from 'next/head';
import { Input } from 'antd';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Hello</title>
      </Head>

      <Input placeholder="teste" />
    </div>
  );
}
