import type { NextPage } from 'next'
import styles from './styles.module.scss'
import { useAuth } from '../../../hooks/useAuth'
import ReminderTable, { IReminder } from '../../../components/ReminderTable'
import { useEffect, useState } from 'react'
import { api } from '../../api'
import { IPaginationProps } from '../../../interfaces'
import { Pagination } from '../../../components/Pagination'
import Layout from '../../../components/Layout'
import axios from 'axios'

interface IRemindersResponseProps {
  reminders: IReminder[]
  page: number
  perPage: number
  total: number
}

const Reminders: NextPage = () => {
  const [loading, setLoading] = useState(true)
  const { user, logOut } = useAuth()
  const [reminders, setReminders] = useState<IReminder[]>([])
  const [pagination, setPagination] = useState<IPaginationProps>({
    page: 1,
    perPage: 10,
    total: 0
  })

  async function getReminders() {
    try {
      setLoading(true)
      const { data: reminderResponse } = await api.post<IRemindersResponseProps>('/reminder/list', {
        page: pagination.page,
        perPage: pagination.perPage
      })

      setReminders(reminderResponse.reminders)
      setPagination({
        ...pagination,
        perPage: reminderResponse.perPage,
        total: reminderResponse.total
      })
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

  useEffect(() => {
    if (user) {
      getReminders()
    }
  }, [user, pagination.page])

  useEffect(() => {
    if (reminders.length < 1 && pagination.page > 1) {
      setPagination({
        ...pagination,
        page: pagination.page - 1
      })
    }
  }, [reminders])

  return (
    <Layout
      title="Lembretes cadastrados"
      externalLoading={loading}
    >
      <section className={styles.reminders}>
        <div className={styles.remindersList}>

          <ReminderTable updateList={() => getReminders()} reminders={reminders} />

          {pagination.total > pagination.perPage &&
            <Pagination
              pagination={pagination}
              setPagination={setPagination}
            />
          }
        </div>
      </section>
    </Layout>
  )
}

export default Reminders
