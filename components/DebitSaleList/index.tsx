import styles from './styles.module.scss'
import globals from '../../styles/globals.module.scss'
import { useForm } from 'react-hook-form'
import Button1 from '../Button1'
import { api } from '../../pages/api'
import { useEffect, useState } from 'react'
import DebitTable from '../DebitTable'

interface IDebitFormData {
  dueDate: Date
  value: number
  info: string
}

interface IDebitListProps {
  saleId: string
}

export interface IDebit {
  dueDate: Date
  id: string
  info: string
  paid: boolean
  saleId: string
  userId: string
  value: number
  error?: string
}

export default function DebitSaleList({ saleId }: IDebitListProps) {
  const { register, handleSubmit } = useForm()
  const [debitValue, setDebitValue] = useState(0)
  const [debitInfo, setDebitInfo] = useState('')
  const [debitsList, setDebitsList] = useState<IDebit[]>([])
  const [dueDate, setDueDate] = useState(
    new Date(
      new Date(
        Date.now()
      )
    ).toISOString()
      .split('T')[0]
      .toString()
  )

  async function populateDebitsList() {
    const debits = await api.post<IDebit[]>('/debit/list', {
      saleId
    })

    setDebitsList(debits.data)

    if (debits.data.length > 0) {

      setDueDate(
        new Date(
          new Date(
            debits.data[debits.data.length - 1].dueDate
          )
            .setMonth(
              new Date(
                debits.data[debits.data.length - 1].dueDate
              ).getMonth() + 1
            )
        ).toISOString()
          .split('T')[0]
          .toString()
      )
      return
    }

    setDueDate(
      new Date(
        new Date(
          Date.now()
        )
      ).toISOString()
        .split('T')[0]
        .toString()
    )

  }

  useEffect(() => {
    populateDebitsList()
  }, [saleId])

  async function createPendingDebit(data: IDebitFormData) {

    if (!dueDate) {
      alert('Informe a data do vencimento!')
      return
    }

    if (!data.value) {
      alert('Informe o valor!')
      return
    }

    const newDebitResponse = await api.post<IDebit>('/debit/create', {
      saleId,
      dueDate,
      value: parseFloat(data.value.toString()),
      info: data.info,
      paid: false
    })

    if (newDebitResponse.data.error) {
      alert(newDebitResponse.data.error)
      return
    }

    setDueDate(
      new Date(
        new Date(
          dueDate
        ).setMonth(
          new Date(
            dueDate
          ).getMonth() + 1
        )
      ).toISOString().split('T')[0].toString()
    )
    setDebitInfo('')

    populateDebitsList()
  }

  return (
    <section className={styles.debitsalelist} id="debitsalelist">
      <h5>Débitos desta venda</h5>
      {
        debitsList.length > 0 ?

          <div className={styles.debitsList}>

            <DebitTable debits={debitsList} updateList={populateDebitsList} />

          </div>

          :

          <h6>Nenhum débito cadastrado ainda.</h6>
      }


      <form
        className={styles.form}
        onSubmit={handleSubmit(createPendingDebit)}
      >
        <div className={styles.dateValue}>
          <div className={styles.smallInput}>
            <label htmlFor="dueDate">Data do vencimento:</label>
            <input
              {...register('dueDate')}
              type="date"
              className={globals.input}
              onChange={e => setDueDate(e.target.value)}
              value={dueDate}
            />
          </div>

          <div className={styles.smallInput}>
            <label htmlFor="value">Valor (R$):</label>
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