import styles from './styles.module.scss'
import globals from '../../styles/globals.module.scss'
import { IDebit } from '../DebitSaleList'
import DropDown from '../DropDown'
import Button1 from '../Button1'
import { useRouter } from 'next/router'
import { api } from '../../pages/api'

export interface IReminder {
  id?: string
  date?: Date
  title?: string
  info?: string
  active?: boolean
}

interface Props {
  reminders: IReminder[]
  deleteOption?: boolean
  activeSwitchButton?: boolean
  updateList?: () => void
}

export default function ReminderTable({
  reminders,
  deleteOption = true,
  activeSwitchButton = true,
  updateList
}: Props) {
  const router = useRouter()

  async function activeSwitch(id: string, status: boolean) {
    const response = await api.post<IDebit>('/reminder/activeSwitch', { id, status })

    if (response.data.error) {
      alert(response.data.error)
      return
    }

    updateList()
  }

  async function reminderEdit(id: string) {
    router.push(`/reminder/id/${id}`)
  }

  async function reminderDelete(id: string) {
    const response = await api.post('/reminder/delete', { id })

    if (response.data.error) {
      alert(response.data.error)
      return
    }

    updateList()
  }

  return (

    <div className={styles.remindersList}>
      {
        reminders.map((reminder, index) => {
          const dateSplit = reminder.date.toISOString().replace('T00:00:00.000Z', '').split('-')
          const date = `${dateSplit[2]}/${dateSplit[1]}/${dateSplit[0]}`

          return (
            <div
              key={reminder.id}
              className={new Date(reminder.date) < new Date(Date.now()) &&
                !reminder.active ? styles.expired
                :
                reminder.active && styles.active
              }
              title={reminder.info}
            >
              <p>{index + 1}</p>
              <p>{reminder.title}</p>
              <p>
                {date}
              </p>
              <p>
                Status: {reminder.active ? 'Ativo' : 'Desativado'}
              </p>

              <DropDown
                title="Opções"
                options={[
                  {
                    title: "Detalhes",
                    action: () => reminderEdit(reminder.id)
                  },
                  {
                    title: "Deletar",
                    action: () => reminderDelete(reminder.id)
                  }
                ]}
              />

              {
                activeSwitchButton &&
                <Button1
                  type="button"
                  title={reminder.active ? 'Desativar' : 'Ativar'}
                  onClick={() => activeSwitch(reminder.id, reminder.active ? false : true)}
                />
              }
            </div>
          )
        })
      }
    </div>
  )
}