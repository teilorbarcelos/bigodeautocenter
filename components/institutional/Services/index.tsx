import styles from './styles.module.scss'
import globals from '../../../styles/globals.module.scss'
import MotorIcon from '../icons/MotorIcon'
import Card from '../Card'
import BreackIcon from '../icons/BreackIcon'
import ShockAbsorberIcon from '../icons/ShockAbsorberIcon'

export default function Services() {
  const services = [
    {
      id: 1,
      icon: <MotorIcon className={styles.svgFill} />,
      title: "Mecânica em Geral",
      description: "Mecânica em geral de todos os tipos de motores, tais como álcool, gasolina e diesel."
    },
    {
      id: 2,
      icon: <BreackIcon className={styles.svgFill} />,
      title: "Freios",
      description: "Verificamos toda a parte de freios, desde o pedal até o acionamento, com freio não se brinca, venha fazer uma revisão."
    },
    {
      id: 3,
      icon: <ShockAbsorberIcon className={styles.svgFill} />,
      title: "Suspenção",
      description: "Não poderia faltar também a parte de suspenção, desde os amortecedores até as rodas, com direito a balanceamento e geometria computadorizada."
    }
  ]

  return (
    <section className={styles.services} id="services">
      <div className={`${styles.container} ${styles.grid}`}>
        <header className={styles.header}>
          <h2 className={globals.title}>Serviços</h2>
          <p className={`${globals.subtitle} ${globals.smallText}`}>Com uma equipe de profissionais capacitados, o <strong className={styles.coloured}>Bigode Auto Center</strong> já conquistou inúmeros clientes por priosizar a sua satisfação e tranquilidade enquanto cuidamos do seu carro.</p>
        </header>
        <div className={`${styles.cards} ${styles.grid}`}>
          {services.map(service => {
            return (
              <Card
                key={service.id}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}