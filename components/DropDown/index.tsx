import styles from './styles.module.scss'
import globals from '../../styles/globals.module.scss'
import { useState } from 'react'
import Button1 from '../Button1'

interface IOption {
  title: string
  action: () => void
  disabled?: boolean
}

interface Props {
  title: string
  options: IOption[]
}

export default function DropDown({ title = 'Opções', options }: Props) {
  const [visible, setVisible] = useState(false)

  async function visibleSwitch() {
    if (visible) {
      setVisible(false)
      return
    }
    setVisible(true)
  }

  return (
    <>
      <div
        className={styles.dropdown}
        id="dropdown"
        onClick={visibleSwitch}
      >
        {title}
        <div
          className={`${styles.options} ${visible && styles.visible}`}
        >
          {
            options.map((option, index) => {
              return (
                <>
                  {
                    !option.disabled &&
                    <Button1
                      key={index}
                      type="button"
                      onClick={option.action}
                      title={option.title}
                    />
                  }
                </>
              )
            })
          }
        </div>
      </div>
    </>
  )
}