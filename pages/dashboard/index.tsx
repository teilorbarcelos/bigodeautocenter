import type { NextPage } from 'next'
import Head from 'next/head'
import Login from '../../components/Login'
import { useAuth } from '../../hooks/useAuth'
import styles from './styles.module.scss'
import globals from '../../styles/globals.module.scss'
import InitialPage from '../../components/InitialPage'
import LoadingScreen from '../../components/LoadingScreen'
import { useEffect, useState } from 'react'

const Dashboard: NextPage = () => {
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <div className={globals.container}>
      <Head>
        <title>Bigode Internal Sales System</title>
        <meta name="description" content="Sistema interno restrito a funcionários" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={globals.main}>
        {!user ? <Login /> : <InitialPage />}

        <LoadingScreen visible={loading} />
      </main>
    </div>
  )
}

export default Dashboard
