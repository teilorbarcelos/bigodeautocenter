import type { NextPage } from 'next'
import Link from 'next/link'
import Navbar from '../../../components/Navbar'
import { useAuth } from '../../../hooks/useAuth'
import styles from './styles.module.scss'
import globals from '../../../styles/globals.module.scss'
import Login from '../../../components/Login'
import ClientTable, { IClient } from '../../../components/ClientTable'
import LoadingScreen from '../../../components/LoadingScreen'
import BasicPage from '../../../components/BasicPage'
import { useForm } from 'react-hook-form'
import { api } from '../../api'
import { useEffect, useState } from 'react'
import Button1 from '../../../components/Button1'

export interface IUserUpdate {
  user_id?: string
  login: string
  name: string
  password: string
  password2: string
}

const ClientList: NextPage = () => {
  const { user, loading } = useAuth()
  const { handleSubmit } = useForm()
  const [filter, setFilter] = useState('')
  const [clients, setClients] = useState<IClient[]>([])

  async function filterClientList() {
    const response = await api.post<IClient[]>('/client/list', {
      filter
    })
    setClients(response.data)
  }

  async function populateInitialClientList() {
    const response = await api.post<IClient[]>('/client/list')
    setClients(response.data)
  }

  useEffect(() => {
    if (!loading) {
      populateInitialClientList()
    }
  }, [loading])

  return (

    <BasicPage
      title="Lista de Clientes"
    >
      <>
        <LoadingScreen visible={loading} />

        {user ?
          <>
            <Navbar />

            <div className={styles.filter}>

              <form
                className={styles.searchInput}
                onSubmit={handleSubmit(filterClientList)}
              >
                <input
                  id="filter"
                  type="text"
                  onChange={e => setFilter(e.target.value)}
                  value={filter}
                  className={globals.input}
                />

                <Button1 onClick={filterClientList} title="Buscar" />
              </form>

              <Link href="/client/create">
                <a>
                  <Button1 title="Cadastrar Cliente" />
                </a>
              </Link>

            </div>

            <div className={styles.clientList}>
              <ClientTable clients={clients} />
            </div>

          </>
          :
          !loading &&
          <Login />
        }
      </>
    </BasicPage>
  )
}

export default ClientList
