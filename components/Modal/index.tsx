import styles from './styles.module.scss'
import globals from '../../styles/globals.module.scss'
import { ReactNode, SetStateAction } from 'react'

interface Props {
  children: ReactNode
  visible: boolean
  closeModal: () => void
}

export default function Modal(props: Props) {
  return (
    <section className={`${styles.modal} ${props.visible && styles.visible}`} id="modal">
      <p className={styles.close} onClick={props.closeModal}>X</p>

      <div className={styles.children}>
        {props.children}
      </div>


    </section>
  )
}