import type { NextPage } from 'next'
import Head from 'next/head'
import Login from '../../components/Login'
import { useAuth } from '../../hooks/useAuth'
import styles from './styles.module.scss'
import InitialPage from '../../components/InitialPage'

const Dashboard: NextPage = () => {
  const { user } = useAuth()

  return (
    <div className={styles.container}>
      <Head>
        <title>Bigode Internal Sales System</title>
        <meta name="description" content="Sistema interno restrito a funcionários" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {!user ? <Login /> : <InitialPage />}
      </main>
    </div>
  )
}

export default Dashboard
