import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../../../components/Navbar'
import { useAuth } from '../../../hooks/useAuth'
import styles from './styles.module.scss'
import globals from '../../../styles/globals.module.scss'
import Button1 from '../../../components/Button1'
import { useForm } from 'react-hook-form'
import { api } from '../../api'
import Login from '../../../components/Login'

export interface IUserUpdate {
  user_id?: string
  login: string
  name: string
  password: string
  password2: string
}

const ClientList: NextPage = () => {
  const { user } = useAuth()

  async function openNewClientModal() {
    alert('abrir modal de novo cliente')
  }

  return (

    <div className={globals.container}>
      <Head>
        <title>Lista de Clientes</title>
        <meta name="description" content="Lista de Clientes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={globals.main}>
        {user ?
          <>
            <Navbar />

            <Button1 onClick={openNewClientModal} title="Cadastrar Cliente" />
          </>
          :
          <Login />
        }
      </main>
    </div>
  )
}

export default ClientList
