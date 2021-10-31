import Link from 'next/link'
import styles from './styles.module.css'
import globals from '../../styles/globals.module.css'

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href={"/"}>
            <a>BIGODE <span className={styles.logoDif}>AUTO CENTER</span>.</a>
          </Link>
        </div>
        <ul className={styles.links}>
          <li>
            <Link href={"/dashboard"}>
              <a>Dashboard</a>
            </Link>
          </li>
          {/* <li>
            <Link href={"/Register"}>
              <a>Register</a>
            </Link>
          </li> */}
        </ul>
      </div>
    </nav>
  )
}