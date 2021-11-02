import styles from './styles.module.scss'
import globals from '../../styles/globals.module.scss'

interface Props {
  visible: boolean
}

export default function LoadingScreen({ visible = false }: Props) {
  return (
    <div className={`${styles.loadingscreen} ${visible && styles.visible}`} id="loadingscreen">
      <h5>Carregando...</h5>
    </div>
  )
}