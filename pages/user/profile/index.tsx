import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../../../components/Navbar'
import { useAuth } from '../../../hooks/useAuth'
import styles from './styles.module.scss'
import globals from '../../../styles/globals.module.scss'
import Button1 from '../../../components/Button1'
import { useForm } from 'react-hook-form'
import { api } from '../../api'
import Login from '../../../components/Login'
import LoadingScreen from '../../../components/LoadingScreen'

export interface IUserUpdate {
  user_id?: string
  login: string
  name: string
  password: string
  password2: string
}

const Profile: NextPage = () => {
  const { user, logOut, loading } = useAuth()
  const { register, handleSubmit } = useForm()

  async function userUpdate(data: IUserUpdate) {

    const response = await api.post('/user/update', {
      name: data.name,
      password: data.password,
      password2: data.password2
    })

    if (response.data.error) {
      alert(response.data.error)
      return
    }

    logOut()
  }

  return (

    <div className={globals.container}>
      <Head>
        <title>Perfil de usuário</title>
        <meta name="description" content="Perfil de usuário" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={globals.main}>
        <LoadingScreen visible={loading} />
        {user ?
          <>
            <Navbar />

            <form className={styles.form} onSubmit={handleSubmit(userUpdate)}>
              <h5>Alterar cadastro</h5>
              <h5>login: {user.login}</h5>
              <div>
                <label htmlFor="name">Nome:</label>
                <input
                  {...register('name')}
                  id="name"
                  type="text"
                  className={globals.input}
                  defaultValue={user.name}
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
              <div>
                <Button1 title="Salvar" />
              </div>
            </form>
          </>
          :
          <Login />
        }
      </main>
    </div>
  )
}

export default Profile
