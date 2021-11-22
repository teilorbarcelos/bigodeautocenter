import styles from './styles.module.scss'

interface Props {
  color?: string | undefined
}

export default function WhatsappIcon({ color }: Props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path className={color && color == 'white' ? styles.fillWhite : styles.fill} d="M16.6 14C16.4 13.9 15.1 13.3 14.9 13.2C14.7 13.1 14.5 13.1 14.3 13.3C14.1 13.5 13.7 14.1 13.5 14.3C13.4 14.5 13.2 14.5 13 14.4C12.3 14.1 11.6 13.7 11 13.2C10.5 12.7 10 12.1 9.6 11.5C9.5 11.3 9.6 11.1 9.7 11C9.8 10.9 9.9 10.7 10.1 10.6C10.2 10.5 10.3 10.3 10.3 10.2C10.4 10.1 10.4 9.89998 10.3 9.79998C10.2 9.69998 9.7 8.49998 9.5 7.99998C9.4 7.29998 9.2 7.29998 9 7.29998C8.9 7.29998 8.7 7.29998 8.5 7.29998C8.3 7.29998 8 7.49998 7.9 7.59998C7.3 8.19998 7 8.89998 7 9.69998C7.1 10.6 7.4 11.5 8 12.3C9.1 13.9 10.5 15.2 12.2 16C12.7 16.2 13.1 16.4 13.6 16.5C14.1 16.7 14.6 16.7 15.2 16.6C15.9 16.5 16.5 16 16.9 15.4C17.1 15 17.1 14.6 17 14.2C17 14.2 16.8 14.1 16.6 14ZM19.1 4.89998C15.2 0.999976 8.9 0.999976 5 4.89998C1.8 8.09998 1.2 13 3.4 16.9L2 22L7.3 20.6C8.8 21.4 10.4 21.8 12 21.8C17.5 21.8 21.9 17.4 21.9 11.9C22 9.29997 20.9 6.79998 19.1 4.89998ZM16.4 18.9C15.1 19.7 13.6 20.2 12 20.2C10.5 20.2 9.1 19.8 7.8 19.1L7.5 18.9L4.4 19.7L5.2 16.7L5 16.4C2.6 12.4 3.8 7.39998 7.7 4.89998C11.6 2.39998 16.6 3.69998 19 7.49998C21.4 11.4 20.3 16.5 16.4 18.9Z" />
    </svg>
  )
}