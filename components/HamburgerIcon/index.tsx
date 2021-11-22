import styles from './styles.module.scss'

interface Props {
  open?: boolean
  openCloseFunction?: () => void
}

export default function HamburgerIcon({ open = false, openCloseFunction }: Props) {
  return (
    <div
      className={`${styles.hamburger} ${open && styles.x}`}
      onClick={openCloseFunction}
    >
      <div className={styles.line1}></div>
      <div className={styles.line2}></div>
      <div className={styles.line3}></div>
    </div>
  )
}