import Head from 'next/head'
import React, { MutableRefObject, ReactElement, ReactNode } from 'react'
import globals from '../../styles/globals.module.scss'

interface Props {
  title?: string
  content?: string
  children?: ReactElement
}

export default function BasicPage({
  title,
  children,
  content
}: Props) {

  return (
    <div className={globals.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={content || title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={globals.main}>

        {children}

      </main>

    </div>
  )
}