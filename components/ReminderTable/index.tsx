import styles from './styles.module.scss'
import globals from '../../styles/globals.module.scss'
import DropDown from '../DropDown'
import Button1 from '../Button1'
import { useRouter } from 'next/router'
import { api } from '../../pages/api'
import { IClient } from '../ClientTable'

export interface IReminder {
  id?: string
  clientId?: string
  client?: IClient
  title?: string
  info?: string
  active?: boolean
  date?: Date
  error?: string
}

interface Props {
  reminders: IReminder[]
  activeSwitchButton?: boolean
  updateList?: () => void
}

export default function ReminderTable({
  reminders = [],
  activeSwitchButton = true,
  updateList
}: Props) {
  const router = useRouter()

  async function activeSwitch(id: string, active: boolean) {
    const response = await api.post<IReminder>('/reminder/switchActive', { id, active })

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
    const response = await api.post<IReminder>('/reminder/delete', { id })

    if (response.data.error) {
      alert(response.data.error)
      return
    }

    updateList()
  }

  return (

    <div className={styles.remindersList}>
      {
        reminders.length > 0 ?

          reminders.map((reminder, index) => {
            const dateSplit = reminder.date.toString().split('T')[0].split('-')
            const date = `${dateSplit[2]}/${dateSplit[1]}/${dateSplit[0]}`

            return (
              <div
                key={reminder.id}
                className={new Date(reminder.date) < new Date(Date.now()) ?
                  reminder.active ? styles.expired : '' : ''
                }
              >
                <p>{index + 1}</p>

                <p
                  className={styles.title}
                  title={reminder.info}
                >{reminder.title}</p>

                <div className={styles.options}>
                  <p>
                    {date}
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

              </div>
            )
          })

          :

          <h6>Nenhum lembrete cadastrado!</h6>
      }
    </div>
  )
}