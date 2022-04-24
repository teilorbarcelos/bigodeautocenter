import styles from './styles.module.scss'
import LinkItem from './LinkItem'

export default function NavLinks() {
  return (
    <ul className={styles.navlinks} id="navlinks">

      <LinkItem
        title='Início'
        href='/dashboard'
      />

      <LinkItem
        title='Vendas'
        href='/sale/list'
      />

      <LinkItem
        title='Clientes'
        href='/client/list'
      />

      <LinkItem
        title='Produtos'
        href='/product/list'
      />

      <LinkItem
        title='Relatórios'
        href='/reports'
      />

      <LinkItem
        title='Débitos Pendentes'
        href='/debit/list'
      />

      <LinkItem
        title='Pagamentos'
        href='/income/list'
      />

      <LinkItem
        title='Lembretes'
        href='/reminder/list'
      />

    </ul>
  )
}
