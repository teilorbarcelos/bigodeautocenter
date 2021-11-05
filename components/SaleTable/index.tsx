import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import Link from 'next/link'

import styles from './styles.module.scss'
import globals from '../../styles/globals.module.scss'
import { api } from '../../pages/api'
import Button1 from '../Button1'
import LoadingScreen from '../LoadingScreen'
import { ISale } from '../ClientTable'

export default function SaleTable() {
  const [loading, setLoading] = useState(true)
  const { handleSubmit } = useForm()
  const [filter, setFilter] = useState('')
  const [sales, setSales] = useState<ISale[]>([])

  async function filterSaleList() {
    const response = await api.post<ISale[]>('/client/list', {
      filter
    })
    setSales(response.data)
  }

  useEffect(() => {
    async function populateInitialSaleList() {
      const response = await api.post<ISale[]>('/sale/list')
      setSales(response.data)
    }
    populateInitialSaleList()

    setLoading(false)
  }, [])

  return (
    <>
      <LoadingScreen visible={loading} />
      <section className={styles.saletable} id="salelist">
        <div className={styles.filter}>

          <form
            className={styles.searchInput}
            onSubmit={handleSubmit(filterSaleList)}
          >
            <input
              id="filter"
              type="text"
              onChange={e => setFilter(e.target.value)}
              value={filter}
              className={globals.input}
            />

            <Button1 onClick={filterSaleList} title="Buscar" />
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