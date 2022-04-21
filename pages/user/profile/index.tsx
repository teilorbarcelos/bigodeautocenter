import type { NextPage } from 'next'
import { useAuth } from '../../../hooks/useAuth'
import styles from './styles.module.scss'
import globals from '../../../styles/globals.module.scss'
import Button1 from '../../../components/Button1'
import { useForm } from 'react-hook-form'
import { api } from '../../api'
import ButtonDanger from '../../../components/ButtonDanger'
import { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import axios from 'axios'

export interface IUserUpdate {
  user_id?: string
  login: string
  name: string
  password: string
  password2: string
}

const Profile: NextPage = () => {
  const [loading, setLoading] = useState(true)
  const { user, logOut } = useAuth()
  const { register, handleSubmit } = useForm()
  const [userName, setUserName] = useState('')

  useEffect(() => {
    if (user) {
      setUserName(user.name)
      setLoading(false)
    }
  }, [user])

  async function userUpdate(data: IUserUpdate) {
    try {
      setLoading(true)
      await api.post('/user/update', {
        name: userName,
        password: data.password,
        password2: data.password2
      })

      logOut()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout
      title="Perfil de usuário"
      externalLoading={loading}
    >
      <form className={styles.form} onSubmit={handleSubmit(userUpdate)}>
        <h5>Alterar cadastro</h5>
        <h5>login: {user?.login}</h5>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            id="name"
            type="text"
            className={globals.input}
            onChange={e => setUserName(e.target.value)}
            value={userName}
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            {...register('password')}
            id="password"
            type="password"
            className={globals.input}
          />
        </div>
        <div>
          <label htmlFor="password2">Confirme a senha:</label>
          <input
            {...register('password2')}
            id="password2"
            type="password"
            className={globals.input}
          />
        </div>
        <div className={styles.buttons}>
          <Button1 title="Salvar" />

          <ButtonDanger
            type="button"
            title="Logout"
            onClick={logOut}
          />
        </div>
      </form>
    </Layout>
  )
}

export default Profile
