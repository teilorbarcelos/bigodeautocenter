import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../../../components/Navbar'
import { useAuth } from '../../../hooks/useAuth'
import styles from './styles.module.scss'
import globals from '../../../styles/globals.module.scss'
import Login from '../../../components/Login'
import ClientTable from '../../../components/ClientTable'
import LoadingScreen from '../../../components/LoadingScreen'

export interface IUserUpdate {
  user_id?: string
  login: string
  name: string
  password: string
  password2: string
}

const ClientList: NextPage = () => {
  const { user, loading } = useAuth()

  return (

    <div className={globals.container}>
      <Head>
        <title>Lista de Clientes</title>
        <meta name="description" content="Lista de Clientes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={globals.main}>
        <LoadingScreen visible={loading} />
        {user ?
          <>
            <Navbar />

            <ClientTable />
          </>
          :
          <Login />
        }
      </main>
    </div>
  )
}

export default ClientList
