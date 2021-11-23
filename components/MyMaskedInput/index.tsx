import styles from './styles.module.scss'
import globals from '../../styles/globals.module.scss'
import { InputHTMLAttributes, useCallback } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  mask: "cnpj" | "cpf";
  prefix?: string;
}

export default function MyMaskedInput({ mask, prefix, ...props }: InputProps) {

  async function cpf(e: React.FormEvent<HTMLInputElement>) {
    e.currentTarget.maxLength = 14
    let value = e.currentTarget.value
    if (!value.match(/^(\d{3}).(\d{3}).(\d{3})-(\d{2})$/)) {
      value = value.replace(/\D/g, "")
      value = value.replace(/(\d{3})(\d)/, "$1.$2")
      value = value.replace(/(\d{3})(\d)/, "$1.$2")
      value = value.replace(/(\d{3})(\d)/, "$1-$2")
      value = value.replace(/(\d{2})$/, "$1")
      e.currentTarget.value = value
    }
    return e
  }

  async function cnpj(e: React.FormEvent<HTMLInputElement>) {
    e.currentTarget.maxLength = 18
    let value = e.currentTarget.value
    if (!value.match(/^(\d{2}).(\d{3}).(\d{3})\/(\d{4})-(\d{2})$/)) {
      value = value.replace(/\D/g, "")
      value = value.replace(/(\d{2})(\d)/, "$1.$2")
      value = value.replace(/(\d{3})(\d)/, "$1.$2")
      value = value.replace(/(\d{3})(\d)/, "$1/$2")
      value = value.replace(/(\d{4})(\d)/, "$1-$2")
      value = value.replace(/(\d{2})$/, "$1")
      e.currentTarget.value = value
    }
    return e
  }

  async function handleKeyUp(e: React.FormEvent<HTMLInputElement>) {
    switch (mask) {
      case 'cpf':
        cpf(e)
        break

      case 'cnpj':
        cnpj(e)
        break
    }
  }

  return (
    <input {...props} onKeyPress={handleKeyUp} />
  )
}