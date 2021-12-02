import styles from './styles.module.scss'
import globals from '../../styles/globals.module.scss'
import Button1 from '../Button1'
import { useRouter } from 'next/router'
import { IIncome } from '../../pages/debit/id/[id]'

interface Props {
  incomes: IIncome[]
}

export default function IncomeTable({
  incomes
}: Props) {
  const router = useRouter()

  async function incomeEdit(id: string) {
    router.push(`/income/id/${id}`)
  }

  return (

    <div className={styles.incomesList}>
      {
        incomes.length > 0 ?
          incomes.map((income, index) => {
            const dateSplit = income.createdAt.toString().split('T')[0].split('-')
            const date = `${dateSplit[2]}/${dateSplit[1]}/${dateSplit[0]}`
            const today = new Date(new Date(Date.now()).toISOString().split('T')[0])

            return (
              <div
                key={income.id}
              >
                <p>{index + 1}</p>
                <p>
                  Data: {date}
                </p>
                <p>
                  Valor: R$ {income.value.toFixed(2)}
                </p>

                <Button1
                  type="button"
                  onClick={() => incomeEdit(income.id)}
                  title="Detalhes"
                />
              </div>
            )
          })

          :

          <h6>Nenhum pagamento registrado neste período!</h6>
      }
    </div>
  )
}