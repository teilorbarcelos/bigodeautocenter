import type { NextPage } from 'next'
import Link from 'next/link'
import Navbar from '../../../components/Navbar'
import { useAuth } from '../../../hooks/useAuth'
import styles from './styles.module.scss'
import globals from '../../../styles/globals.module.scss'
import Login from '../../../components/Login'
import LoadingScreen from '../../../components/LoadingScreen'
import BasicPage from '../../../components/BasicPage'
import SaleTable from '../../../components/SaleTable'
import { useEffect, useState } from 'react'
import { ISale } from '../../../components/ClientTable'
import Button1 from '../../../components/Button1'
import { api } from '../../api'
import { IPaginationProps } from '../../../interfaces'
import { Pagination } from '../../../components/Pagination'

interface IInterval {
  initialDate?: Date
  finalDate?: Date
}

interface ISalesListResponseProps {
  sales: ISale[]
  page: number
  perPage: number
  total: number
}

const SaleList: NextPage = () => {
  const { user, loading } = useAuth()
  const [filterType, setFilterType] = useState('today')
  const [initialDateConst, setInitialDate] = useState(new Date(Date.now()))
  const [finalDateConst, setFinalDate] = useState(new Date(Date.now()))
  const [sales, setSales] = useState<ISale[]>([])
  const [pagination, setPagination] = useState<IPaginationProps>({
    page: 1,
    perPage: 30,
    total: 0
  })

  async function filterSaleList({ initialDate, finalDate }: IInterval) {
    const response = await api.post<ISalesListResponseProps>('/sale/list', {
      initialDate: initialDate ? initialDate.toISOString().split('T')[0] : '',
      finalDate: finalDate ? finalDate.toISOString().split('T')[0] : '',
      page: pagination.page,
      perPage: pagination.perPage
    })

    setSales(response.data.sales)
    setPagination({
      ...pagination,
      perPage: response.data.perPage,
      total: response.data.total
    })
  }

  const updateList = () => {
    if (filterType === 'today') {
      filterSaleList({})
    } else {
      filterSaleList({
        initialDate: new Date(initialDateConst.toISOString().split('T')[0]),
        finalDate: new Date(finalDateConst.toISOString().split('T')[0])
      })
    }
  }

  useEffect(() => {
    if (user) {
      updateList()
    }
  }, [user, pagination.page])

  useEffect(() => {
    if (pagination.page === 1) {
      updateList()
      return
    }

    setPagination({
      ...pagination,
      page: 1
    })
  }, [filterType, initialDateConst, finalDateConst])

  return (
    <BasicPage
      title="Lista de Vendas"
    >
      <>
        <LoadingScreen visible={loading} />
        <Navbar />

        {user ?
          <>
            <div className={styles.filter}>
              <form className={styles.filterType}>
                <div>
                  <label htmlFor="today">Hoje: </label>
                  <input
                    type="radio"
                    id="today"
                    defaultChecked
                    name="period"
                    onChange={() => setFilterType('today')}
                  />
                </div>

                <div>
                  <label htmlFor="interval">Intervalo: </label>
                  <input
                    type="radio"
                    id="interval"
                    name="period"
                    onChange={() => setFilterType('interval')}
                  />
                </div>

                <div>
                  <label htmlFor="initialDate">Data inicial: </label>
                  <input
                    type="date"
                    name="initialDate"
                    className={globals.input}
                    onChange={(e) => {
                      setInitialDate(new Date(e.target.value))
                    }}
                    value={initialDateConst.toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label htmlFor="finalDate">Data final: </label>
                  <input
                    type="date"
                    name="finalDate"
                    className={globals.input}
                    onChange={(e) => setFinalDate(new Date(e.target.value))}
                    value={finalDateConst.toISOString().split('T')[0]}
                  />
                </div>
              </form>

              <Link href="/sale/create">
                <a>
                  <Button1 type="button" title="Nova venda" />
                </a>
              </Link>
            </div>

            <div className={styles.saleTable}>
              <SaleTable sales={sales} />

              {pagination.total > pagination.perPage &&
                <Pagination
                  pagination={pagination}
                  setPagination={setPagination}
                />
              }
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

export default SaleList
