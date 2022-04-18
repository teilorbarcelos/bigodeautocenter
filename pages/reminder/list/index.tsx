import type { NextPage } from 'next'
import styles from './styles.module.scss'
import globals from '../../styles/globals.module.scss'
import BasicPage from '../../../components/BasicPage'
import Navbar from '../../../components/Navbar'
import Login from '../../../components/Login'
import { useAuth } from '../../../hooks/useAuth'
import ReminderTable, { IReminder } from '../../../components/ReminderTable'
import { useEffect, useState } from 'react'
import { api } from '../../api'
import { IPaginationProps } from '../../../interfaces'
import { Pagination } from '../../../components/Pagination'

interface IRemindersResponseProps {
  reminders: IReminder[]
  page: number
  perPage: number
  total: number
}

const Reminders: NextPage = () => {
  const { user, loading } = useAuth()
  const [reminders, setReminders] = useState<IReminder[]>([])
  const [pagination, setPagination] = useState<IPaginationProps>({
    page: 1,
    perPage: 10,
    total: 0
  })

  async function getReminders() {
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
  }

  useEffect(() => {
    if (!loading) {
      getReminders()
    }
  }, [loading, pagination.page])

  useEffect(() => {
    if (reminders.length < 1 && pagination.page > 1) {
      setPagination({
        ...pagination,
        page: pagination.page - 1
      })
    }
  }, [reminders])

  return (

    <BasicPage
      title="Lembretes cadastrados"
    >
      <>
        <Navbar />

        {user ?
          <>
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
          </>
          :
          !loading &&
          <Login />
        }
      </>
    </BasicPage>
  )
}

export default Reminders
