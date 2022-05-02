import Link from 'next/link'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction } from 'react'

import styles from './styles.module.scss'

export interface IProduct {
  id?: string
  name: string
  amount?: number
  cost: number
  value: number
}

interface Props {
  products: IProduct[]
  setSelectedProduct?: Dispatch<SetStateAction<IProduct>>
}

export default function ProductTable({ products = [], setSelectedProduct }: Props) {
  const router = useRouter()

  const handleActionOnClick = (product: IProduct) => {
    if (setSelectedProduct) {
      setSelectedProduct(product)
    } else {
      router.push(`/product/id/${product.id}`)
    }
  }
  return (
    <>
      <section className={styles.producttable} id="productlist">

        <div className={styles.list}>

          {
            products.length > 0 ?
              products.map(product => {
                return (
                  <div
                    key={product.id}
                    title={setSelectedProduct ? `Selecionar: ${product.name}` : `Visualizar: ${product.name}`}
                    className={styles.product}
                    onClick={() => handleActionOnClick(product)}
                  >
                    <p>{product.name}</p>
                    <p>Quantidade: {product.amount}</p>
                    <p>Valor: R$ {product.value.toFixed(2)}</p>
                  </div>
                )
              })
              :
              <h6>Nenhum produto cadastrado!</h6>
          }

        </div>
      </section>
    </>
  )
}
