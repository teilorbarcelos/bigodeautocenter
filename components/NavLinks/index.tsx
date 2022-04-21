import styles from './styles.module.scss'
import globals from '../../styles/globals.module.scss'
import Link from 'next/link'

export default function NavLinks() {
  return (
    <ul className={styles.navlinks} id="navlinks">

      <li>
        <Link href={"/dashboard"}>
          <a className={globals.link}>Início</a>
        </Link>
      </li>

      <li>
        <Link href={"/sale/list"}>
          <a className={globals.link}>Vendas</a>
        </Link>
      </li>

      <li>
        <Link href={"/client/list"}>
          <a className={globals.link}>Clientes</a>
        </Link>
      </li>

      <li>
        <Link href={"/product/list"}>
          <a className={globals.link}>Produtos</a>
        </Link>
      </li>

      <li>
        <Link href={"/reports"}>
          <a className={globals.link}>Relatórios</a>
        </Link>
      </li>

      <li>
        <Link href={"/debit/list"}>
          <a className={globals.link}>Débitos Pendentes</a>
        </Link>
      </li>

      <li>
        <Link href={"/income/list"}>
          <a className={globals.link}>Pagamentos</a>
        </Link>
      </li>

      <li>
        <Link href={"/reminder/list"}>
          <a className={globals.link}>Lembretes</a>
        </Link>
      </li>

    </ul>
  )
}
