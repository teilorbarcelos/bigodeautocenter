import styles from './styles.module.scss'
import globals from '../../styles/globals.module.scss'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import Button1 from '../Button1'
import { api } from '../../pages/api'
import { useEffect, useState } from 'react'

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
  error?: string
}

export default function DebitSaleList({ saleId }: IDebitListProps) {
  const { register, handleSubmit } = useForm()
  const [debitValue, setDebitValue] = useState(0)
  const [debitInfo, setDebitInfo] = useState('')
  const [debitsList, setDebitsList] = useState<IDebitResponse[]>([])
  const [dueDate, setDueDate] = useState(
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

  async function paidSwitch(id: string, status: boolean) {
    // alert(`Recurso em desenvolvimento!`)
    // return
    const response = await api.post<IDebitResponse>('/debit/paidSwitch', { id, status })

    if (response.data.error) {
      alert(response.data.error)
      return
    }

    // alert(`Débito marcado como ${status ? '"Pago"' : '"Pendente"'} com sucesso!`)
    populateDebitsList()
  }

  async function populateDebitsList() {
    const debits = await api.post<IDebitResponse[]>('/debit/list', {
      saleId
    })
    setDebitsList(debits.data)
  }

  useEffect(() => {
    populateDebitsList()
  }, [saleId])

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

    alert('Parcela cadastrada com sucesso!')

    populateDebitsList()

  }

  return (
    <section className={styles.debitsalelist} id="debitsalelist">
      <h5>Debitos desta venda</h5>

      <div className={styles.debitsList}>
        {
          debitsList.map((debit, index) => {
            const dueDateSplit = debit.dueDate.toString().replace('T00:00:00.000Z', '').split('-')
            const dueDate = `${dueDateSplit[2]}/${dueDateSplit[1]}/${dueDateSplit[0]}`
            return (
              <div
                key={debit.id}
                className={new Date(debit.dueDate) < new Date(Date.now()) &&
                  !debit.paid ? styles.expired
                  :
                  debit.paid && styles.paid
                }
              >
                <p>{index + 1}</p>
                <p>
                  Vencimento: {dueDate}
                </p>
                <p>
                  Valor: R$ {debit.value}
                </p>
                <p>
                  Status: {debit.paid ? 'Pago' : 'Pendente'}
                </p>
                <Link href={`/debit/id/${debit.id}`}>
                  <a>
                    <Button1
                      type="button"
                      title="Alterar"
                      onClick={() => alert('pago/pendente')}
                    />
                  </a>
                </Link>
                <Button1
                  type="button"
                  title={debit.paid ? 'Pendente' : 'Pago'}
                  onClick={() => {
                    paidSwitch(debit.id, debit.paid ? false : true)
                  }}
                />
              </div>
            )
          })
        }
      </div>

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