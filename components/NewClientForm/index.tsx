import styles from './styles.module.scss'
import globals from '../../styles/globals.module.scss'
import { useForm } from 'react-hook-form'

import Button1 from '../Button1'
import ReactInputMask from 'react-input-mask'
import { api } from '../../pages/api'
import { useState } from 'react'
import Button2 from '../Button2'

export interface IClient {
  id?: string
  error?: string
  birthday: Date
  contact: string
  cpf: string
  info: string
  name: string
}

interface Props {
  closeModal: () => void
}

export default function NewClientForm(props: Props) {
  const { register, handleSubmit } = useForm()
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [cpf, setCpf] = useState('')
  const [birthday, setBirthday] = useState('')
  const [info, setInfo] = useState('')

  async function newClient(data: IClient) {
    const response = await api.post<IClient>('/client/create', {
      birthday: data.birthday,
      contact: data.contact,
      cpf: data.cpf,
      info: data.info,
      name: data.name
    })

    if (response.data.error) {
      alert(response.data.error)
      return
    }

    setBirthday('')
    setContact('')
    setCpf('')
    setInfo('')
    setName('')

    alert('Cliente cadastrado com sucesso!')

    props.closeModal()
  }

  async function cancel(event: Event) {
    event.preventDefault()
    setBirthday('')
    setContact('')
    setCpf('')
    setInfo('')
    setName('')

    props.closeModal()
  }

  return (
    <form
      className={styles.newclientform}
      onSubmit={handleSubmit(newClient)}
    >
      <h5>Cadastrar cliente</h5>
      <div>
        <label htmlFor="name">Nome:</label>
        <input
          {...register('name')}
          id="name"
          type="text"
          className={globals.input}
          onChange={e => setName(e.target.value)}
          value={name}
          placeholder="Nome do cliente"
        />
      </div>
      <div>
        <label htmlFor="contact">Contato:</label>
        <input
          {...register('contact')}
          id="contact"
          type="text"
          className={globals.input}
          onChange={e => setContact(e.target.value)}
          value={contact}
          placeholder="Dados de contato"
        />
      </div>
      <div>
        <label htmlFor="cpf">CPF:</label>
        <ReactInputMask
          mask="999.999.999-99"
          {...register('cpf')}
          id="cpf"
          type="text"
          className={globals.input}
          onChange={e => setCpf(e.target.value)}
          value={cpf}
          placeholder="123.456.789-10"
        />
      </div>
      <div>
        <label htmlFor="birthday">Data de nascimento:</label>
        <input
          {...register('birthday')}
          id="birthday"
          type="date"
          className={globals.input}
          onChange={e => setBirthday(e.target.value)}
          value={birthday}
        />
      </div>
      <div>
        <label htmlFor="info">Info. adicional:</label>
        <textarea
          {...register('info')}
          id="info"
          className={globals.textarea}
          onChange={e => setInfo(e.target.value)}
          value={info}
          placeholder="Informações adicionais."
        />
      </div>
      <div className={styles.buttons}>
        <Button2 onClick={() => cancel(event)} title="Cancelar" />

        <Button1 title="Salvar" />
      </div>
    </form>
  )
}