import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import styles from './styles.module.scss'
import globals from '../../../styles/globals.module.scss'
import { api } from '../../api'
import { useForm } from 'react-hook-form'
import Button1 from '../../../components/Button1'
import { IDebit } from '../../../components/DebitSaleList'
import { useRouter } from 'next/router'
import Layout from '../../../components/Layout'
import axios from 'axios'

export interface IIncome {
  id?: string
  debit?: IDebit
  saleId?: string
  createdAt?: Date
  value?: number
  info?: string
  error?: string
}

const DebitUpdate: NextPage = () => {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { handleSubmit } = useForm()
  const [saleId, setSaleId] = useState('')
  const [debitId, setDebitId] = useState('')
  const [paid, setPaid] = useState(false)
  const [income, setIncome] = useState<IIncome>({})
  const [debitValue, setDebitValue] = useState(0)
  const [debitInfo, setDebitInfo] = useState('')
  const [debitDueDate, setDebitDueDate] = useState(
    new Date(
      new Date(
        Date.now()
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
        setPaid(debit.paid)
        setIncome(debit.income)
        setDebitDueDate(
          new Date(
            debit.dueDate
          ).toISOString().split('T')[0].toString()
        )
      }

      getDebit()

    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    } finally {
      setLoading(false)
    }
  }, [router.query])

  async function updateDebit() {
    try {
      setLoading(true)

      await api.post<IDebit>('/debit/update', {
        id: debitId,
        value: debitValue,
        dueDate: new Date(debitDueDate),
        info: debitInfo
      })

      alert('Cadastro atualizado com sucesso!')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout
      title="Atualização de débito"
      externalLoading={loading}
    >
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
            <a className={globals.link}>
              Ir para o registro da venda.
            </a>
          </Link>
        </div>

        {
          paid &&

          <div className={styles.saleLink}>
            <Link href={`/income/id/${income.id}`}>
              <a className={globals.link}>
                Detalhes do pagamento.
              </a>
            </Link>
          </div>
        }

      </form>
    </Layout>
  )
}

export default DebitUpdate
