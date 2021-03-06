import React from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import styles from './styles.module.scss'
import globals from '../../../styles/globals.module.scss'
import { useEffect, useState } from 'react'
import { IClient, ISale } from '../../../components/ClientTable'
import { api } from '../../api'
import { useForm } from 'react-hook-form'
import Button1 from '../../../components/Button1'
import SaleTable from '../../../components/SaleTable'
import ReminderTable, { IReminder } from '../../../components/ReminderTable'
import ButtonDanger from '../../../components/ButtonDanger'
import MyMaskedInput from '../../../components/MyMaskedInput'
import { Pagination } from '../../../components/Pagination'
import { IPaginationProps } from '../../../interfaces'
import Layout from '../../../components/Layout'
import axios from 'axios'
import { useAuth } from '../../../hooks/useAuth'

interface IClientListResponseProps {
  client: IClient
  remindersPage?: number
  totalReminders?: number
  salesPage?: number
  totalSales?: number
}

const Client: NextPage = () => {
  const { logOut } = useAuth()
  const { handleSubmit } = useForm()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [id, setId] = useState('')
  const [originalName, setOriginalName] = useState('')
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [cpf, setCpf] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [birthday, setBirthday] = useState('')
  const [info, setInfo] = useState('')
  const [sales, setSales] = useState<ISale[]>([])
  const [reminders, setReminders] = useState<IReminder[]>([])
  const [salesPagination, setSalesPagination] = useState<IPaginationProps>({
    page: 1,
    perPage: 10,
    total: 0
  })
  const [remindersPagination, setRemindersPagination] = useState<IPaginationProps>({
    page: 1,
    perPage: 10,
    total: 0
  })

  const getClient = async () => {
    const { id } = await router.query // necessary "await" here

    if (!id) {
      return
    }

    const clientResponse = await api.post<IClientListResponseProps>('/client/getData', {
      id,
      salesPage: salesPagination.page,
      remindersPage: remindersPagination.page
    })

    setId(id as string)
    setOriginalName(clientResponse.data.client.name)
    setName(clientResponse.data.client.name)
    setContact(clientResponse.data.client.contact)
    setCpf(clientResponse.data.client.cpf)
    setCnpj(clientResponse.data.client.cnpj)
    setBirthday(clientResponse.data.client.birthday?.toString().replace('T00:00:00.000Z', ''))
    setInfo(clientResponse.data.client.info)
    setSales(clientResponse.data.client.sales)
    setReminders(clientResponse.data.client.reminders)
    setRemindersPagination({
      ...remindersPagination,
      total: clientResponse.data.totalReminders
    })
    setSalesPagination({
      ...salesPagination,
      total: clientResponse.data.totalSales
    })

  }

  useEffect(() => {
    try {
      setLoading(true)
      getClient()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response.data.error)
      }
    } finally {
      setLoading(false)
    }
  }, [
    router.query,
    remindersPagination.page,
    salesPagination.page
  ])

  async function updateClient() {
    try {
      setLoading(true)
      await api.post<IClient>('/client/update', {
        id,
        birthday,
        contact,
        cpf,
        cnpj,
        info,
        name
      })

      alert('Cadastro atualizado com sucesso!')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.error
        alert(errorMessage);
        if (errorMessage === 'Access authorized only for authenticated users!') {
          logOut()
        }
      }
    } finally {
      setLoading(false)
    }
  }

  async function createReminder() {
    try {
      setLoading(true)
      const reminderResponse = await api.post<IReminder>('/reminder/create', {
        clientId: id,
        date: new Date(Date.now()),
        title: '',
        info: ''
      })

      router.push(`/reminder/id/${reminderResponse.data.id}`)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.error
        alert(errorMessage);
        if (errorMessage === 'Access authorized only for authenticated users!') {
          logOut()
        }
      }
    } finally {
      setLoading(false)
    }
  }

  async function clientDelete() {
    if (window.confirm('Quer mesmo deletar o cadastro do cliente? Esta a????o ?? irrevers??vel!')) {
      try {
        setLoading(true)

        await api.post<IClient>('/client/delete', { id })

        alert('Cadastro de cliente deletado com sucesso!')
        router.push('/client/list')
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data.error
          alert(errorMessage);
          if (errorMessage === 'Access authorized only for authenticated users!') {
            logOut()
          }
        }
      } finally {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    if (reminders.length < 1 && remindersPagination.page > 1) {
      setRemindersPagination({
        ...remindersPagination,
        page: remindersPagination.page - 1
      })
    }
  }, [reminders])

  return (
    <Layout
      title="Cadastro de cliente"
      externalLoading={loading}
    >
      <div className={styles.content}>
        <form
          className={styles.updateClientForm}
          onSubmit={handleSubmit(updateClient)}
        >
          <h5>{originalName}</h5>

          <div>
            <label htmlFor="name">Nome:</label>
            <input
              id="name"
              type="text"
              className={globals.input}
              onChange={e => setName(e.target.value)}
              value={name}
              placeholder="Nome do cliente"
            />
          </div>

          <div>
            <label htmlFor="contact">Contato:</label>
            <input
              id="contact"
              type="text"
              className={globals.input}
              onChange={e => setContact(e.target.value)}
              value={contact}
              placeholder="Dados de contato"
            />
          </div>

          <div className={styles.smallInput}>
            <div>
              <label htmlFor="cpf">CPF:</label>
              <MyMaskedInput
                mask="cpf"
                id="cpf"
                type="text"
                className={globals.input}
                onChange={e => setCpf(e.target.value)}
                value={cpf}
                placeholder="123.456.789-10"
              />
            </div>
          </div>

          <div className={styles.smallInput}>
            <div>
              <label htmlFor="cnpj">CNPJ:</label>
              <MyMaskedInput
                mask="cnpj"
                id="cnpj"
                type="text"
                className={globals.input}
                onChange={e => setCnpj(e.target.value)}
                value={cnpj}
                placeholder="12.345.678/9012-34"
              />
            </div>
          </div>

          <div className={styles.smallInput}>
            <div>
              <label htmlFor="birthday">Data (Opcional):</label>
              <input
                id="birthday"
                type="date"
                className={globals.input}
                onChange={e => setBirthday(e.target.value)}
                value={birthday}
              />
            </div>
          </div>

          <div>
            <label htmlFor="info">Info. adicional:</label>
            <textarea
              id="info"
              className={globals.textarea}
              onChange={e => setInfo(e.target.value)}
              value={info}
              placeholder="Informa????es adicionais."
            />
          </div>

          <div className={styles.buttons}>
            <div>
              <Button1 title="Salvar" />
              <Button1
                type='button'
                title="Nova Venda"
                onClick={() => router.push(`/sale/create?clientId=${id}`)}
                disabled={!id}
              />
            </div>
            <ButtonDanger
              type="button"
              title="Deletar cadastro"
              onClick={clientDelete}
            />
          </div>

        </form>
      </div>


      {/* SALES */}

      {
        sales.length > 0 &&
        <>
          <div className={globals.divider}></div>

          <div className={styles.content}>

            <div className={styles.sales}>
              <div className={styles.salesTitle}>
                <h5>Vendas:</h5>
              </div>

              <div className={styles.saleTable}>
                <SaleTable sales={sales} />

                {salesPagination.total > 10 &&
                  <Pagination
                    pagination={salesPagination}
                    setPagination={setSalesPagination}
                  />
                }
              </div>
            </div>
          </div>
        </>
      }

      <div className={globals.divider}></div>

      <div className={styles.reminders}>
        <h5>Lembretes:</h5>

        <ReminderTable updateList={getClient} reminders={reminders} />

        {remindersPagination.total > 10 &&
          <Pagination
            pagination={remindersPagination}
            setPagination={setRemindersPagination}
          />
        }
      </div>

      <div className={styles.reminderCreateButton}>
        <Button1 type="button" title="Criar lembrete" onClick={createReminder} />
      </div>
    </Layout>
  )
}

export default Client
