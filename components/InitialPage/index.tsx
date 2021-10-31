import styles from './styles.module.css'
import globals from '../../styles/globals.module.scss'
import { useAuth } from '../../hooks/useAuth'

export default function InitialPage() {
  const { user } = useAuth()
  return (
    <section className={styles.initialpage} id="initialpage">
      <div>logado com: {user.name}</div>
    </section>
  )
}