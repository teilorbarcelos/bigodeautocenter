import type { NextPage } from 'next'
import Navbar from '../../../components/Navbar'
import { useAuth } from '../../../hooks/useAuth'
import styles from './styles.module.scss'
import globals from '../../../styles/globals.module.scss'
import Login from '../../../components/Login'
import LoadingScreen from '../../../components/LoadingScreen'
import BasicPage from '../../../components/BasicPage'
import { useEffect, useState } from 'react'
import { api } from '../../api'
import { IDebit } from '../../../components/DebitSaleList'
import DebitTable from '../../../components/DebitTable'

const DebitList: NextPage = () => {
  const { user, loading } = useAuth()
  const [debits, setDebits] = useState<IDebit[]>([])

  async function pendingDebitList() {
    const response = await api.post<IDebit[]>('/debit/report')
    setDebits(response.data)
  }

  useEffect(() => {
    if (!loading) {
      pendingDebitList()
    }
  }, [loading])

  return (

    <BasicPage
      title="Lista de Débitos"
    >
      <>
        <LoadingScreen visible={loading} />
        <Navbar />

        {user ?
          <div className={styles.debitTable}>
            <DebitTable
              debits={debits}
              deleteOption={false}
              paidSwitchButton={false}
            />
          </div>
          :
          !loading &&
          <Login />
        }
      </>
    </BasicPage>
  )
}

export default DebitList
