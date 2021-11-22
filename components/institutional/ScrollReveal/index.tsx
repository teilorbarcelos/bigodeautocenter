import React, { ReactNode, useEffect, useRef } from 'react'
import styles from './styles.module.scss'
import scrollReveal from 'scrollreveal'

interface Props {
  children: ReactNode
}

export default function ScrollReveal({ children }: Props) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (sectionRef.current)
      scrollReveal().reveal(sectionRef.current, {
        reset: true,
        delay: 500,
        duration: 900
      })
  }, [])

  return (
    <section
      className={styles.container}
      ref={sectionRef}
    >
      {children}
    </section>
  )
}