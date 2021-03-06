import type { NextPage } from 'next'
import globals from '../../../styles/globals.module.scss'
import styles from './styles.module.scss'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { IClient } from '../../../components/ClientTable'
import { api } from '../../api'
import MyMaskedInput from '../../../components/MyMaskedInput'
import Button1 from '../../../components/Button1'
import { useState } from 'react'
import Layout from '../../../components/Layout'
import axios from 'axios'
import { useAuth } from '../../../hooks/useAuth'

const ClientCreate: NextPage = () => {
  const [loading, setLoading] = useState(false)
  const { logOut } = useAuth()
  const router = useRouter()
  const { register, handleSubmit } = useForm()
  const [cpf, setCpf] = useState('')
  const [cnpj, setCnpj] = useState('')

  async function newClient(data: IClient) {
    try {
      setLoading(true)

      const response = await api.post<IClient>('/client/create', {
        birthday: data.birthday,
        contact: data.contact,
        cpf,
        cnpj,
        info: data.info,
        name: data.name
      })

      alert('Cliente cadastrado com sucesso!')

      router.push(`/client/id/${response.data.id}`)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.error
        alert(errorMessage);
        if (errorMessage === 'Access authorized only for authenticated users!') {
          logOut()
        }
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout
      title="Cadastro de cliente"
      externalLoading={loading}
    >
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
            placeholder="Dados de contato"
          />
        </div>

        <div className={styles.smallInput}>
          <div>
            <label htmlFor="cpf">CPF:</label>
            <MyMaskedInput
              // {...register('cpf')} // disable due reference error in customized input
              mask="cpf"
              id="cpf"
              type="text"
              onChange={e => setCpf(e.target.value)}
              value={cpf}
              className={globals.input}
              placeholder="123.456.789-10"
            />
          </div>
        </div>

        <div className={styles.smallInput}>
          <div>
            <label htmlFor="cnpj">CNPJ:</label>
            <MyMaskedInput
              // {...register('cnpj')} // disable due reference error in customized input
              mask="cnpj"
              id="cnpj"
              type="text"
              onChange={e => setCnpj(e.target.value)}
              value={cnpj}
              className={globals.input}
              placeholder="12.345.678/9012-34"
            />
          </div>
        </div>

        <div className={styles.smallInput}>
          <div>
            <label htmlFor="birthday">Data (Opcional):</label>
            <input
              {...register('birthday')}
              id="birthday"
              type="date"
              className={globals.input}
            />
          </div>
        </div>

        <div>
          <label htmlFor="info">Info. adicional:</label>
          <textarea
            {...register('info')}
            id="info"
            className={globals.textarea}
            placeholder="Informa????es adicionais."
          />
        </div>

        <div className={styles.buttons}>
          <Button1 title="Salvar" />
        </div>

      </form>
    </Layout>
  )
}

export default ClientCreate
