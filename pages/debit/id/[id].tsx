import type { NextPage } from 'next'
import Link from 'next/link'
import styles from './styles.module.scss'
import globals from '../../../styles/globals.module.scss'
import LoadingScreen from '../../../components/LoadingScreen'
import { useEffect, useState } from 'react'
import { api } from '../../api'
import BasicPage from '../../../components/BasicPage'
import Navbar from '../../../components/Navbar'
import { useForm } from 'react-hook-form'
import Button1 from '../../../components/Button1'
import { IDebit } from '../../../components/DebitSaleList'
import { useRouter } from 'next/router'

const DebitUpdate: NextPage = () => {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { handleSubmit } = useForm()
  const [saleId, setSaleId] = useState('')
  const [debitId, setDebitId] = useState('')
  const [debitValue, setDebitValue] = useState(0)
  const [debitInfo, setDebitInfo] = useState('')
  const [debitDueDate, setDebitDueDate] = useState(
    new Date(
      new Date(
        Date.now()
      ).setMonth(
        new Date(
          Date.now()
        ).getMonth() + 1
      )
    ).toISOString()
      .split('T')[0]
      .toString()
  )

  useEffect(() => {
    try {
      async function getDebit() {

        const { id } = await router.query // necessary "await" here

        if (!id) {
          return
        }

        const debitResponse = await api.post<IDebit>('/debit/getData', {
          id
        })

        const debit = debitResponse.data

        setSaleId(debit.saleId)
        setDebitId(id as string)
        setDebitValue(debit.value)
        setDebitInfo(debit.info)
        setDebitDueDate(
          new Date(
            debit.dueDate
          ).toISOString().split('T')[0].toString()
        )
      }

      getDebit()

    } catch (error) {
      alert(error)
    } finally {
      setLoading(false)
    }
  }, [router.query])

  async function updateDebit() {
    const response = await api.post<IDebit>('/debit/update', {
      id: debitId,
      value: debitValue,
      dueDate: new Date(debitDueDate),
      info: debitInfo
    })

    if (response.data.error) {
      alert(response.data.error)
      return
    }

    alert('Cadastro atualizado com sucesso!')
  }

  return (
    <BasicPage
      title="Atualização de débito"
    >
      <>
        <LoadingScreen visible={loading} />

        {!loading &&
          <>
            <Navbar />

            <form
              className={styles.form}
              onSubmit={handleSubmit(updateDebit)}
            >
              <h6>Débito ID: {debitId}</h6>
              <div className={styles.dateValue}>
                <div className={styles.smallInput}>
                  <label htmlFor="dueDate">Data do vencimento:</label>
                  <input
                    type="date"
                    className={globals.input}
                    onChange={e => setDebitDueDate(e.target.value)}
                    value={debitDueDate}
                  />
                </div>

                <div className={styles.smallInput}>
                  <label htmlFor="value">Valor (R$):</label>
                  <input
                    type="number"
                    step="0.01"
                    min={0}
                    className={globals.input}
                    onChange={e => setDebitValue(parseFloat(e.target.value))}
                    value={debitValue}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="info">Info. adicional:</label>
                <textarea
                  id="info"
                  className={globals.textarea}
                  placeholder="Informações adicionais."
                  onChange={e => setDebitInfo(e.target.value)}
                  value={debitInfo}
                />
              </div>

              <div>
                <Button1 title="Atualizar registro" />
              </div>

              <div className={styles.saleLink}>
                <Link href={`/sale/id/${saleId}`}>
                  <a>
                    Voltar para o registro de venda.
                  </a>
                </Link>
              </div>
            </form>

          </>
        }
      </>
    </BasicPage>
  )
}

export default DebitUpdate
