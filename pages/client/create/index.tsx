import type { NextPage } from 'next'
import globals from '../../../styles/globals.module.scss'
import BasicPage from '../../../components/BasicPage'
import Navbar from '../../../components/Navbar'
import styles from './styles.module.scss'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { IClient } from '../../../components/ClientTable'
import { api } from '../../api'
import ReactInputMask from 'react-input-mask'
import Button1 from '../../../components/Button1'

const ClientCreate: NextPage = () => {
  const router = useRouter()
  const { register, handleSubmit } = useForm()

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

    alert('Cliente cadastrado com sucesso!')

    router.push(`/client/id/${response.data.id}`)
  }



  return (
    <BasicPage
      title="Cadastro de cliente"
    >
      <>
        <Navbar />

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
              <ReactInputMask
                mask="999.999.999-99"
                id="cpf"
                type="text"
                className={globals.input}
                placeholder="123.456.789-10"
              />
            </div>
          </div>
          <div className={styles.smallInput}>
            <div>
              <label htmlFor="birthday">Data de nascimento:</label>
              <input
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
              placeholder="Informações adicionais."
            />
          </div>
          <div className={styles.buttons}>
            <Button1 title="Salvar" />
          </div>
        </form>

      </>
    </BasicPage>
  )
}

export default ClientCreate
