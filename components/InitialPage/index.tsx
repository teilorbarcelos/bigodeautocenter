import styles from './styles.module.css'
import globals from '../../styles/globals.module.scss'
import { useAuth } from '../../hooks/useAuth'
import Navbar from '../Navbar'

export default function InitialPage() {
  const { user } = useAuth()
  return (
    <section className={styles.initialpage} id="initialpage">
      <Navbar />
    </section>
  )
}