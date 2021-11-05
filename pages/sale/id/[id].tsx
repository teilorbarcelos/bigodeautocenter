import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './styles.module.scss'
import globals from '../../../styles/globals.module.scss'
import LoadingScreen from '../../../components/LoadingScreen'
import { useEffect, useState } from 'react'
import { IClient, IProduct, ISale } from '../../../components/ClientTable'
import { api } from '../../api'
import BasicPage from '../../../components/BasicPage'
import Navbar from '../../../components/Navbar'
import ReactInputMask from 'react-input-mask'
import { useFieldArray, useForm } from 'react-hook-form'
import Button1 from '../../../components/Button1'
import Button2 from '../../../components/Button2'

const Sale: NextPage = () => {
  const { register, control, handleSubmit } = useForm()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'product'
  })
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [id, setId] = useState<string | string[]>('')
  const [date, setDate] = useState('')
  const [client, setClient] = useState<IClient | null>(null)
  const [car, setCar] = useState('')
  const [plate, setPlate] = useState('')
  const [info, setInfo] = useState('')
  const [paid, setPaid] = useState(false)
  const [products, setProducts] = useState<IProduct[]>([])
  const [total, setTotal] = useState(0.0)

  useEffect(() => {
    try {
      async function getSale() {

        const { id } = await router.query // necessary "await" here

        const saleResponse = await api.post<ISale>('/sale/getData', {
          id
        })

        const data = saleResponse.data

        const date = data.createdAt.toString().split('T')[0].split('-')
        const products = JSON.parse(data.products.toString()) as IProduct[]

        setId(id)
        setClient(data.client)
        setDate(`${date[2]}/${date[1]}/${date[0]}`)
        setCar(data.car)
        setPlate(data.plate)
        setProducts(products)

      }

      getSale()

    } catch (error) {
      alert(error)
    } finally {
      setLoading(false)
    }
  }, [router.query])

  async function updateSale(data) {
    console.log(data)
    // const response = await api.post<IClient>('/sale/update', {
    //   id,
    // })

    // if (response.data.error) {
    //   alert(response.data.error)
    //   return
    // }

    // alert('Registro atualizado com sucesso!')
  }

  return (
    <BasicPage
      title="Bigode Internal Sales System"
      content="Sistema interno restrito a funcionários"
    >
      <>
        <LoadingScreen visible={loading} />
        <Navbar />

        {id &&
          <>
            <form
              className={styles.updateSaleForm}
              onSubmit={handleSubmit(updateSale)}
            >
              <h5>Cliente: <Link href={`/client/id/${client?.id}`}><a>{client?.name}</a></Link></h5>
              <h6>Data: {date}</h6>

              <div>
                <label htmlFor="car">Carro:</label>
                <input
                  {...register('car')}
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
                    {...register('plate')}
                    id="plate"
                    type="text"
                    className={globals.input}
                    onChange={e => setPlate(e.target.value)}
                    value={plate}
                    placeholder="Placa do carro"
                  />
                </div>
              </div>

              <div className={styles.products}>
                <h6>Produtos:</h6>
                <div>

                  {/* {products.length > 0 && products.map((product, index) => {
                    return (
                      <div
                        key={index}
                        className={styles.product}
                      >
                        <div>
                          <input
                            {...register(`product-name-${index}`)}
                            id="name"
                            type="text"
                            className={`${globals.input} ${styles.productName}`}
                            defaultValue={product.name}
                            placeholder="Nome do produto"
                          />
                        </div>
                        <div>
                          <label>Custo: </label>
                          <input
                            {...register(`product-cost-${index}`)}
                            type="number"
                            defaultValue={product.cost}
                            className={`${globals.input} ${styles.productCost}`}
                          />
                        </div>
                        <div>
                          <label>Valor: </label>
                          <input
                            {...register(`product-value-${index}`)}
                            type="number"
                            defaultValue={product.value}
                            className={`${globals.input} ${styles.productValue}`}
                          />
                        </div>
                        <div>
                          <Button2 type="button" title="Remover" onClick={() => remove(index)} />
                        </div>
                      </div>
                    )
                  })} */}

                  {
                    fields.map(({ id }, index) => {
                      return (
                        <div
                          key={id}
                          className={styles.product}
                        >
                          <div>
                            <input
                              {...register(`product-name-${index}`)}
                              id="name"
                              type="text"
                              className={`${globals.input} ${styles.productName}`}
                              placeholder="Nome do produto"
                            />
                          </div>
                          <div>
                            <label>Custo: </label>
                            <input
                              {...register(`product-cost-${index}`)}
                              type="number"
                              className={`${globals.input} ${styles.productCost}`}
                            />
                          </div>
                          <div>
                            <label>Valor: </label>
                            <input
                              {...register(`product-value-${index}`)}
                              type="number"
                              className={`${globals.input} ${styles.productValue}`}
                            />
                          </div>
                          <div>
                            <Button2 type="button" title="Remover" onClick={() => remove(index)} />
                          </div>
                        </div>
                      )
                    })
                  }
                  <div>
                    <Button1 type="button" title="Adicionar" onClick={() => append({})} />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="info">Info. adicional:</label>
                <textarea
                  {...register('info')}
                  id="info"
                  className={globals.textarea}
                  onChange={e => setInfo(e.target.value)}
                  value={info}
                  placeholder="Informações adicionais."
                />
              </div>
              <div className={styles.buttons}>
                <Button1 title="Salvar" />
              </div>
            </form>

            {/* SALES */}

            <div className={styles.sales}>
              <p>debidos pendentes aqui</p>

            </div>
          </>
        }
      </>
    </BasicPage>
  )
}

export default Sale
