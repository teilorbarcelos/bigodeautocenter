import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import styles from './styles.module.scss'
import globals from '../../../styles/globals.module.scss'
import LoadingScreen from '../../../components/LoadingScreen'
import { api } from '../../api'
import BasicPage from '../../../components/BasicPage'
import Navbar from '../../../components/Navbar'
import { useForm } from 'react-hook-form'
import Button1 from '../../../components/Button1'
import { IDebit } from '../../../components/DebitSaleList'
import { useRouter } from 'next/router'
import { IIncome } from '../../debit/id/[id]'

const IncomeUpdate: NextPage = () => {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { handleSubmit } = useForm()
  const [saleId, setSaleId] = useState('')
  const [incomeId, setIncomeId] = useState('')
  const [paid, setPaid] = useState(false)
  const [debit, setDebit] = useState<IDebit>({} as IDebit)
  const [incomeValue, setIncomeValue] = useState(0)
  const [incomeInfo, setIncomeInfo] = useState('')
  const [incomeDate, setIncomeDate] = useState(
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
      async function getIncome() {

        const { id } = await router.query // necessary "await" here

        if (!id) {
          return
        }

        const incomeResponse = await api.post<IIncome>('/income/getData', {
          id
        })

        const income = incomeResponse.data

        setSaleId(income.saleId)
        setIncomeId(id as string)
        setIncomeValue(income.value)
        setIncomeInfo(income.info)
        setDebit(income.debit)
        setIncomeDate(
          new Date(
            income.createdAt
          ).toISOString().split('T')[0].toString()
        )
      }

      getIncome()

    } catch (error) {
      alert(error)
    } finally {
      setLoading(false)
    }
  }, [router.query])

  async function updateIncome() {
    const response = await api.post<IIncome>('/income/update', {
      id: incomeId,
      value: incomeValue,
      createdAt: new Date(incomeDate),
      info: incomeInfo
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
              onSubmit={handleSubmit(updateIncome)}
            >
              <h6>Pagamento ID: {incomeId}</h6>
              <div className={styles.dateValue}>
                <div className={styles.smallInput}>
                  <label htmlFor="dueDate">Data do pagamento:</label>
                  <input
                    type="date"
                    className={globals.input}
                    onChange={e => setIncomeDate(e.target.value)}
                    value={incomeDate}
                  />
                </div>

                <div className={styles.smallInput}>
                  <label htmlFor="value">Valor pago (R$):</label>
                  <input
                    type="number"
                    step="0.01"
                    min={0}
                    className={globals.input}
                    onChange={e => setIncomeValue(parseFloat(e.target.value))}
                    value={incomeValue}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="info">Info. adicional:</label>
                <textarea
                  id="info"
                  className={globals.textarea}
                  placeholder="Informações adicionais."
                  onChange={e => setIncomeInfo(e.target.value)}
                  value={incomeInfo}
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

              <div className={styles.saleLink}>
                <Link href={`/debit/id/${debit.id}`}>
                  <a className={globals.link}>
                    Voltar para a tela do débito.
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

export default IncomeUpdate
