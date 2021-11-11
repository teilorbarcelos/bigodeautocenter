import type { NextPage } from 'next'
import Link from 'next/link'
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

const Client: NextPage = () => {
  const { handleSubmit } = useForm()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [id, setId] = useState('')
  const [originalName, setOriginalName] = useState('')
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [cpf, setCpf] = useState('')
  const [birthday, setBirthday] = useState('')
  const [info, setInfo] = useState('')
  const [sales, setSales] = useState<ISale[]>([])

  useEffect(() => {
    try {
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
        setBirthday(clientResponse.data.birthday.toString().replace('T00:00:00.000Z', ''))
        setInfo(clientResponse.data.info)
        setSales(clientResponse.data.sales)

      }

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
      info,
      name
    })

    if (response.data.error) {
      alert(response.data.error)
      return
    }

    alert('Cadastro atualizado com sucesso!')
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
                  <label htmlFor="birthday">Data de nascimento:</label>
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
              </div>
            </form>

            {/* SALES */}

            {
              sales.length > 0 &&

              <div className={styles.sales}>
                <div className={styles.salesTitle}>
                  <h5>Vendas:</h5>
                </div>

                <div className={styles.saleTable}>
                  <SaleTable sales={sales} />
                </div>

              </div>
            }

          </>
        }
      </>
    </BasicPage>
  )
}

export default Client
