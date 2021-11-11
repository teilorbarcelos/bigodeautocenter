import type { NextPage } from 'next'
import styles from './styles.module.scss'
import globals from '../../styles/globals.module.scss'
import { useEffect, useState } from 'react'
import { ICost, ISale } from '../../components/ClientTable'
import { api } from '../api'
import BasicPage from '../../components/BasicPage'
import Navbar from '../../components/Navbar'
import { useAuth } from '../../hooks/useAuth'
import Login from '../../components/Login'
import { IDebit } from '../../components/DebitSaleList'

interface IInterval {
  initialDate?: Date
  finalDate?: Date
}

export interface IIncome {
  createdAt: Date
  debitId: string
  id: string
  info: string | null
  saleId: string
  userId: string
  value: number
}

const Reports: NextPage = () => {
  const { user, loading } = useAuth()
  const [filterType, setFilterType] = useState('today')
  const [initialDateConst, setInitialDate] = useState(new Date(Date.now()))
  const [finalDateConst, setFinalDate] = useState(new Date(Date.now()))
  const [totalCosts, setTotalCosts] = useState(0)
  const [totalIncomes, setTotalIncomes] = useState(0)
  const [pendingDebits, setPendingDebits] = useState<IDebit[]>([])

  interface IEntity {
    entity: ICost[] | IIncome[]
  }

  async function sumValues({ entity }: IEntity) {
    let total = 0

    entity.map((item: IIncome | ICost) => {
      total += item.value
    })

    return total
  }

  async function filterReportList({ initialDate, finalDate }: IInterval) {
    const costsResponse = await api.post<ICost[]>('/cost/list', {
      initialDate: initialDate ? initialDate.toISOString().split('T')[0] : '',
      finalDate: finalDate ? finalDate.toISOString().split('T')[0] : ''
    })

    const incomeResponse = await api.post<IIncome[]>('/income/list', {
      initialDate: initialDate ? initialDate.toISOString().split('T')[0] : '',
      finalDate: finalDate ? finalDate.toISOString().split('T')[0] : ''
    })

    setTotalIncomes(await sumValues({ entity: incomeResponse.data }))
    setTotalCosts(await sumValues({ entity: costsResponse.data }))
  }

  useEffect(() => {
    if (!loading) {
      if (filterType === 'today') {
        filterReportList({})
      } else {
        filterReportList({
          initialDate: new Date(initialDateConst.toISOString().split('T')[0]),
          finalDate: new Date(finalDateConst.toISOString().split('T')[0])
        })
      }
    }
  }, [filterType, initialDateConst, finalDateConst, loading])

  return (

    <BasicPage
      title="Relatórios por período"
    >
      <>
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
            </div>

            <div className={styles.report}>
              <p>Total de entradas (R$): {totalIncomes.toFixed(2)}</p>
              <p>Total de custos (R$): {totalCosts.toFixed(2)}</p>
              <p>Total líquido (R$): {(totalIncomes - totalCosts).toFixed(2)}</p>
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

export default Reports
