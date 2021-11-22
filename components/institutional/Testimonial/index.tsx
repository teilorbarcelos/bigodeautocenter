import { ReactNode } from 'react'
import styles from './styles.module.scss'
import globals from '../../../styles/globals.module.scss'

interface Props {
  text: string
  userImage: ReactNode
  userName: string
}

export default function Testimonial({ text, userImage, userName }: Props) {
  return (
    <div className={`${styles.testimonial}`}>
      <blockquote>
        <p>
          <span>&ldquo;</span>
          {text}
        </p>
        <cite className={styles.cite}>
          {userImage}
          {userName}
        </cite>
      </blockquote>
    </div>
  )
}