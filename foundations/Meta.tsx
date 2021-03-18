import Head from 'next/head'
import React from 'react'

interface Props {
  title?: string
  image?: string
}

export default function Meta({ title = '', image = '' }: Props) {
  return (
    <Head>
      <meta
        name="viewport"
        content="viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <meta charSet="utf-8" />

      <link rel="icon" href="/assets/icon/favicon.png" />
      <link
        href="//cdn.jsdelivr.net/xeicon/2/xeicon.min.css"
        rel="stylesheet"
      />
      <title>로켓 공통 모듈</title>
    </Head>
  )
}
