import type { NextPage } from 'next'
import styles from './styles.module.scss'
import globals from '../../styles/globals.module.scss'
import { useEffect, useState } from 'react'
import { api } from '../api'
import BasicPage from '../../components/BasicPage'
import Navbar from '../../components/Navbar'
import { useAuth } from '../../hooks/useAuth'
import Login from '../../components/Login'

interface IReportResponseProps {
  totalCosts: { _sum: { value: number | null } }
  totalIncomes: { _sum: { value: number | null } }
  totalDebits: { _sum: { value: number | null } }
  totalDebitsCount: number
}

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
  const [pendingDebits, setPendingDebits] = useState<number>(0)
  const [totalDebits, setTotalDebits] = useState(0)

  async function filterReportList({ initialDate, finalDate }: IInterval) {

    const { data: report } = await api.post<IReportResponseProps>('/report', {
      initialDate: initialDate ? initialDate.toISOString().split('T')[0] : '',
      finalDate: finalDate ? finalDate.toISOString().split('T')[0] : '',
      paid: false
    })

    console.log(report)

    setTotalIncomes(report.totalIncomes._sum.value)
    setTotalCosts(report.totalCosts._sum.value)
    setPendingDebits(report.totalDebitsCount)
    setTotalDebits(report.totalDebits._sum.value)
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
              <div className={styles.reportItem}>
                <h6>Total de entradas (R$): </h6>
                <h6>{totalIncomes ? totalIncomes.toFixed(2) : 0.00}</h6>
              </div>

              <div className={styles.reportItem}>
                <h6>Total de custos (R$): </h6>
                <h6>{totalCosts ? totalCosts.toFixed(2) : 0.00}</h6>
              </div>

              <div className={styles.reportItem}>
                <h6>Total líquido (R$): </h6>
                <h6>{(totalIncomes - totalCosts).toFixed(2)}</h6>
              </div>

              <div className={styles.reportItem}>
                <h6>Débitos pendentes: </h6>
                <h6>{pendingDebits}</h6>
              </div>

              <div className={styles.reportItem}>
                <h6>Total de débitos pendentes (R$): </h6>
                <h6>{totalDebits ? totalDebits.toFixed(2) : 0.00}</h6>
              </div>
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
