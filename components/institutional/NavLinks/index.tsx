import styles from './styles.module.scss'
import globals from '../../../styles/globals.module.scss'
import Link from 'next/link'

export default function NavLinks() {
  return (
    <ul className={styles.navlinks} id="navlinks">

      <li>
        <Link href={"#home"}>
          <a rel="nofollow" className={globals.link}>Home</a>
        </Link>
      </li>

      <li>
        <Link href={"#about"}>
          <a rel="nofollow" className={globals.link}>Sobre</a>
        </Link>
      </li>

      <li>
        <Link href={"#services"}>
          <a rel="nofollow" className={globals.link}>Serviços</a>
        </Link>
      </li>

      <li>
        <Link href={"#testimonials"}>
          <a rel="nofollow" className={globals.link}>Depoimentos</a>
        </Link>
      </li>

      <li>
        <Link href={"#contact"}>
          <a rel="nofollow" className={globals.link}>Contato</a>
        </Link>
      </li>

      <li>
        <Link href={"/dashboard"}>
          <a rel="nofollow" className={globals.link}>Sistema Interno</a>
        </Link>
      </li>

    </ul>
  )
}