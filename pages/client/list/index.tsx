import type { NextPage } from 'next'
import Link from 'next/link'
import { useAuth } from '../../../hooks/useAuth'
import styles from './styles.module.scss'
import globals from '../../../styles/globals.module.scss'
import ClientTable, { IClient } from '../../../components/ClientTable'
import { useForm } from 'react-hook-form'
import { api } from '../../api'
import { useEffect, useState } from 'react'
import Button1 from '../../../components/Button1'
import { IPaginationProps } from '../../../interfaces'
import { Pagination } from '../../../components/Pagination'
import Layout from '../../../components/Layout'
import axios from 'axios'

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
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const { handleSubmit } = useForm()
  const [filter, setFilter] = useState('')
  const [clients, setClients] = useState<IClient[]>([])
  const [pagination, setPagination] = useState<IPaginationProps>({
    page: 1,
    perPage: 30,
    total: 0
  })

  async function getClientList() {
    try {
      setLoading(true)
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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      getClientList()
    }
  }, [user, pagination.page])

  return (
    <Layout
      title='Lista de Clientes'
      externalLoading={loading}
    >
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
    </Layout>
  )
}

export default ClientList
