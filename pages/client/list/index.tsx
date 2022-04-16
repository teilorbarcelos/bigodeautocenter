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
import { IPaginationProps } from '../../../interfaces'
import { Pagination } from '../../../components/Pagination'

export interface IUserUpdate {
  user_id?: string
  login: string
  name: string
  password: string
  password2: string
}

interface IClientsListProps {
  clients: IClient[]
  page: number
  perPage: number
  total: number
}

const ClientList: NextPage = () => {
  const { user, loading } = useAuth()
  const { handleSubmit } = useForm()
  const [filter, setFilter] = useState('')
  const [clients, setClients] = useState<IClient[]>([])
  const [pagination, setPagination] = useState<IPaginationProps>({
    page: 1,
    perPage: 30,
    total: 0
  })

  async function getClientList() {
    const response = await api.post<IClientsListProps>('/client/list', {
      filter,
      perPage: pagination.perPage,
      page: pagination.page
    })

    setClients(response.data.clients)
    setPagination({
      ...pagination,
      perPage: response.data.perPage,
      total: response.data.total
    })
  }

  useEffect(() => {
    if (!loading) {
      getClientList()
    }
  }, [loading, pagination.page])

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
                onSubmit={handleSubmit(getClientList)}
              >
                <input
                  id="filter"
                  type="text"
                  onChange={e => setFilter(e.target.value)}
                  value={filter}
                  className={globals.input}
                />

                <Button1
                  onClick={() => setPagination({
                    ...pagination,
                    page: 1
                  })}
                  title="Buscar"
                />
              </form>

              <Link href="/client/create">
                <a>
                  <Button1 title="Cadastrar Cliente" />
                </a>
              </Link>

            </div>

            <div className={styles.clientList}>
              <ClientTable clients={clients} />

              {pagination.total > pagination.perPage &&
                <Pagination
                  pagination={pagination}
                  setPagination={setPagination}
                />
              }
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
