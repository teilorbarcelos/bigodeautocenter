import axios from "axios"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Button1 from "../../../../components/Button1"
import { Pagination } from '../../../../components/Pagination'
import ProductTable, { IProduct } from "../../../../components/ProductTable"
import { IPaginationProps } from "../../../../interfaces"
import { api } from "../../../api"
import { IProductsListProps } from "../../../product/list"
import styles from './styles.module.scss'
import globals from '../../../../styles/globals.module.scss'
import LoadingScreen from "../../../../components/LoadingScreen"
import { useAuth } from "../../../../hooks/useAuth"

interface Props {
  index: number
  setProduct: Dispatch<SetStateAction<IProduct[]>>
  onClose: () => void
}

export default function ProductsListSelector({
  index,
  setProduct,
  onClose
}: Props) {
  const { logOut } = useAuth()
  const [loading, setLoading] = useState(false)
  const { handleSubmit } = useForm()
  const [filter, setFilter] = useState('')
  const [orderBy, setOrderBy] = useState<'name' | 'amount'>('name')
  const [products, setProducts] = useState<IProduct[]>([])
  const [selectedProduct, setSelectedProduct] = useState<IProduct | undefined>(undefined)
  const [pagination, setPagination] = useState<IPaginationProps>({
    page: 1,
    perPage: 30,
    total: 0
  })

  useEffect(() => {
    if (selectedProduct) {
      setProduct((state) => {
        let newProduct = [...state]
        newProduct[index] = {
          ...selectedProduct,
          amount: 1
        }
        return newProduct
      })
      onClose()
    }
  }, [selectedProduct])

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
        const errorMessage = error.response?.data.error
        alert(errorMessage);
        if (errorMessage === 'Access authorized only for authenticated users!') {
          logOut()
        }
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProductList()
  }, [pagination.page, orderBy])

  return (
    <div className={styles.productslistselector}>
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
      </div>

      <div className={styles.productList}>
        <ProductTable
          products={products}
          setSelectedProduct={setSelectedProduct}
        />

        {pagination.total > pagination.perPage &&
          <Pagination
            pagination={pagination}
            setPagination={setPagination}
          />
        }
      </div>

      <LoadingScreen visible={loading} />
    </div>
  )
}
