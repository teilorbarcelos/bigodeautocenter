import Link from 'next/link'
import styles from './styles.module.css'
import Logo from '../Logo'
import { useAuth } from '../../hooks/useAuth'

export default function Navbar() {
  const { user } = useAuth()

  return (
    <>
      {user &&
        <nav className={styles.nav}>
          <div className={styles.container}>
            <div className={styles.logo}>
              <Logo href="/" />
            </div>
            <ul className={styles.links}>
              <li>
                <Link href={"/sale/list"}>
                  <a>Vendas</a>
                </Link>
              </li>
              <li>
                <Link href={"/client/list"}>
                  <a>Clientes</a>
                </Link>
              </li>
              <li>
                <Link href={"/user/profile"}>
                  <a>{user.name}</a>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      }
    </>
  )
}