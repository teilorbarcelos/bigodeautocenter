import React, { ReactNode } from "react";
import styles from './styles.module.scss'

interface Props {
  children: ReactNode
  onClose: () => void
}

export default function TransparentModal({
  children,
  onClose
}: Props) {
  const handleOnClose = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.currentTarget === event.target) {
      onClose()
    }
  }

  return (
    <div
      className={styles.transparentmodal}
      onClick={event => handleOnClose(event)}
    >
      <div>
        {children}
      </div>
    </div>
  )
}
