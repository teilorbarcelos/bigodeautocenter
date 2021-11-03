import React, { useState } from 'react'
import ReactInputMask from 'react-input-mask'
import { useForm } from 'react-hook-form'

import styles from './styles.module.scss'
import globals from '../../styles/globals.module.scss'
import { api } from '../../pages/api'
import Button1 from '../Button1'
import Button2 from '../Button2'
import { IClient } from '../ClientTable'

interface Props {
  closeModal: () => void
  client: IClient
}

export default function UpdateClientForm(props: Props) {
  const { handleSubmit } = useForm()
  const [name, setName] = useState(props.client.name)
  const [contact, setContact] = useState(props.client.contact)
  const [cpf, setCpf] = useState(props.client.cpf)
  const [birthday, setBirthday] = useState(props.client.birthday?.toString().replace('T00:00:00.000Z', ''))
  const [info, setInfo] = useState(props.client.info)

  async function updateClient() {
    const response = await api.post<IClient>('/client/update', {
      id: props.client.id,
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
    <div>
      <form
        className={styles.updateClientForm}
        onSubmit={handleSubmit(updateClient)}
        onKeyDown={(e) => escapeKey(e.key)}
      >
        <h5>{props.client.name}</h5>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
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

      <div className={styles.sales}>
        {props.client.sales.map((sale) => {
          const stringDate = sale.createdAt.split('T')[0].split('-')
          const date = `${stringDate[2]}/${stringDate[1]}/${stringDate[0]}`
          return (
            <div key={sale.id} title="Ver detalhes" className={styles.sale}>
              <p>{date}</p>
              <div className={styles.preview}>
                <div>
                  <p>Placa:</p>
                  <p>{sale.plate}</p>
                </div>
                <div>
                  <p>Total:</p>
                  <p>R$ {sale.total}</p>
                </div>
                <div>
                  <p>Status:</p>
                  <p className={sale.paid ? styles.paid : styles.notPaid}>{sale.paid ? 'Pago' : 'Pendente'}</p>
                </div>
              </div>
            </div>
          )
        })}

      </div>
    </div>
  )
}