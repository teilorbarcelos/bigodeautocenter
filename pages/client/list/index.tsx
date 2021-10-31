import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../../../components/Navbar'
import { useAuth } from '../../../hooks/useAuth'
import styles from './styles.module.scss'
import globals from '../../../styles/globals.module.scss'
import Button1 from '../../../components/Button1'
import Login from '../../../components/Login'
import Modal from '../../../components/Modal'
import { useState } from 'react'
import NewClientForm from '../../../components/NewClientForm'
import ClientTable from '../../../components/ClientTable'

export interface IUserUpdate {
  user_id?: string
  login: string
  name: string
  password: string
  password2: string
}

const ClientList: NextPage = () => {
  const { user } = useAuth()
  const [newClientModalOpen, setNewClientModalOpen] = useState(false)

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

            <Button1 onClick={() => setNewClientModalOpen(true)} title="Cadastrar Cliente" />

            <ClientTable />

            <Modal closeModal={() => setNewClientModalOpen(false)} visible={newClientModalOpen} >
              <NewClientForm closeModal={() => setNewClientModalOpen(false)} />
            </Modal>
          </>
          :
          <Login />
        }
      </main>
    </div>
  )
}

export default ClientList
