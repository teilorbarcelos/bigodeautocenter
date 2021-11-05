import type { NextPage } from 'next'
import Navbar from '../../../components/Navbar'
import { useAuth } from '../../../hooks/useAuth'
import styles from './styles.module.scss'
import globals from '../../../styles/globals.module.scss'
import Login from '../../../components/Login'
import LoadingScreen from '../../../components/LoadingScreen'
import BasicPage from '../../../components/BasicPage'
import SaleTable from '../../../components/SaleTable'

const SaleList: NextPage = () => {
  const { user, loading } = useAuth()

  return (

    <BasicPage
      title="Lista de Vendas"
    >
      <>
        <LoadingScreen visible={loading} />
        <Navbar />

        {user ?
          <SaleTable />
          :
          !loading &&
          <Login />
        }
      </>
    </BasicPage>
  )
}

export default SaleList
