import styles from './styles.module.scss'
import Link from 'next/link'
import ArrowUpIcon from '../icons/ArrowUpIcon'
import { useEffect, useState } from 'react'

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScroll = () => {
    if (window.scrollY > 560) {
      setVisible(true)
      return
    }

    setVisible(false)
  }

  return (
    <Link href={'#home'}>
      <a className={`${styles.arrowUp} ${visible && styles.visible}`}><i><ArrowUpIcon color="white" /></i></a>
    </Link>
  )
}