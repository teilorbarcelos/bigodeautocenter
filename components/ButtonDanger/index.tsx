import { ButtonHTMLAttributes } from 'react'
import styles from './styles.module.css'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
}

export default function ButtonDanger({ title, ...rest }: Props) {
  return (
    <button {...rest} className={styles.buttondanger}>{title}</button>
  )
}