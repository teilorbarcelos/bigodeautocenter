import Link from 'next/link'
import styles from './styles.module.scss'
import globals from '../../styles/globals.module.scss'
import Logo from '../Logo'

export default function Header() {
  return (
    <header className={styles.header} id="header">
      <div className={styles.container}>
        <div className={styles.logo}>
          <Logo href="/" />
        </div>
        <ul className={styles.links}>
          <li>
            <Link href={"/dashboard"}>
              <a className={globals.link}>Sistema Interno</a>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}