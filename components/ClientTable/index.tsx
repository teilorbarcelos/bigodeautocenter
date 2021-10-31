import styles from './styles.module.scss'
import globals from '../../styles/globals.module.scss'
import { useEffect, useState } from 'react'
import { api } from '../../pages/api'
import { IClient } from '../NewClientForm'
import Button1 from '../Button1'

export default function ClientTable() {
  const [filter, setFilter] = useState('')
  const [search, setSearch] = useState(false)
  const [clients, setClients] = useState<IClient[]>([])

  async function getClientList() {
    const response = await api.post<IClient[]>('/client/list', {
      filter
    })
    setClients(response.data)
  }

  useEffect(() => {
    getClientList()
  }, [])

  return (
    <section className={styles.clientlist} id="clientlist">
      <input
        id="filter"
        type="text"
        onChange={e => setFilter(e.target.value)}
        value={filter}
      />
      <Button1 onClick={getClientList} title="Buscar" />
      {clients.map(client => {
        return (
          <div key={client.id}>
            <p>{client.name}</p>
            <p>{client.contact}</p>
            <p>{client.cpf}</p>
            <p>{client.birthday}</p>
            <p>{client.info}</p>
            <p>{client.id}</p>
            <p>========================================</p>
          </div>
        )
      })}
    </section>
  )
}