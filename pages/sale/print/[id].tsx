import type { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react'
import { IClient, IProduct, ISale } from '../../../components/ClientTable'
import { api } from '../../api'
import BasicPage from '../../../components/BasicPage'
import { IDebit } from '../../../components/DebitSaleList'
import BigodeImg from '../../../public/bigode-img.jpg'
import LoadingScreen from '../../../components/LoadingScreen'
import axios from 'axios'
import { useAuth } from '../../../hooks/useAuth'

interface ISaleResponseProps {
  sale: ISale
  debitsPage: number
  totalDebits: number
}

const SalePrint: NextPage = () => {
  const { logOut } = useAuth()
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<IProduct[]>([])
  const [totalValue, setTotalValue] = useState(0)

  const router = useRouter()
  const [id, setId] = useState('') //Sale ID
  const [date, setDate] = useState('')
  const [client, setClient] = useState<IClient | null>(null)
  const [car, setCar] = useState('')
  const [plate, setPlate] = useState('')
  const [paid, setPaid] = useState(false)
  const [debits, setDebits] = useState<IDebit[]>([])
  const [info, setInfo] = useState('')
  const [km, setKm] = useState('')

  useEffect(() => {
    let somaValue = 0

    products.map(product => {
      const amount = product.amount || 1
      somaValue += parseFloat((amount * product.value).toString())
    })

    setTotalValue(parseFloat(somaValue.toFixed(2)))

  }, [products])

  useEffect(() => {
    async function getSale() {

      const { id } = await router.query // necessary "await" here

      if (!id) {
        return
      }

      try {
        const { data: saleResponse } = await api.post<ISaleResponseProps>('/sale/getData', {
          id,
          debitsPage: 1,
          debitsPerPage: 1000
        })

        const data = saleResponse.sale

        const date = data.createdAt.toString().split('T')[0].split('-')
        setProducts(JSON.parse(data.products.toString()) as IProduct[])

        setId(id as string)
        setClient(data.client)
        setDate(`${date[2]}/${date[1]}/${date[0]}`)
        setCar(data.car)
        setPlate(data.plate)
        setPaid(data.paid)
        setInfo(data.info)
        setDebits(data.debits)
        setKm(data.km)

      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data.error
          alert(errorMessage);
          if (errorMessage === 'Access authorized only for authenticated users!') {
            logOut()
          }
        }
      } finally {
        setLoading(false)
      }
    }

    getSale()
  }, [router.query])

  return (
    <BasicPage
      title="Bigode Internal Sales System"
      content="Sistema interno restrito a funcionários"
    >
      <>
        <LoadingScreen visible={loading} />
        <div className={styles.ticket}>
          {id &&
            <>
              <header>
                <Image src={BigodeImg} className={styles.img} />

                <div className={styles.companyInfo}>
                  <h6>BIGODE AUTO CENTER</h6>
                  <p>Rod Luiz Rosso, 1044 - Bosque do Repouso - São Luiz - Criciúma SC</p>
                  <p>Fone: (48) 99612-8191</p>
                  <p>E-mail: bigodeautocentercriciuma@gmail.com</p>
                  <p>https://bigodeautocenter.vercel.app/</p>
                </div>
              </header>

              <h6>Cliente: {client?.name}</h6>
              <h6>CPF: {client?.cpf}</h6>
              <h6>CNPJ: {client?.cnpj}</h6>
              <h6>Carro: {car}</h6>
              <h6>Placa: {plate}</h6>
              <h6>Km: {km}</h6>
              <h6>Data: {date}</h6>
              <h6>Produtos e serviços:</h6>

              <table className={styles.productsTable}>
                <thead>
                  <tr>
                    <th>
                      #
                    </th>
                    <th>
                      Nome do produto
                    </th>
                    <th>
                      Quant.
                    </th>
                    <th>
                      Valor Unit. (R$)
                    </th>
                    <th>
                      Valor total. (R$)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    products.map((product, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            {index + 1}
                          </td>
                          <td>
                            {product.name}
                          </td>
                          <td>
                            {product.amount || 1}
                          </td>
                          <td>
                            {product.value.toFixed(2)}
                          </td>
                          <td>
                            {((product.amount || 1) * product.value).toFixed(2)}
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
              <div className={styles.totalValue}>
                <h6 className={styles.highlight}>Total a pagar (R$): {totalValue.toFixed(2)}</h6>
              </div>

              <h6>Info. adicional: </h6>
              <div className={styles.info}>
                {info}
              </div>
              <h6>Situação: {paid ? 'Pago' : 'Pendente de pagamento'}</h6>
              <h6>Débitos desta nota: </h6>
              <table className={styles.debitsTable}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Vencimento</th>
                    <th>Valor (R$)</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    debits.map((debit, index) => {
                      const dueDateSplit = debit.dueDate.toString().split('T')[0].split('-')
                      const dueDate = `${dueDateSplit[2]}/${dueDateSplit[1]}/${dueDateSplit[0]}`

                      return (
                        <tr key={debit.id}>
                          <td>{index + 1}</td>
                          <td>{dueDate}</td>
                          <td>{debit.value.toFixed(2)}</td>
                          <td>{debit.paid ? 'Pago' : 'Pendente'}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>

              <div className={styles.autographs}>
                <div>
                  <p>________________________________</p>
                  <p>BIGODE AUTO CENTER</p>
                </div>
                <div>
                  <p>________________________________</p>
                  <p>CLIENTE</p>
                </div>
              </div>
            </>
          }
        </div>
      </>
    </BasicPage>
  )
}

export default SalePrint
