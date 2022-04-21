import type { NextPage } from 'next'
import { useAuth } from '../../../hooks/useAuth'
import styles from './styles.module.scss'
import globals from '../../../styles/globals.module.scss'
import { api } from '../../api'
import { useEffect, useState } from 'react'
import { IUser } from '../../../contexts/authContext'
import UserTable from '../../../components/UserTable'
import { useForm } from 'react-hook-form'
import Button1 from '../../../components/Button1'
import { IPaginationProps } from '../../../interfaces'
import { Pagination } from '../../../components/Pagination'
import Layout from '../../../components/Layout'
import axios from 'axios'

interface INewUser {
  name: string
  login: string
  password: string
  password2: string
}

interface IUserList extends IPaginationProps {
  users: IUser[]
}

const UserList: NextPage = () => {
  const [loading, setLoading] = useState(true)
  const { handleSubmit, register } = useForm()
  const { user } = useAuth()
  const [users, setUsers] = useState<IUser[]>([])
  const [newUserName, setNewUserName] = useState('')
  const [newUserLogin, setNewUserLogin] = useState('')
  const [newUserPassword, setNewUserPassword] = useState('')
  const [newUserPassword2, setNewUserPassword2] = useState('')
  const [pagination, setPagination] = useState<IPaginationProps>({
    page: 1,
    perPage: 30,
    total: 0
  })

  async function getUsersList() {
    try {
      setLoading(true)
      const response = await api.post<IUserList>('/user/list', {
        page: pagination.page
      })

      setUsers(response.data.users)
      setPagination({
        ...pagination,
        perPage: response.data.perPage,
        total: response.data.total
      })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      getUsersList()
    }
  }, [user, pagination.page])

  async function newUser(data: INewUser) {
    const newUser = await api.post<IUser>('/user/create', {
      name: data.name,
      login: data.login,
      password: data.password,
      password2: data.password2
    })

    if (newUser.data.error) {
      alert(newUser.data.error)
      return
    }

    alert('Novo usuário criado com sucesso!')

    getUsersList()

    setNewUserName('')
    setNewUserLogin('')
    setNewUserPassword('')
    setNewUserPassword2('')
  }

  return (
    <Layout
      title="Lista de Usuários"
      externalLoading={loading}
    >
      <div className={styles.userList}>
        <UserTable updateList={getUsersList} users={users} />

        {pagination.total > 30 &&
          <Pagination
            pagination={pagination}
            setPagination={setPagination}
          />
        }
      </div>

      {
        user?.admin &&

        <div className={styles.newUserForm}>
          <h5>Criar novo usuário:</h5>
          <form onSubmit={handleSubmit(newUser)}>
            <div>
              <label htmlFor="name">Nome: </label>
              <input
                {...register('name')}
                type="text"
                id="name"
                className={globals.input}
                placeholder="Nome do novo usuário"
                onChange={(e) => setNewUserName(e.target.value)}
                value={newUserName}
              />
            </div>

            <div>
              <label htmlFor="name">Login: </label>
              <input
                {...register('login')}
                type="text"
                id="login"
                className={globals.input}
                placeholder="Login do novo usuário"
                onChange={(e) => setNewUserLogin(e.target.value)}
                value={newUserLogin}
              />
            </div>

            <div>
              <label htmlFor="password">Senha: </label>
              <input
                {...register('password')}
                type="password"
                id="password"
                className={globals.input}
                onChange={(e) => setNewUserPassword(e.target.value)}
                value={newUserPassword}
              />
            </div>

            <div>
              <label htmlFor="password2">Confirme a senha: </label>
              <input
                {...register('password2')}
                type="password"
                id="password2"
                className={globals.input}
                onChange={(e) => setNewUserPassword2(e.target.value)}
                value={newUserPassword2}
              />
            </div>

            <div>
              <Button1
                title="Criar usuário"
              />
            </div>
          </form>
        </div>
      }
    </Layout>
  )
}

export default UserList
