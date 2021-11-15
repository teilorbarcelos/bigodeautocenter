import type { NextPage } from 'next'
import styles from './styles.module.scss'
import globals from '../../styles/globals.module.scss'
import BasicPage from '../../components/BasicPage'
import Navbar from '../../components/Navbar'
import Login from '../../components/Login'
import { useAuth } from '../../hooks/useAuth'
import ReminderTable, { IReminder } from '../../components/ReminderTable'
import { useEffect, useState } from 'react'

const Reminders: NextPage = () => {
  const { user, loading } = useAuth()
  const [reminders, setReminders] = useState<IReminder[]>([])

  useEffect(() => {
    setReminders([
      {
        id: 'string',
        date: new Date('2021-12-20'),
        title: 'Título',
        info: 'Test Info',
        active: true
      }
    ])
  }, [])

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

                <ReminderTable reminders={reminders} />

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
