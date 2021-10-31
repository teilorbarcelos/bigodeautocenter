import styles from './styles.module.css'
import Link from 'next/link'

interface Props {
  href: string
}

export default function Logo(props: Props) {
  return (
    <div className={styles.logo} id="logo">
      <Link href={props.href}>
        <a>BIGODE <span className={styles.logoDif}>AUTO CENTER</span>.</a>
      </Link>
    </div>
  )
}