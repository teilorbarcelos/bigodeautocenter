import styles from './styles.module.scss'
import globals from '../../styles/globals.module.scss'
import Link from 'next/link'

interface Props {
  href: string
}

export default function Logo(props: Props) {
  return (
    <div className={`${styles.logo} ${globals.link}`} id="logo">
      <Link href={props.href}>
        <a className={styles.color}>BIGODE <span className={styles.logoDif}>AUTO CENTER</span>.</a>
      </Link>
    </div>
  )
}