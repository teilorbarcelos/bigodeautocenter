import Link from 'next/link'

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
}

export default function ProductTable({ products = [] }: Props) {
  return (
    <>
      <section className={styles.producttable} id="productlist">

        <div className={styles.list}>

          {
            products.length > 0 ?
              products.map(product => {
                return (
                  <Link
                    key={product.id}
                    href={`/product/id/${product.id}`}
                  >
                    <a>
                      <div
                        title={`Visualizar: ${product.name}`}
                        className={styles.product}
                      >
                        <p>{product.name}</p>
                        <p>Quantidade: {product.amount}</p>
                        <p>Valor: R$ {product.value.toFixed(2)}</p>
                      </div>
                    </a>
                  </Link>
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
