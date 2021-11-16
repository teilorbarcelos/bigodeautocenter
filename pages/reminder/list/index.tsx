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

const Reminders: NextPage = () => {
  const { user, loading } = useAuth()
  const [reminders, setReminders] = useState<IReminder[]>([])

  async function getReminders() {
    const reminderResponse = await api.post<IReminder[]>('/reminder/list')
    setReminders(reminderResponse.data)
  }

  useEffect(() => {
    if (!loading) {
      getReminders()
    }
  }, [loading])

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
