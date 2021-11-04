import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import Link from 'next/link'

import styles from './styles.module.scss'
import globals from '../../styles/globals.module.scss'
import { api } from '../../pages/api'
import Button1 from '../Button1'
import LoadingScreen from '../LoadingScreen'

export interface ISale {
  id?: string
  createdAt: string
  car?: string
  client: IClient
  info?: string
  paid: boolean
  plate?: string
  products?: [{}]
  total?: number
  userId: string
}

export interface IClient {
  id?: string
  name: string
  contact: string
  cpf: string
  info: string
  birthday: Date
  sales?: ISale[]
  reminder?: [{}]
  error?: string
}

export default function ClientTable() {
  const [loading, setLoading] = useState(true)
  const { handleSubmit } = useForm()
  const [filter, setFilter] = useState('')
  const [clients, setClients] = useState<IClient[]>([])

  async function filterClientList() {
    const response = await api.post<IClient[]>('/client/list', {
      filter
    })
    setClients(response.data)
  }

  useEffect(() => {
    async function populateInitialClientList() {
      const response = await api.post<IClient[]>('/client/list')
      setClients(response.data)
    }
    populateInitialClientList()

    setLoading(false)
  }, [])

  return (
    <>
      <LoadingScreen visible={loading} />
      <section className={styles.clienttable} id="clientlist">
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

        <div className={styles.list}>

          {clients.map(client => {
            return (
              <Link
                key={client.id}
                href={`/client/id/${client.id}`}
              >
                <a>
                  <div
                    title={`Visualizar cadastro do cliente ${client.name}`}
                    className={styles.client}
                  >
                    <p>{client.name}</p>
                    <p>{client.contact}</p>
                  </div>
                </a>
              </Link>
            )
          })}

        </div>
      </section>
    </>
  )
}