import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import Link from 'next/link'

import styles from './styles.module.scss'
import globals from '../../styles/globals.module.scss'
import { api } from '../../pages/api'
import Button1 from '../Button1'
import LoadingScreen from '../LoadingScreen'
import { ISale } from '../ClientTable'
import { allowedNodeEnvironmentFlags } from 'process'

interface IInterval {
  initialDate?: Date
  finalDate?: Date
}

export default function SaleTable() {
  const [loading, setLoading] = useState(true)
  const { handleSubmit } = useForm()
  const [filterType, setFilterType] = useState('today')
  const [initialDateConst, setInitialDate] = useState(new Date(Date.now()))
  const [finalDateConst, setFinalDate] = useState(new Date(Date.now()))
  const [sales, setSales] = useState<ISale[]>([])

  async function filterSaleList({ initialDate, finalDate }: IInterval) {
    const response = await api.post<ISale[]>('/sale/list', {
      initialDate: initialDate ? initialDate.toISOString().split('T')[0] : '',
      finalDate: finalDate ? finalDate.toISOString().split('T')[0] : ''
    })
    setSales(response.data)
  }

  useEffect(() => {

    if (filterType === 'today') {
      filterSaleList({})
    } else {
      filterSaleList({
        initialDate: new Date(initialDateConst.toISOString().split('T')[0]),
        finalDate: new Date(finalDateConst.toISOString().split('T')[0])
      })
    }
    // console.log(initialDateConst.toISOString().split('T')[0])
    setLoading(false)
  }, [filterType, initialDateConst, finalDateConst])

  return (
    <>
      <LoadingScreen visible={loading} />
      <section className={styles.saletable} id="salelist">
        <div className={styles.filter}>

          <form className={styles.filterType}>
            <div>
              <label htmlFor="today">Hoje: </label>
              <input type="radio" id="today" defaultChecked name="period" onChange={() => setFilterType('today')} />
            </div>

            <div>
              <label htmlFor="interval">Intervalo: </label>
              <input type="radio" id="interval" name="period" onChange={() => setFilterType('interval')} />
            </div>

            <div>
              <label htmlFor="initialDate">Data inicial: </label>
              <input
                type="date"
                name="initialDate"
                className={globals.input}
                onChange={(e) => {
                  console.log(e.target.value)
                  if (new Date(e.target.value)) {
                    setInitialDate(new Date(e.target.value))
                  }
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
              <Button1 title="Nova venda" />
            </a>
          </Link>
        </div>

        <div className={styles.list}>

          {sales.length > 0 && sales.map(sale => {
            return (
              <Link
                key={sale.id}
                href={`/sale/id/${sale.id}`}
              >
                <a>
                  <div
                    title={`Visualizar detalhes da venda.`}
                    className={styles.sale}
                  >
                    <p>{sale.createdAt}</p>
                    <p>{sale.total}</p>
                  </div>
                </a>
              </Link>
            )
          })}

        </div>
      </section>
    </>
  )
}