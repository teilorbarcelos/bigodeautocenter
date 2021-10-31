import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bigode Auto Center - Oficina Mecânica Criciúma - SC</title>
        <meta name="description" content="Oficina mecânica do Bigode, Rodovia Luiz Rosso, São Luiz - Criciúma - SC" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Navbar />
      </main>
    </div>
  )
}

export default Home
