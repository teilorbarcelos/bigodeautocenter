import type { NextPage } from 'next'
import Navbar from '../../../components/Navbar'
import { useAuth } from '../../../hooks/useAuth'
import styles from './styles.module.scss'
import globals from '../../../styles/globals.module.scss'
import Login from '../../../components/Login'
import LoadingScreen from '../../../components/LoadingScreen'
import BasicPage from '../../../components/BasicPage'
import { api } from '../../api'
import { useEffect, useState } from 'react'
import { IUser } from '../../../contexts/authContext'
import UserTable from '../../../components/UserTable'

const UserList: NextPage = () => {
  const { user, loading } = useAuth()
  const [users, setUsers] = useState<IUser[]>([])

  async function getUsersList() {
    const response = await api.post<IUser[]>('/user/list')
    setUsers(response.data)
  }

  useEffect(() => {
    if (!loading) {
      getUsersList()
    }
  }, [loading])

  return (

    <BasicPage
      title="Lista de Usuários"
    >
      <>
        <LoadingScreen visible={loading} />

        {user ?
          <>
            <Navbar />

            <div className={styles.userList}>
              <UserTable updateList={getUsersList} users={users} />
            </div>

            <div>
              {/* form de criação de usuario */}
            </div>

          </>
          :
          !loading &&
          <Login />
        }
      </>
    </BasicPage>
  )
}

export default UserList
