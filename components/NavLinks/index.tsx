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
  )
}