import Link from 'next/link'

import styles from './styles.module.scss'
import globals from '../../styles/globals.module.scss'
import { IUser } from '../../contexts/authContext'
import { useAuth } from '../../hooks/useAuth'
import Button1 from '../Button1'
import { api } from '../../pages/api'

interface Props {
  users: IUser[]
  updateList?: () => void
}

export default function UserTable({ users = [], updateList }: Props) {
  const { user } = useAuth()

  async function switchType(id: string) {
    const response = await api.post<IUser>('/user/switchAdmin', { user_id: id })
    updateList()
  }

  async function switchActive(id: string) {
    const response = await api.post<IUser>('/user/switchActive', { user_id: id })
    updateList()
  }

  return (
    <>
      <section className={styles.usertable} id="userlist">

        <div className={styles.list}>

          {
            users.map(userItem => {
              return (
                <div
                  key={userItem.id}
                  className={styles.user}
                >
                  <p>{userItem.name}</p>

                  <div>
                    <p>Tipo : {userItem.admin ? 'Admin' : 'Usuário comum'}</p>
                    {
                      user.id != userItem.id &&
                      <Button1
                        type="button"
                        title="Alterar tipo"
                        onClick={() => switchType(userItem.id)}
                      />
                    }
                  </div>

                  <div>
                    <p>Status: <span
                      className={`${styles.status} ${userItem.active && styles.active}`}
                    >{userItem.active ? 'Habilitado' : 'Desabilitado'}</span></p>
                    {
                      user.id != userItem.id &&
                      <Button1
                        type="button"
                        title="Alterar Status"
                        onClick={() => switchActive(userItem.id)}
                      />
                    }
                  </div>
                </div>
              )
            })
          }

        </div>
      </section>
    </>
  )
}