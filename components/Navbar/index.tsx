import styles from './styles.module.scss'
import Logo from '../Logo'
import NavLinks from '../NavLinks'
import Modal from '../Modal'
import { useState } from 'react'
import HamburgerIcon from '../HamburgerIcon'

export default function Navbar() {
  const [modalMenuOpen, setModalMenuOpen] = useState(false)

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <Logo href="/" />
          </div>

          <div className={styles.desktop}>
            <NavLinks />
          </div>

          <HamburgerIcon
            open={modalMenuOpen}
            openCloseFunction={() => setModalMenuOpen(modalMenuOpen ? false : true)}
          />

        </div>
        <Modal closeModal={() => setModalMenuOpen(false)} visible={modalMenuOpen}>
          <NavLinks />
        </Modal>
      </nav>
    </>
  )
}