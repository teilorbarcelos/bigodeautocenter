import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import styles from './styles.module.scss'
import globals from '../../../styles/globals.module.scss'
import LoadingScreen from '../../../components/LoadingScreen'
import { useEffect, useState } from 'react'
import { IClient, ISale } from '../../../components/ClientTable'
import { api } from '../../api'
import BasicPage from '../../../components/BasicPage'
import Navbar from '../../../components/Navbar'
import { useForm } from 'react-hook-form'
import ReactInputMask from 'react-input-mask'
import Button1 from '../../../components/Button1'
import SaleTable from '../../../components/SaleTable'
import ReminderTable, { IReminder } from '../../../components/ReminderTable'
import ButtonDanger from '../../../components/ButtonDanger'

const Client: NextPage = () => {
  const { handleSubmit } = useForm()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [id, setId] = useState('')
  const [originalName, setOriginalName] = useState('')
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [cpf, setCpf] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [birthday, setBirthday] = useState('')
  const [info, setInfo] = useState('')
  const [sales, setSales] = useState<ISale[]>([])
  const [reminders, setReminders] = useState<IReminder[]>([])

  async function getClient() {

    const { id } = await router.query // necessary "await" here

    if (!id) {
      return
    }

    const clientResponse = await api.post<IClient>('/client/getData', {
      id
    })

    setId(id as string)
    setOriginalName(clientResponse.data.name)
    setName(clientResponse.data.name)
    setContact(clientResponse.data.contact)
    setCpf(clientResponse.data.cpf)
    setCnpj(clientResponse.data.cnpj)
    setBirthday(clientResponse.data.birthday?.toString().replace('T00:00:00.000Z', ''))
    setInfo(clientResponse.data.info)
    setSales(clientResponse.data.sales)
    setReminders(clientResponse.data.reminders)

  }

  useEffect(() => {
    try {

      getClient()

    } catch (error) {
      alert(error)
    } finally {
      setLoading(false)
    }
  }, [router.query])

  async function updateClient() {
    const response = await api.post<IClient>('/client/update', {
      id,
      birthday,
      contact,
      cpf,
      cnpj,
      info,
      name
    })

    if (response.data.error) {
      alert(response.data.error)
      return
    }

    alert('Cadastro atualizado com sucesso!')
  }

  async function createReminder() {
    const reminderResponse = await api.post<IReminder>('/reminder/create', {
      clientId: id,
      date: new Date(Date.now()),
      title: '',
      info: ''
    })

    if (reminderResponse.data.error) {
      alert(reminderResponse.data.error)
      return
    }

    router.push(`/reminder/id/${reminderResponse.data.id}`)
  }

  async function clientDelete() {
    if (window.confirm('Quer mesmo deletar o cadastro do cliente? Esta ação é irreversível!')) {
      const client = await api.post<IClient>('/client/delete', { id })

      if (client.data.error) {
        alert(client.data.error)
        return
      }

      alert('Cadastro de cliente deletado com sucesso!')
      router.push('/client/list')
    }
  }

  return (
    <BasicPage
      title="Cadastro de cliente"
    >
      <>
        <LoadingScreen visible={loading} />

        {!loading &&
          <>
            <Navbar />

            <div className={styles.content}>
              <form
                className={styles.updateClientForm}
                onSubmit={handleSubmit(updateClient)}
              >
                <h5>{originalName}</h5>

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

                <div className={styles.smallInput}>
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
                </div>

                <div className={styles.smallInput}>
                  <div>
                    <label htmlFor="cnpj">CNPJ:</label>
                    <ReactInputMask
                      mask="99.999.999/9999-99"
                      id="cnpj"
                      type="text"
                      className={globals.input}
                      onChange={e => setCnpj(e.target.value)}
                      value={cnpj}
                      placeholder="12.345.678/9012-34"
                    />
                  </div>
                </div>

                <div className={styles.smallInput}>
                  <div>
                    <label htmlFor="birthday">Data (Opcional):</label>
                    <input
                      id="birthday"
                      type="date"
                      className={globals.input}
                      onChange={e => setBirthday(e.target.value)}
                      value={birthday}
                    />
                  </div>
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
                  <ButtonDanger
                    type="button"
                    title="Deletar cadastro"
                    onClick={clientDelete}
                  />
                </div>

              </form>
            </div>


            {/* SALES */}

            {
              sales.length > 0 &&
              <>
                <div className={globals.divider}></div>

                <div className={styles.content}>

                  <div className={styles.sales}>
                    <div className={styles.salesTitle}>
                      <h5>Vendas:</h5>
                    </div>

                    <div className={styles.saleTable}>
                      <SaleTable sales={sales} />
                    </div>

                  </div>
                </div>
              </>
            }

            <div className={globals.divider}></div>

            <div className={styles.reminders}>
              <h5>Lembretes:</h5>

              <ReminderTable updateList={getClient} reminders={reminders} />
            </div>

            <div className={styles.reminderCreateButton}>
              <Button1 type="button" title="Criar lembrete" onClick={createReminder} />
            </div>
          </>
        }
      </>
    </BasicPage>
  )
}

export default Client
