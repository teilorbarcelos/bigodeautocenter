import type { NextPage } from 'next'
import Link from 'next/link'
import styles from './styles.module.scss'
import globals from '../../../styles/globals.module.scss'
import { useEffect, useState } from 'react'
import { api } from '../../api'
import { useForm } from 'react-hook-form'
import Button1 from '../../../components/Button1'
import { useRouter } from 'next/router'
import { IReminder } from '../../../components/ReminderTable'
import { IClient } from '../../../components/ClientTable'
import Layout from '../../../components/Layout'
import axios from 'axios'
import { useAuth } from '../../../hooks/useAuth'

const ReminderUpdate: NextPage = () => {
  const { logOut } = useAuth()
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { handleSubmit } = useForm()
  const [reminderId, setReminderId] = useState('')
  const [client, setClient] = useState<IClient>({} as IClient)
  const [reminderTitle, setReminderTitle] = useState('')
  const [reminderInfo, setReminderInfo] = useState('')
  const [reminderActive, setReminderActive] = useState(false)
  const [reminderDate, setReminderDate] = useState(
    new Date(
      new Date(
        Date.now()
      )
    ).toISOString()
      .split('T')[0]
      .toString()
  )

  useEffect(() => {
    try {
      setLoading(true)
      async function getReminder() {

        const { id } = await router.query // necessary "await" here

        if (!id) {
          return
        }

        const reminderResponse = await api.post<IReminder>('/reminder/getData', {
          id
        })

        const reminder = reminderResponse.data

        setClient(reminder.client)
        setReminderId(id as string)
        setReminderTitle(reminder.title)
        setReminderActive(reminder.active)
        setReminderInfo(reminder.info)
        setReminderDate(
          new Date(
            reminder.date
          ).toISOString().split('T')[0].toString()
        )
      }

      getReminder()

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
  }, [router.query])

  async function updateReminder() {
    try {
      setLoading(true)
      await api.post<IReminder>('/reminder/update', {
        id: reminderId,
        title: reminderTitle,
        active: reminderActive,
        date: new Date(reminderDate),
        info: reminderInfo
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

  return (
    <Layout
      title='Atualização de lembrete'
      externalLoading={loading}
    >
      <form
        className={styles.form}
        onSubmit={handleSubmit(updateReminder)}
      >
        <h6>Lembrete ID: {reminderId}</h6>

        <div className={styles.dateValue}>
          <div className={styles.smallInput}>
            <label htmlFor="date">Data do lembrete:</label>
            <input
              type="date"
              className={globals.input}
              onChange={e => setReminderDate(e.target.value)}
              value={reminderDate}
            />
          </div>
        </div>

        <div className={styles.title}>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            className={globals.input}
            onChange={e => setReminderTitle(e.target.value)}
            value={reminderTitle}
            placeholder="Digite um título para o lembrete"
          />
        </div>

        <div className={styles.activeField}>
          <label htmlFor="active">Status: </label>
          <div>
            <input
              type="checkbox"
              id="active"
              checked={reminderActive}
              onChange={() => setReminderActive(reminderActive ? false : true)}
            />
            <span className={reminderActive ? styles.active : styles.inactive}>{reminderActive ? 'Ativo' : 'Desativado'}</span>
          </div>
        </div>

        <div>
          <label htmlFor="info">Info. adicional:</label>
          <textarea
            id="info"
            className={globals.textarea}
            placeholder="Informações adicionais."
            onChange={e => setReminderInfo(e.target.value)}
            value={reminderInfo}
          />
        </div>

        <div>
          <Button1 title="Atualizar lembrete" />
        </div>

        <div className={styles.clientLink}>
          <Link href={`/client/id/${client.id}`}>
            <a className={globals.link}>
              Ir para o cadastro do Cliente.
            </a>
          </Link>
        </div>

        <div>
          <h6>Cliente: {client.name}</h6>
          <h6>Contato: {client.contact}</h6>
          <h6>Info adicional: {client.info}</h6>
        </div>
      </form>
    </Layout>
  )
}

export default ReminderUpdate
