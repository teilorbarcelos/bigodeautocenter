import styles from './styles.module.scss'
import globals from '../../styles/globals.module.scss'
import { IDebit } from '../DebitSaleList'
import DropDown from '../DropDown'
import Button1 from '../Button1'
import { useRouter } from 'next/router'
import { api } from '../../pages/api'

interface Props {
  debits: IDebit[]
  deleteOption?: boolean
  paidSwitchButton?: boolean
  updateList?: () => void
}

export default function DebitTable({
  debits,
  deleteOption = true,
  paidSwitchButton = true,
  updateList
}: Props) {
  const router = useRouter()

  async function paidSwitch(id: string, status: boolean) {
    const response = await api.post<IDebit>('/debit/paidSwitch', { id, status })

    if (response.data.error) {
      alert(response.data.error)
      return
    }

    updateList()
  }

  async function debitEdit(id: string) {
    router.push(`/debit/id/${id}`)
  }

  async function debitDelete(id: string) {
    const response = await api.post('/debit/delete', { id })

    if (response.data.error) {
      alert(response.data.error)
      return
    }

    updateList()
  }

  return (

    <div className={styles.debitsList}>
      {
        debits.length > 0 ?
          debits.map((debit, index) => {
            const dueDateSplit = debit.dueDate.toString().replace('T00:00:00.000Z', '').split('-')
            const dueDate = `${dueDateSplit[2]}/${dueDateSplit[1]}/${dueDateSplit[0]}`
            const today = new Date(new Date(Date.now()).toISOString().split('T')[0])

            return (
              <div
                key={debit.id}
                className={(new Date(debit.dueDate) >= today) ?
                  debit.paid ? styles.paid : ''
                  :
                  !debit.paid ? styles.expired
                    :
                    debit.paid ? styles.paid : ''
                }
              >
                <p>{index + 1}</p>
                <p>
                  Vencimento: {dueDate}
                </p>
                <p>
                  Valor: R$ {debit.value.toFixed(2)}
                </p>
                <p>
                  Status: {debit.paid ? 'Pago' : 'Pendente'}
                </p>

                <DropDown
                  title="Opções"
                  options={[
                    {
                      title: "Detalhes",
                      action: () => debitEdit(debit.id)
                    },
                    {
                      title: "Deletar",
                      action: () => debitDelete(debit.id),
                      disabled: debit.paid ? true : !deleteOption ? true : false
                    }
                  ]}
                />

                {
                  paidSwitchButton &&
                  <Button1
                    type="button"
                    title={debit.paid ? 'Pendente' : 'Pago'}
                    onClick={() => paidSwitch(debit.id, debit.paid ? false : true)}
                  />
                }
              </div>
            )
          })

          :

          <h6>Nenhum débito pendente!</h6>
      }
    </div>
  )
}