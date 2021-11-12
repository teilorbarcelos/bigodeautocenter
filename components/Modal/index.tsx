import styles from './styles.module.scss'
import globals from '../../styles/globals.module.scss'
import { ReactNode, SetStateAction } from 'react'

interface Props {
  children: ReactNode
  visible: boolean
  closeModal: () => void
}

export default function Modal(props: Props) {
  async function keyPressed(e) {
    if (e.keyCode === 27) {
      props.closeModal()
    }
  }
  return (
    <section
      onKeyDown={(e) => console.log(e.key)}
      className={`${styles.modal} ${props.visible && styles.visible}`}
      id="modal"
      onClick={props.closeModal}
    >
      <div className={styles.children}>
        {props.children}
      </div>


    </section>
  )
}