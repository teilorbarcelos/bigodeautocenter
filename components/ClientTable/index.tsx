import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'

import styles from './styles.module.scss'
import globals from '../../styles/globals.module.scss'
import { api } from '../../pages/api'
import NewClientForm, { IClient } from '../NewClientForm'
import Button1 from '../Button1'
import Modal from '../Modal'
import UpdateClientForm from '../UpdateClientForm'

export default function ClientTable() {
  const { handleSubmit } = useForm()
  const [selectedClient, setSelectedClient] = useState<IClient>({} as IClient)
  const [newClientModalOpen, setNewClientModalOpen] = useState(false)
  const [updateClientModalOpen, setUpdateClientModalOpen] = useState(false)
  const [filter, setFilter] = useState('')
  const [clients, setClients] = useState<IClient[]>([])

  async function newClientRegistered() {
    setUpdateClientModalOpen(false)
    setNewClientModalOpen(false)
    getClientList()
  }

  async function getClientList() {
    const response = await api.post<IClient[]>('/client/list', {
      filter
    })
    setClients(response.data)
  }

  async function viewClientData(client: IClient) {
    setSelectedClient(client)

    setUpdateClientModalOpen(true)

  }

  useEffect(() => {
    getClientList()
  }, [])

  return (
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

        <Button1 onClick={() => setNewClientModalOpen(true)} title="Cadastrar Cliente" />
      </div>
      <div className={styles.list}>

        {clients.map(client => {
          return (
            <div
              key={client.id}
              title={`Visualizar cadastro do cliente ${client.name}`}
              className={styles.client}
              onClick={() => viewClientData(client)}
            >
              <p>{client.name}</p>
              <p>{client.contact}</p>
            </div>
          )
        })}

      </div>

      <Modal closeModal={() => setNewClientModalOpen(false)} visible={newClientModalOpen} >
        <NewClientForm closeModal={newClientRegistered} />
      </Modal>

      <Modal closeModal={() => setUpdateClientModalOpen(false)} visible={updateClientModalOpen} >
        <UpdateClientForm clientId={selectedClient.id} closeModal={newClientRegistered} />
      </Modal>
    </section>
  )
}