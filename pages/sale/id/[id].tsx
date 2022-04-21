import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './styles.module.scss'
import globals from '../../../styles/globals.module.scss'
import { useEffect, useState } from 'react'
import { IClient, IProduct, ISale } from '../../../components/ClientTable'
import { api } from '../../api'
import { useForm } from 'react-hook-form'
import Button1 from '../../../components/Button1'
import { ICost } from '../create'
import Button2 from '../../../components/Button2'
import DebitSaleList from '../../../components/DebitSaleList'
import ButtonDanger from '../../../components/ButtonDanger'
import { IPaginationProps } from '../../../interfaces'
import { useAuth } from '../../../hooks/useAuth'
import Layout from '../../../components/Layout'
import axios from 'axios'

interface ISaleResponseProps {
  sale: ISale
  debitsPage: number
  totalDebits: number
}

const SaleUpdate: NextPage = () => {
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const [products, setProducts] = useState<IProduct[]>([])
  const [totalCost, setTotalCost] = useState(0)
  const [totalValue, setTotalValue] = useState(0)

  const { handleSubmit } = useForm()
  const router = useRouter()
  const [id, setId] = useState('') //Sale ID
  const [date, setDate] = useState('')
  const [client, setClient] = useState<IClient | null>(null)
  const [car, setCar] = useState('')
  const [plate, setPlate] = useState('')
  const [km, setKm] = useState('')
  const [paid, setPaid] = useState(false)
  const [info, setInfo] = useState('')
  const [cost, setCost] = useState<ICost>({} as ICost)
  const [debitsPagination, setDebitsPagination] = useState<IPaginationProps>({
    page: 1,
    perPage: 12,
    total: 0
  })

  useEffect(() => {
    let somaCost = 0
    let somaValue = 0

    products.map(product => {
      const amount = product.amount || 1
      somaCost += parseFloat((amount * product.cost).toString())
    })

    products.map(product => {
      const amount = product.amount || 1
      somaValue += parseFloat((amount * product.value).toString())
    })

    setTotalCost(parseFloat(somaCost.toFixed(2)))
    setTotalValue(parseFloat(somaValue.toFixed(2)))

  }, [products])

  async function getSale() {

    const { id } = await router.query // necessary "await" here

    if (!id) {
      return
    }

    try {
      setLoading(true)
      const saleResponse = await api.post<ISaleResponseProps>('/sale/getData', {
        id,
        debitsPage: debitsPagination.page,
        debitsPerPage: debitsPagination.perPage
      })

      const { data } = saleResponse

      const date = data.sale.createdAt.toString().split('T')[0].split('-')

      setProducts(JSON.parse(data.sale.products.toString()) as IProduct[])

      setId(id as string)
      setClient(data.sale.client)
      setDate(`${date[2]}/${date[1]}/${date[0]}`)
      setCar(data.sale.car)
      setPlate(data.sale.plate)
      setKm(data.sale.km)
      setPaid(data.sale.paid)
      setInfo(data.sale.info)
      setCost(data.sale.cost)
      setDebitsPagination({
        ...debitsPagination,
        total: data.totalDebits
      })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      try {
        getSale()

      } catch (error) {
        alert(error)
      } finally {
        setLoading(false)
      }
    }
  }, [user, router.query])

  async function updateSale() {
    try {
      setLoading(true)
      if (!totalCost || !totalValue) {
        alert('Valores de produtos inválidos, insira apenas números e não deixe nenhum em branco!')
        return
      }

      const saleResponse = await api.post<ISale>('/sale/update', {
        id,
        car,
        plate: plate.toUpperCase(),
        products,
        km,
        info,
        total: totalValue,
        paid
      })

      await api.post<ICost>(`/cost/${cost ? 'update' : 'create'}`, {
        id: cost && cost.id,
        value: totalCost,
        saleId: saleResponse.data.id
      })

      alert('Venda atualizada com sucesso!')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    } finally {
      setLoading(false)
    }
  }

  async function saleDelete() {
    if (window.confirm('Quer mesmo deletar? Todos os dados desta venda serão perdidos permanentemente, incluindo, débitos, custos e entradas de pagamento registradas no banco de dados!')) {
      try {
        setLoading(true)
        await api.post<ISale>('/sale/delete', { id })

        alert('Venda deletada com sucesso!')
        router.push(`/client/id/${client.id}`)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(error.response?.data.message);
        }
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <Layout
      title="Bigode Internal Sales System"
      content="Sistema interno restrito a funcionários"
      externalLoading={loading}
    >
      {id &&
        <>
          <div className={styles.content}>
            <form
              className={styles.saleForm}
              onSubmit={handleSubmit(updateSale)}
            >
              <h6>Venda ID: {id}</h6>
              <h6>Data: {date}</h6>
              <h6>Cliente: <Link href={`/client/id/${client?.id}`}>
                <a className={styles.clientName}>
                  {client?.name}
                </a>
              </Link></h6>

              <div>
                <label htmlFor="car">Carro:</label>
                <input
                  id="car"
                  type="text"
                  className={globals.input}
                  onChange={e => setCar(e.target.value)}
                  value={car}
                  placeholder="Carro do cliente"
                />
              </div>

              <div className={styles.smallInput}>
                <div>
                  <label htmlFor="plate">Placa:</label>
                  <input
                    id="plate"
                    type="text"
                    className={globals.input}
                    onChange={e => setPlate(e.target.value)}
                    value={plate}
                    placeholder="Placa do carro"
                  />
                </div>
              </div>

              <div className={styles.smallInput}>
                <div>
                  <label htmlFor="km">Km:</label>
                  <input
                    id="km"
                    type="text"
                    className={globals.input}
                    onChange={e => setKm(e.target.value)}
                    value={km}
                    placeholder="Km atual"
                  />
                </div>
              </div>

              <div className={styles.products}>
                <h6>Produtos:</h6>

                {/* PRODUCTS FORM */}
                <div>

                  {
                    products.map((product, index) => {
                      return (
                        <div
                          key={index}
                          className={styles.product}
                        >

                          <div>
                            <input
                              type="text"
                              className={`${globals.input} ${styles.productName}`}
                              placeholder="Nome do produto"
                              onChange={(e) => setProducts(() => {
                                let newProducts = [...products]
                                newProducts[index].name = e.target.value
                                return newProducts
                              })}
                              value={products[index].name}
                            />
                          </div>

                          <div>
                            <label>x</label>
                            <input
                              type="number"
                              step="1"
                              min={1}
                              className={`${globals.input} ${styles.microInput}`}
                              onChange={(e) => setProducts(() => {
                                let newProducts = [...products]
                                newProducts[index].amount = parseFloat(e.target.value)
                                return newProducts
                              })}
                              value={products[index].amount || 1}
                            />
                          </div>

                          <div>
                            <label>Custo (R$): </label>
                            <input
                              type="number"
                              step="0.01"
                              className={`${globals.input} ${styles.productCost}`}
                              onChange={(e) => setProducts(() => {
                                let newProducts = [...products]
                                newProducts[index].cost = parseFloat(e.target.value)
                                return newProducts
                              })}
                              value={products[index].cost}
                            />
                          </div>

                          <div>
                            <p>= {((products[index].amount || 1) * products[index].cost).toFixed(2)}</p>
                          </div>

                          <div>
                            <label>Valor (R$): </label>
                            <input
                              type="number"
                              step="0.01"
                              className={`${globals.input} ${styles.productValue}`}
                              onChange={(e) => setProducts(() => {
                                let newProducts = [...products]
                                newProducts[index].value = parseFloat(e.target.value)
                                return newProducts
                              })}
                              value={products[index].value}
                            />
                          </div>

                          <div>
                            <p>= {((products[index].amount || 1) * products[index].value).toFixed(2)}</p>
                          </div>

                          <div>
                            <Button2
                              type="button"
                              title="Remover"
                              onClick={() =>
                                setProducts(
                                  () => {
                                    let newProducts = [...products]
                                    newProducts.splice(index, 1)
                                    return newProducts
                                  }
                                )
                              }
                            />
                          </div>

                        </div>
                      )
                    })
                  }

                </div>

                <div className={styles.addProduct}>
                  <Button1
                    type="button"
                    title="Adicionar Produto"
                    onClick={() => setProducts(
                      () => {
                        let newProducts = [...products]
                        newProducts.push(
                          {
                            name: '',
                            cost: 0,
                            value: 0
                          }
                        )
                        return newProducts
                      }
                    )}
                  />
                </div>

                <div className={styles.totals}>
                  <p>Custo Total (R$): {totalCost.toFixed(2)}</p>
                  <p>Valor Total (R$): {totalValue.toFixed(2)}</p>
                  <p>Lucro líquido (R$): {(totalValue - totalCost).toFixed(2)}</p>
                </div>
              </div>

              <div className={styles.paid}>
                <label htmlFor="paid"><strong>Já está pago?</strong></label>
                <input
                  id="paid"
                  type="checkbox"
                  onChange={e => setPaid(e.target.checked)}
                  checked={paid}
                />
                <span className={paid ? styles.green : styles.red}>{paid ? 'Sim.' : 'Não.'}</span>
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
                <div>
                  <Button1 title="Salvar" />
                  <Link href={`/sale/print/${id}`}>
                    <a target="_blank">
                      <Button1 type="button" title="Imprimir" />
                    </a>
                  </Link>
                </div>
                <ButtonDanger
                  type="button"
                  title="Excluir venda"
                  onClick={saleDelete}
                />
              </div>
            </form>
          </div>

          <div className={globals.divider}></div>

          <div className={styles.content}>

            {/* DEBITS LIST */}

            <DebitSaleList
              saleId={id}
              debitsPagination={debitsPagination}
              setDebitsPagination={setDebitsPagination}
            />
          </div>
        </>
      }
    </Layout>
  )
}

export default SaleUpdate
