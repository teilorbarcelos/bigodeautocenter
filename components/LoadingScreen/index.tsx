import styles from './styles.module.scss'
import globals from '../../styles/globals.module.scss'
import Image from 'next/image'

import LoadingImg from 'svg-loaders/svg-smil-loaders/oval.svg'

interface Props {
  visible: boolean
}

export default function LoadingScreen({ visible = false }: Props) {
  return (
    <div className={`${styles.loadingscreen} ${visible && styles.visible}`} id="loadingscreen">
      <Image className={styles.loadingFill} src={LoadingImg} />
    </div>
  )
}