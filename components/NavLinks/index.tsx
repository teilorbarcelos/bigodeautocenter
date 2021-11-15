import styles from './styles.module.scss'
import globals from '../../styles/globals.module.scss'
import Link from 'next/link'
import { IUser } from '../../contexts/authContext'

interface Props {
  user: IUser
}

export default function NavLinks({ user }: Props) {
  return (
    <ul className={styles.navlinks} id="navlinks">
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
        <Link href={"/reminders"}>
          <a className={globals.link}>Lembretes</a>
        </Link>
      </li>
      <li>
        <Link href={"/user/profile"}>
          <a className={globals.link}>{user.name}</a>
        </Link>
      </li>
    </ul>
  )
}