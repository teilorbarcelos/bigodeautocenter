import styles from './styles.module.scss'
import globals from '../../styles/globals.module.scss'
import { useForm } from 'react-hook-form'
import Button1 from '../Button1'
import { api } from '../../pages/api'
import { useState } from 'react'

interface IDebitFormData {
  dueDate: Date
  value: number
  info: string
}

interface IDebitListProps {
  saleId: string
}

export interface IDebitResponse {
  dueDate: Date
  id: string
  info: string
  paid: boolean
  saleId: string
  userId: string
  value: number
}

export default function DebitSaleList({ saleId }: IDebitListProps) {
  const { register, handleSubmit } = useForm()
  const [dueDate, setDueDate] = useState('')
  const [debitValue, setDebitValue] = useState(0)
  const [debitInfo, setDebitInfo] = useState('')

  async function createPendingDebit(data: IDebitFormData) {

    if (!data.dueDate) {
      alert('Informe a data do vencimento!')
      return
    }

    if (!data.value) {
      alert('Informe o valor!')
      return
    }

    const newDebitResponse = await api.post<IDebitResponse>('/debit/create', {
      saleId,
      dueDate: data.dueDate,
      value: parseFloat(data.value.toString()),
      info: data.info,
      paid: false
    })


  }

  return (
    <section className={styles.debitsalelist} id="debitsalelist">
      <form
        className={styles.form}
        onSubmit={handleSubmit(createPendingDebit)}
      >
        <div>
          <label htmlFor="dueDate">Data do vencimento:</label>
          <input
            {...register('dueDate')}
            type="date"
            className={globals.input}
            onChange={e => setDueDate(e.target.value)}
            value={dueDate}
          />
        </div>

        <div>
          <label htmlFor="value">Valor:</label>
          <input
            {...register('value')}
            type="number"
            step="0.01"
            min={0}
            className={globals.input}
            onChange={e => setDebitValue(parseFloat(e.target.value))}
            value={debitValue}
          />
        </div>

        <div>
          <label htmlFor="info">Info. adicional:</label>
          <textarea
            {...register('info')}
            id="info"
            className={globals.textarea}
            placeholder="Informações adicionais."
            onChange={e => setDebitInfo(e.target.value)}
            value={debitInfo}
          />
        </div>

        <div>
          <Button1 title="Criar Parcela" />
        </div>
      </form>
    </section>
  )
}