import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import styles from './styles.module.scss'
import globals from '../../../styles/globals.module.scss'
import { useEffect, useState } from 'react'
import { IClient, IProduct, ISale } from '../../../components/ClientTable'
import { api } from '../../api'
import BasicPage from '../../../components/BasicPage'
import Navbar from '../../../components/Navbar'
import { useForm } from 'react-hook-form'
import Button1 from '../../../components/Button1'
import { useAuth } from '../../../hooks/useAuth'
import Button2 from '../../../components/Button2'

export interface ICost {
  id?: string
  value?: number
  saleId?: string
  error?: string
}

export interface ISaleDataFormProps {
  clientId: string
  car: string,
  plate: string,
  info: string,
  total: number
}

const SaleCreate: NextPage = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [totalCost, setTotalCost] = useState(0)
  const [totalValue, setTotalValue] = useState(0)

  const { loading } = useAuth()
  const [clients, setClients] = useState<IClient[]>([])
  const { register, handleSubmit } = useForm()
  const router = useRouter()

  useEffect(() => {
    let somaCost = 0
    let somaValue = 0

    products.map(product => {
      somaCost += parseFloat(product.cost.toString())
    })

    products.map(product => {
      somaValue += parseFloat(product.value.toString())
    })

    setTotalCost(somaCost)
    setTotalValue(somaValue)

  }, [products])

  useEffect(() => {
    async function getClients() {
      const response = await api.post<IClient[]>('/client/list')
      setClients(response.data)
    }
    if (!loading) {
      getClients()
    }
  }, [loading])

  async function createSale(data: ISaleDataFormProps) {

    if (data.clientId === '') {
      alert('Selecione o cliente!')
      return
    }

    if (!totalCost || !totalValue) {
      alert('Valores de produtos inválidos, insira apenas números e não deixe nenhum em branco!')
      return
    }

    const saleResponse = await api.post<ISale>('/sale/create', {
      clientId: data.clientId,
      car: data.car,
      plate: data.plate.toUpperCase(),
      products,
      info: data.info,
      total: totalValue,
      paid: false
    })

    if (saleResponse.data.error) {
      alert(saleResponse.data.error)
      return
    }

    const costResponse = await api.post<ICost>('/cost/create', {
      value: totalCost,
      saleId: saleResponse.data.id
    })

    if (costResponse.data.error) {
      alert(costResponse.data.error)
      return
    }

    alert('Venda registrada com sucesso!')

    router.push(`/sale/id/${saleResponse.data.id}`)
  }

  return (
    <BasicPage
      title="Bigode Internal Sales System"
      content="Sistema interno restrito a funcionários"
    >
      <>
        <Navbar />

        <form
          className={styles.saleForm}
          onSubmit={handleSubmit(createSale)}
        >
          <div>
            <label htmlFor="clientId">Selecione o cliente:</label>
            <select
              {...register('clientId')}
              className={globals.input}
              name="clientId"
              id="clientId"
            >
              <option value="">Selecione o Cliente</option>
              {
                clients.map(client => {
                  return (
                    <option key={client.id} value={client.id}>{client.name}</option>
                  )
                })
              }
            </select>
          </div>
          <div>
            <label htmlFor="car">Carro:</label>
            <input
              {...register('car')}
              id="car"
              type="text"
              className={globals.input}
              placeholder="Carro do cliente"
            />
          </div>

          <div className={styles.smallInput}>
            <div>
              <label htmlFor="plate">Placa:</label>
              <input
                {...register('plate')}
                id="plate"
                type="text"
                className={globals.input}
                placeholder="Placa do carro"
              />
            </div>
          </div>

          <div className={styles.products}>
            <h6>Produtos:</h6>

            {/* PRODUCTS FORM */}
            <div>

              {
                products.map((product, index) => {
                  console.log(index)
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
                        <label>Custo: </label>
                        <input
                          type="number"
                          min="0"
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
                        <label>Valor: </label>
                        <input
                          type="number"
                          min="0"
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
              <p>Custo Total: {totalCost}</p>
              <p>Valor Total: {totalValue}</p>
            </div>
          </div>

          <div>
            <label htmlFor="info">Info. adicional:</label>
            <textarea
              {...register('info')}
              id="info"
              className={globals.textarea}
              placeholder="Informações adicionais."
            />
          </div>
          <div className={styles.buttons}>
            <Button1 title="Salvar" />
          </div>
        </form>
      </>
    </BasicPage>
  )
}

export default SaleCreate
