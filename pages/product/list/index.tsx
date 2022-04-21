import type { NextPage } from 'next'
import Link from 'next/link'
import { useAuth } from '../../../hooks/useAuth'
import styles from './styles.module.scss'
import globals from '../../../styles/globals.module.scss'
import { useForm } from 'react-hook-form'
import { api } from '../../api'
import { useEffect, useState } from 'react'
import Button1 from '../../../components/Button1'
import { IPaginationProps } from '../../../interfaces'
import { Pagination } from '../../../components/Pagination'
import Layout from '../../../components/Layout'
import axios from 'axios'
import ProductTable, { IProduct } from '../../../components/ProductTable'

interface IProductsListProps {
  products: IProduct[]
  page: number
  perPage: number
  total: number
}

const ProductList: NextPage = () => {
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const { handleSubmit } = useForm()
  const [filter, setFilter] = useState('')
  const [orderBy, setOrderBy] = useState<'name' | 'amount'>('name')
  const [products, setProducts] = useState<IProduct[]>([])
  const [pagination, setPagination] = useState<IPaginationProps>({
    page: 1,
    perPage: 30,
    total: 0
  })

  async function getProductList() {
    try {
      setLoading(true)
      const response = await api.post<IProductsListProps>('/product/list', {
        filter,
        orderBy,
        perPage: pagination.perPage,
        page: pagination.page
      })

      setProducts(response.data.products)
      setPagination({
        ...pagination,
        perPage: response.data.perPage,
        total: response.data.total
      })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      getProductList()
    }
  }, [user, pagination.page, orderBy])

  return (
    <Layout
      title='Lista de Produtos'
      externalLoading={loading}
    >
      <div className={styles.filter}>

        <form
          className={styles.searchInput}
          onSubmit={handleSubmit(getProductList)}
        >
          <div>Ordenar por: </div>
          <div>
            <label htmlFor="name">Nome: </label>
            <input
              type="radio"
              id="name"
              defaultChecked
              name="orderBy"
              onChange={() => setOrderBy('name')}
            />
          </div>

          <div>
            <label htmlFor="amount">Quantidade: </label>
            <input
              type="radio"
              id="amount"
              name="orderBy"
              onChange={() => setOrderBy('amount')}
            />
          </div>

          <input
            id="filter"
            type="text"
            onChange={e => setFilter(e.target.value)}
            value={filter}
            className={globals.input}
          />

          <Button1
            onClick={() => setPagination({
              ...pagination,
              page: 1
            })}
            title="Buscar"
          />
        </form>

        <Link href="/product/create">
          <a>
            <Button1 title="Cadastrar Produto" />
          </a>
        </Link>

      </div>

      <div className={styles.clientList}>
        <ProductTable products={products} />

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

export default ProductList
