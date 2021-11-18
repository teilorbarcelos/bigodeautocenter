import type { NextPage } from 'next'
import Login from '../../components/Login'
import { useAuth } from '../../hooks/useAuth'
import styles from './styles.module.scss'
import globals from '../../styles/globals.module.scss'
import InitialPage from '../../components/InitialPage'
import LoadingScreen from '../../components/LoadingScreen'
import BasicPage from '../../components/BasicPage'
import Navbar from '../../components/Navbar'

const Dashboard: NextPage = () => {
  const { user, loading } = useAuth()

  return (
    <BasicPage
      title="Bigode Internal Sales System"
      content="Sistema interno restrito a funcionários"
    >
      <>
        <LoadingScreen visible={loading} />
        <Navbar />

        {
          user ?
            <InitialPage />
            :
            <Login />
        }
      </>
    </BasicPage>
  )
}

export default Dashboard
