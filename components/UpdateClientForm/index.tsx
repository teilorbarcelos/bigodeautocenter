import styles from './styles.module.scss'
import globals from '../../styles/globals.module.scss'
import { useForm } from 'react-hook-form'

import Button1 from '../Button1'
import ReactInputMask from 'react-input-mask'
import { api } from '../../pages/api'
import Button2 from '../Button2'
import React, { useEffect, useState } from 'react'

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
  clientId: string
}

interface IClientResponseData {
  id: string
  name: string
  contact: string
  cpf: string
  info: string
  birthday: Date
  sales: [{}]
  reminder: [{}]
}

export default function UpdateClientForm(props: Props) {
  const { register, handleSubmit } = useForm()
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [cpf, setCpf] = useState('')
  const [birthday, setBirthday] = useState('')
  const [info, setInfo] = useState('')

  useEffect(() => {
    async function getClientData() {
      const clientResponse = await api.post<IClientResponseData>('/client/getData', {
        id: props.clientId
      })

      const client = clientResponse.data

      setName(client.name)
      setContact(client.contact)
      setCpf(client.cpf)
      setBirthday(client.birthday?.toString().replace('T00:00:00.000Z', ''))
      setInfo(client.info)
      // console.log(client.sales)
    }

    getClientData()
  }, [props.clientId])

  async function updateClient(data: IClient) {
    const response = await api.post<IClient>('/client/update', {
      id: props.clientId,
      birthday,
      contact,
      cpf,
      info,
      name
    })

    if (response.data.error) {
      alert(response.data.error)
      return
    }

    alert('Cadastro atualizado com sucesso!')

    props.closeModal()
  }

  async function escapeKey(e: string) {
    if (e === 'Escape') {
      props.closeModal()
    }
  }

  return (
    <form
      className={styles.updateClientForm}
      onSubmit={handleSubmit(updateClient)}
      onKeyDown={(e) => escapeKey(e.key)}
    >
      <h5>{name}</h5>
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
        <Button1 title="Salvar" />

        <Button2 type="button" onClick={() => props.closeModal()} title="Cancelar" />
      </div>
    </form>
  )
}