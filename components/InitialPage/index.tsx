import styles from './styles.module.scss'
import globals from '../../styles/globals.module.scss'
import Navbar from '../Navbar'

export default function InitialPage() {
  return (
    <section className={styles.initialpage} id="initialpage">
      <Navbar />

      <div className={styles.cards}>
        <div
          className={styles.card}
        >
          <h6>Vendas</h6>
        </div>
      </div>
    </section>
  )
}