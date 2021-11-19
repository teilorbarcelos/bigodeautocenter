import styles from './styles.module.scss'
import globals from '../../styles/globals.module.scss'
import ClientIcon from '../svg/ClientIcon'
import SaleIcon from '../svg/SaleIcon'
import router from 'next/router'
import ReportIcon from '../svg/ReportIcon'
import DebitIcon from '../svg/DebitIcon'
import ReminderIcon from '../svg/ReminderIcon'
import UserIcon from '../svg/UserIcon'
import { useAuth } from '../../hooks/useAuth'
import UsersIcon from '../svg/UsersIcon'

export default function InitialPage() {
  const { user } = useAuth()

  return (
    <section className={styles.initialpage} id="initialpage">
      <div className={styles.title}>
        <h5>Olá, {user && user.name}</h5>
      </div>
      <div className={styles.cards}>

        <div
          className={styles.card}
          onClick={() => router.push('/sale/list')}
        >
          <div>
            <h6>Vendas</h6>
          </div>
          <div>
            <SaleIcon className={styles.svgIcon} />
          </div>
        </div>

        <div
          className={styles.card}
          onClick={() => router.push('/client/list')}
        >
          <div>
            <h6>Clientes</h6>
          </div>
          <div>
            <ClientIcon className={styles.svgIcon} />
          </div>
        </div>

        <div
          className={styles.card}
          onClick={() => router.push('/reports')}
        >
          <div>
            <h6>Relatórios</h6>
          </div>
          <div>
            <ReportIcon className={styles.svgIcon} />
          </div>
        </div>

        <div
          className={styles.card}
          onClick={() => router.push('/debit/list')}
        >
          <div>
            <h6>Débitos</h6>
          </div>
          <div>
            <DebitIcon className={styles.svgIcon} />
          </div>
        </div>

        <div
          className={styles.card}
          onClick={() => router.push('/reminder/list')}
        >
          <div>
            <h6>Lembretes</h6>
          </div>
          <div>
            <ReminderIcon className={styles.svgIcon} />
          </div>
        </div>

        <div
          className={styles.card}
          onClick={() => router.push('/user/profile')}
        >
          <div>
            <h6>Meu cadastro</h6>
          </div>
          <div>
            <UserIcon className={styles.svgIcon} />
          </div>
        </div>

        {
          user && user.admin &&
          <div
            className={styles.card}
            onClick={() => router.push('/user/list')}
          >
            <div>
              <h6>Gerenciar Usuários</h6>
            </div>
            <div>
              <UsersIcon className={styles.svgIcon} />
            </div>
          </div>
        }

      </div>
    </section>
  )
}