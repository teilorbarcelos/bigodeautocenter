import Link from 'next/link'
import styles from './styles.module.scss'
import globals from '../../../styles/globals.module.scss'

export default function Footer() {
  return (
    <footer className={styles.container}>
      <div className={`${styles.content} ${globals.grid}`}>
        <div className={styles.brand}>
          <Link href={'#home'}>
            <a className={`${styles.logo}`}>Bigode <span className={styles.coloured}>Auto Center</span>.</a>
          </Link>
          <p>&copy; 2021 Bigode Auto Center.</p>
          <p>All rights reserved.</p>
        </div>
      </div>
      <div className={styles.developedBy}>
        <p>Developed by <a className={styles.myLink} rel="noreferrer" target="_blank" href="https://teilorwebdev.vercel.app/">Teilor Souza Barcelos</a></p>
      </div>
    </footer>
  )
}