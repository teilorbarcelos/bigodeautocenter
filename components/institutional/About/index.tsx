import styles from './styles.module.scss'
import Image from 'next/image'
import img2 from '../../../public/img2.jpg'
import globals from '../../../styles/globals.module.scss'

export default function About() {
  return (
    <section className={styles.about} id="about">
      <div className={`${styles.container} ${globals.grid}`}>
        <div className={styles.image}>
          <Image className={globals.img} src={img2} alt="Ilustração do trabalho no salão de beleza." />
        </div>
        <div className={styles.text}>
          <h2 className={globals.title}>Sobre nós</h2>
          <p
            className={globals.smallText}
          >Aqui vai um texto bem bonito falando como a empresa trabalha bem e é confiável...</p>
          <p
            className={globals.smallText}
          >Aqui vai um texto bem bonito falando como a empresa trabalha bem e é confiável...</p>
          <p
            className={globals.smallText}
          >Aqui vai um texto bem bonito falando como a empresa trabalha bem e é confiável...</p>
        </div>
      </div>
    </section>
  )
}