import styles from '../styles.module.scss'

interface Props {
  color?: string | undefined
}

export default function ArrowUpIcon({ color }: Props) {
  return (
    <svg width="24" height="24" viewBox="0 0 768 768" xmlns="http://www.w3.org/2000/svg">
      <path className={color && color == 'white' ? styles.fillWhite : styles.fill} d="M182.624 406.624l169.376-169.376v370.752c0 17.664 14.336 32 32 32s32-14.336 32-32v-370.752l169.376 169.376c12.512 12.512 32.768 12.512 45.248 0s12.512-32.768 0-45.248l-224-224c-2.944-2.944-6.464-5.312-10.368-6.944s-8.096-2.432-12.256-2.432c-8.192 0-16.384 3.136-22.624 9.376l-224 224c-12.512 12.512-12.512 32.768 0 45.248s32.768 12.512 45.248 0z" />
    </svg>
  )
}