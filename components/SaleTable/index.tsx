import Link from 'next/link'

import styles from './styles.module.scss'
import globals from '../../styles/globals.module.scss'
import { ISale } from '../ClientTable'

interface Props {
  sales: ISale[]
}

export default function SaleTable({ sales }: Props) {
  return (
    <>
      <div className={styles.sales}>

        {sales.map((sale) => {
          const stringDate = sale.createdAt.split('T')[0].split('-')
          const date = `${stringDate[2]}/${stringDate[1]}/${stringDate[0]}`
          return (
            <Link
              key={sale.id}
              href={`/sale/id/${sale.id}`}
            >
              <a>
                <div
                  title="Ver detalhes"
                  className={styles.sale}
                >
                  <div className={styles.head}>
                    <p>{date}</p>
                    <p>Carro: {sale.car}</p>
                  </div>
                  <div className={styles.preview}>
                    <div>
                      <p>Placa:</p>
                      <p>{sale.plate}</p>
                    </div>
                    <div>
                      <p>Total R$:</p>
                      <p>{sale.total}</p>
                    </div>
                    <div>
                      <p>Status:</p>
                      <p
                        className={`${sale.paid && styles.paid} ${styles.status}`}
                      >
                        {sale.paid ? 'Pago' : 'Pendente'}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          )
        })}

      </div>
    </>
  )
}