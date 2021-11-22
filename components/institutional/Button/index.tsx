import styles from './styles.module.scss'
import Link from 'next/link'
import { ReactNode } from 'react'

interface Props {
  target?: string
  icon?: ReactNode | false
  title: string
  href: string
}

export default function Button({ icon = false, title, href, target = '_blank' }: Props) {
  return (
    <Link href={href}>
      <a
        target={target}
        className={styles.button}
      >
        {icon && <i className={styles.icon}>{icon}</i>}
        {title}
      </a>
    </Link>
  )
}