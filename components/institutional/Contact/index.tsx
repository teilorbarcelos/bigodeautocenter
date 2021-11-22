import styles from './styles.module.scss'
import globals from '../../../styles/globals.module.scss'
import Button from '../Button'
import WhatsappIcon from '../icons/WhatsappIcon'
import PhoneIcon from '../icons/PhoneIcon'
import MapPinIcon from '../icons/MapPinIcon'
import MailIcon from '../icons/MailIcon'

export default function Contact() {
  return (
    <section className={styles.container} id="contact">
      <div className={`${globals.container} ${styles.content}`}>
        <div className={styles.text}>
          <h2 className={globals.title}>Entre em contato com a gente!</h2>
          <p>Entre em contato com o Bigode Auto Center, queremos tirar suas dúvidas, ouvir suas críticas e sugestões.</p>
          <div className={styles.button}>
            <Button
              target="_blank"
              icon={<WhatsappIcon color="white" />}
              href={'https://api.whatsapp.com/send?phone=+5548996128191&text=Hello'}
              title="Entre em contato"
            />
          </div>
        </div>

        <div className={styles.contactList}>
          <ul className={globals.grid}>
            <li><PhoneIcon /> 48 99612-8191</li>
            <li><MapPinIcon /> Rod. Luiz Rosso, 1044</li>
            <li><MailIcon /> bigodeautocentercriciuma@gmail.com</li>
          </ul>
        </div>
      </div>
    </section>
  )
}