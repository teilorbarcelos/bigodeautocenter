import type { NextPage } from 'next'
import Navbar from '../../../components/Navbar'
import { useAuth } from '../../../hooks/useAuth'
import styles from './styles.module.scss'
import globals from '../../../styles/globals.module.scss'
import Login from '../../../components/Login'
import ClientTable from '../../../components/ClientTable'
import LoadingScreen from '../../../components/LoadingScreen'
import BasicPage from '../../../components/BasicPage'

export interface IUserUpdate {
  user_id?: string
  login: string
  name: string
  password: string
  password2: string
}

const ClientList: NextPage = () => {
  const { user, loading } = useAuth()

  return (

    <BasicPage
      title="Lista de Clientes"
    >
      <>
        <LoadingScreen visible={loading} />

        {user ?
          <>
            <Navbar />

            <ClientTable />
          </>
          :
          !loading &&
          <Login />
        }
      </>
    </BasicPage>
  )
}

export default ClientList
