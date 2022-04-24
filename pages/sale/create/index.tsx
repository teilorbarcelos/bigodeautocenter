import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import styles from './styles.module.scss'
import globals from '../../../styles/globals.module.scss'
import { useEffect, useState } from 'react'
import { IClient, IProduct, ISale } from '../../../components/ClientTable'
import { api } from '../../api'
import { useForm } from 'react-hook-form'
import Button1 from '../../../components/Button1'
import { useAuth } from '../../../hooks/useAuth'
import Button2 from '../../../components/Button2'
import Layout from '../../../components/Layout'
import axios from 'axios'
import Link from 'next/link'
import SearchIcon from '../../../components/svg/SearchIcon'
import TransparentModal from '../../../components/TransparentModal'
import ProductsListSelector from './ProductsListSelector'

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
  km: string
  info: string,
  total: number
}

interface IClientResponseProps {
  client: IClient
}

const SaleCreate: NextPage = () => {
  const [productsModalOpen, setProductsModalOpen] = useState<number | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<IProduct[]>([])
  const [totalCost, setTotalCost] = useState(0)
  const [totalValue, setTotalValue] = useState(0)

  const { user } = useAuth()
  const [client, setClient] = useState('')
  const { register, handleSubmit } = useForm()
  const router = useRouter()

  const { clientId } = router.query

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

  useEffect(() => {
    async function getClient() {
      try {
        setLoading(true)
        const { data: response } = await api.post<IClientResponseProps>(`/client/getData`, {
          id: clientId,
          salesPage: 1,
          remindersPage: 1
        })
        setClient(response.client.name)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(error.response?.data.message);
        }
      } finally {
        setLoading(false)
      }
    }

    if (user && clientId) {
      getClient()
    }
  }, [user, clientId])

  async function createSale(data: ISaleDataFormProps) {

    if (clientId === '') {
      alert('Selecione o cliente!')
      return
    }

    if (!totalCost || !totalValue) {
      alert('Valores de produtos inválidos, insira apenas números e não deixe nenhum em branco!')
      return
    }

    const newDate = {
      clientId,
      car: data.car,
      plate: data.plate.toUpperCase(),
      km: data.km,
      products,
      info: data.info,
      total: totalValue,
      paid: false,
      totalCost
    }

    try {
      setLoading(true)

      const saleResponse = await api.post<ISale>('/sale/create', newDate)

      alert('Venda registrada com sucesso!')

      router.push(`/sale/id/${saleResponse.data.id}`)
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
      title="Bigode Internal Sales System"
      content="Sistema interno restrito a funcionários"
      externalLoading={loading}
    >
      <form
        className={styles.saleForm}
        onSubmit={handleSubmit(createSale)}
      >
        <h5>Nova venda</h5>

        <div>
          <h6>Cliente: <Link href={`/client/id/${clientId}`}>
            <a className={styles.clientName}>
              {client}
            </a>
          </Link></h6>
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

        <div className={styles.smallInput}>
          <div>
            <label htmlFor="km">Km:</label>
            <input
              {...register('km')}
              id="km"
              type="text"
              className={globals.input}
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
                        value={product.name}
                      />
                    </div>

                    <div
                      className={styles.search}
                      onClick={() => setProductsModalOpen(index)}
                      title='Procurar produto'
                    >
                      <SearchIcon
                        className={styles.svgIcon}
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
                        value={product.amount || 1}
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
                        value={product.cost}
                      />
                    </div>

                    <div>
                      <p>= {((product.amount || 1) * product.cost).toFixed(2)}</p>
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
                        value={product.value}
                      />
                    </div>

                    <div>
                      <p>= {((product.amount || 1) * product.value).toFixed(2)}</p>
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

      {productsModalOpen !== undefined &&
        <TransparentModal onClose={() => setProductsModalOpen(undefined)}>
          <ProductsListSelector
            index={productsModalOpen}
            setProduct={setProducts}
            onClose={() => setProductsModalOpen(undefined)}
          />
        </TransparentModal>
      }
    </Layout>
  )
}

export default SaleCreate
