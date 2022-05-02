import styles from './styles.module.scss'
import Logo from '../../Logo'
import NavLinks from '../NavLinks'
import HamburgerIcon from '../../HamburgerIcon'
import { useState } from 'react'
import Modal from '../../Modal'

export default function Header() {
  const [modalMenuOpen, setModalMenuOpen] = useState(false)

  return (
    <header className={styles.header} id="header">
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
    </header>
  )
}
