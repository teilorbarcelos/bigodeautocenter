import styles from './styles.module.scss'

interface Props {
  title: string
}

export default function Button1({ title }: Props) {
  return (
    <button className={styles.button1}>{title}</button>
  )
}