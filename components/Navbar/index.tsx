import Link from 'next/link'
import styles from './styles.module.scss'
import Logo from '../Logo'
import { useAuth } from '../../hooks/useAuth'
import NavLinks from '../NavLinks'
import Modal from '../Modal'
import { useState } from 'react'

export default function Navbar() {
  const [modalMenuOpen, setModalMenuOpen] = useState(false)
  const { user } = useAuth()

  return (
    <>
      {user &&
        <nav className={styles.nav}>
          <div className={styles.container}>
            <div className={styles.logo}>
              <Logo href="/" />
            </div>

            <div className={styles.desktop}>
              <NavLinks user={user} />
            </div>

            <div
              className={styles.sandwich}
              onClick={() => setModalMenuOpen(true)}
            >
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <Modal closeModal={() => setModalMenuOpen(false)} visible={modalMenuOpen}>
            <NavLinks user={user} />
          </Modal>
        </nav>
      }
    </>
  )
}