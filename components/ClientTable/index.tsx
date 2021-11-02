import { useForm } from 'react-hook-form'
import { ReactElement, ReactNode, useEffect, useState } from 'react'

import styles from './styles.module.scss'
import globals from '../../styles/globals.module.scss'
import { api } from '../../pages/api'
import NewClientForm from '../NewClientForm'
import Button1 from '../Button1'
import Modal from '../Modal'
import UpdateClientForm from '../UpdateClientForm'
import LoadingScreen from '../LoadingScreen'

export interface IClient {
  id?: string
  name: string
  contact: string
  cpf: string
  info: string
  birthday: Date
  sales?: [{}]
  reminder?: [{}]
  error?: string
}

export default function ClientTable() {
  const [loading, setLoading] = useState(true)
  const { handleSubmit } = useForm()
  const [form, setForm] = useState<ReactElement | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [filter, setFilter] = useState('')
  const [clients, setClients] = useState<IClient[]>([])

  async function newClientRegistered() {
    setModalOpen(false)
    setForm(null)
    getClientList()
  }

  async function getClientList() {
    const response = await api.post<IClient[]>('/client/list', {
      filter
    })
    setClients(response.data)
  }

  async function openNewClientModal() {
    setForm(<NewClientForm closeModal={newClientRegistered} />)

    setModalOpen(true)
  }

  async function openUpdateClientModal(clientId: string) {
    setLoading(true)

    try {

      const clientResponse = await api.post<IClient>('/client/getData', {
        id: clientId
      })

      const client = clientResponse.data

      setForm(<UpdateClientForm closeModal={newClientRegistered} client={client} />)

      setLoading(false)

    } catch (error) {
      alert(error)
    } finally {
      setModalOpen(true)
    }
  }

  useEffect(() => {
    getClientList()
    setLoading(false)
  }, [])

  return (
    <>
      <LoadingScreen visible={loading} />
      <section className={styles.clienttable} id="clientlist">
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

            <Button1 onClick={getClientList} title="Buscar" />
          </form>

          <Button1 onClick={openNewClientModal} title="Cadastrar Cliente" />
        </div>
        <div className={styles.list}>

          {clients.map(client => {
            return (
              <div
                key={client.id}
                title={`Visualizar cadastro do cliente ${client.name}`}
                className={styles.client}
                onClick={() => openUpdateClientModal(client.id)}
              >
                <p>{client.name}</p>
                <p>{client.contact}</p>
              </div>
            )
          })}

        </div>

        <Modal closeModal={() => setModalOpen(false)} visible={modalOpen} >
          {form}
        </Modal>
      </section>
    </>
  )
}