import styles from './styles.module.scss'
import globals from '../../styles/globals.module.scss'
import ClientIcon from '../svg/ClientIcon'
import SaleIcon from '../svg/SaleIcon'
import router from 'next/router'

export default function InitialPage() {
  return (
    <section className={styles.initialpage} id="initialpage">
      <div className={styles.cards}>

        <div
          className={styles.card}
          onClick={() => router.push('/sale/list')}
        >
          <div>
            <h6>Vendas</h6>
          </div>
          <div>
            <SaleIcon className={styles.svgIcon} />
          </div>
        </div>

        <div
          className={styles.card}
          onClick={() => router.push('/client/list')}
        >
          <div>
            <h6>Clientes</h6>
          </div>
          <div>
            <ClientIcon className={styles.svgIcon} />
          </div>
        </div>

      </div>
    </section>
  )
}