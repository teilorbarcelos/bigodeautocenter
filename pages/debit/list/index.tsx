import type { NextPage } from 'next'
import Navbar from '../../../components/Navbar'
import { useAuth } from '../../../hooks/useAuth'
import styles from './styles.module.scss'
import Login from '../../../components/Login'
import LoadingScreen from '../../../components/LoadingScreen'
import BasicPage from '../../../components/BasicPage'
import { useEffect, useState } from 'react'
import { api } from '../../api'
import { IDebit } from '../../../components/DebitSaleList'
import DebitTable from '../../../components/DebitTable'
import { IPaginationProps } from '../../../interfaces'
import { Pagination } from '../../../components/Pagination'

interface IDebitsResponseProps {
  debits: IDebit[]
  perPage: number
  total: number
}

const DebitList: NextPage = () => {
  const { user, loading } = useAuth()
  const [debits, setDebits] = useState<IDebit[]>([])
  const [pagination, setPagination] = useState<IPaginationProps>({
    page: 1,
    perPage: 30,
    total: 0
  })

  async function pendingDebitList() {
    const response = await api.post<IDebitsResponseProps>('/debit/list', {
      page: pagination.page,
      perPage: pagination.perPage,
      paid: false
    })

    setDebits(response.data.debits)
    setPagination({
      ...pagination,
      perPage: response.data.perPage,
      total: response.data.total
    })
  }

  useEffect(() => {
    if (!loading) {
      pendingDebitList()
    }
  }, [loading, pagination.page])

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

            {pagination.total > pagination.perPage &&
              <Pagination
                pagination={pagination}
                setPagination={setPagination}
              />
            }
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
