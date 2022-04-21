import type { NextPage } from 'next'
import { useAuth } from '../../../hooks/useAuth'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react'
import { api } from '../../api'
import { IDebit } from '../../../components/DebitSaleList'
import DebitTable from '../../../components/DebitTable'
import { IPaginationProps } from '../../../interfaces'
import { Pagination } from '../../../components/Pagination'
import Layout from '../../../components/Layout'

interface IDebitsResponseProps {
  debits: IDebit[]
  perPage: number
  total: number
}

const DebitList: NextPage = () => {
  const { user } = useAuth()
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
    user &&
      pendingDebitList()
  }, [user, pagination.page])

  return (
    <Layout
      title="Lista de Débitos"
    >
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
    </Layout>
  )
}

export default DebitList
