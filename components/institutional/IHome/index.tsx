import styles from './styles.module.scss'
import Image from 'next/image'
import img1 from '../../../public/img1.jpg'
import globals from '../../../styles/globals.module.scss'

export default function IHome() {
  return (
    <section className={`${styles.home}`} id="home">
      <div className={`${styles.container} ${globals.grid}`}>
        <div className={styles.image}>
          <Image
            className={globals.img}
            src={img1}
            alt="Ilustração do trabalho no Bigode Auto Center."
          />
        </div>
        <div className={styles.text}>
          <h2 className={globals.title}>A melhor solução em mecânica automotiva da cidade</h2>
          <p
            className={globals.smallText}
          >Uma mecânica exclusiva em Criciúma - SC, especializada em atender bem o cliente.</p>
        </div>
      </div>
    </section>
  )
}