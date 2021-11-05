import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import styles from './styles.module.scss'
import globals from '../../../styles/globals.module.scss'
import LoadingScreen from '../../../components/LoadingScreen'
import { useEffect, useState } from 'react'
import { IClient, IProduct, ISale } from '../../../components/ClientTable'
import { api } from '../../api'
import BasicPage from '../../../components/BasicPage'
import Navbar from '../../../components/Navbar'
import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import Button1 from '../../../components/Button1'
import Button2 from '../../../components/Button2'
import { useAuth } from '../../../hooks/useAuth'

const SaleCreate: NextPage = () => {
  const [cost0, setCost0] = useState(0)
  const [cost1, setCost1] = useState(0)
  const [cost2, setCost2] = useState(0)
  const [cost3, setCost3] = useState(0)
  const [cost4, setCost4] = useState(0)
  const [cost5, setCost5] = useState(0)
  const [cost6, setCost6] = useState(0)
  const [cost7, setCost7] = useState(0)
  const [cost8, setCost8] = useState(0)
  const [cost9, setCost9] = useState(0)
  const [totalCost, setTotalCost] = useState(
    cost0 +
    cost1 +
    cost2 +
    cost3 +
    cost4 +
    cost5 +
    cost6 +
    cost7 +
    cost8 +
    cost9
  )
  const [value0, setValue0] = useState(0)
  const [value1, setValue1] = useState(0)
  const [value2, setValue2] = useState(0)
  const [value3, setValue3] = useState(0)
  const [value4, setValue4] = useState(0)
  const [value5, setValue5] = useState(0)
  const [value6, setValue6] = useState(0)
  const [value7, setValue7] = useState(0)
  const [value8, setValue8] = useState(0)
  const [value9, setValue9] = useState(0)
  const [totalValue, setTotalValue] = useState(0)

  const { loading } = useAuth()
  const [clients, setClients] = useState<IClient[]>([])
  const { register, handleSubmit } = useForm()

  useEffect(() => {
    setTotalCost(
      cost0 +
      cost1 +
      cost2 +
      cost3 +
      cost4 +
      cost5 +
      cost6 +
      cost7 +
      cost8 +
      cost9
    )

    setTotalValue(
      value0 +
      value1 +
      value2 +
      value3 +
      value4 +
      value5 +
      value6 +
      value7 +
      value8 +
      value9
    )
  }, [
    cost0,
    cost1,
    cost2,
    cost3,
    cost4,
    cost5,
    cost6,
    cost7,
    cost8,
    cost9,
    value0,
    value1,
    value2,
    value3,
    value4,
    value5,
    value6,
    value7,
    value8,
    value9
  ])

  useEffect(() => {
    async function getClients() {
      const response = await api.post<IClient[]>('/client/list')
      setClients(response.data)
    }
    if (!loading) {
      getClients()
    }
  }, [loading])

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
        <Navbar />

        <form
          className={styles.updateSaleForm}
          onSubmit={handleSubmit(updateSale)}
        >
          <div>
            <label htmlFor="clientId">Selecione o cliente:</label>
            <select
              {...register('clientId')}
              className={globals.input}
              name="clientId"
              id="clientId"
            >
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
            <div>

              {/* PRODUCTS FORM */}

              <div
                className={styles.product}
              >
                <div>
                  <input
                    {...register(`name-0`)}
                    type="text"
                    className={`${globals.input} ${styles.productName}`}
                    placeholder="Nome do produto"
                  />
                </div>
                <div>
                  <label>Custo: </label>
                  <input
                    {...register(`cost-0`)}
                    type="number"
                    className={`${globals.input} ${styles.productCost}`}
                    onChange={(e) => setCost0(parseInt(e.target.value))}
                    value={cost0}
                  />
                </div>
                <div>
                  <label>Valor: </label>
                  <input
                    {...register(`value-0`)}
                    type="number"
                    className={`${globals.input} ${styles.productValue}`}
                    onChange={(e) => setValue0(parseInt(e.target.value))}
                    value={value0}
                  />
                </div>
              </div>

              <div
                className={styles.product}
              >
                <div>
                  <input
                    {...register(`name-1`)}
                    type="text"
                    className={`${globals.input} ${styles.productName}`}
                    placeholder="Nome do produto"
                  />
                </div>
                <div>
                  <label>Custo: </label>
                  <input
                    {...register(`cost-1`)}
                    type="number"
                    className={`${globals.input} ${styles.productCost}`}
                    onChange={(e) => setCost1(parseInt(e.target.value))}
                    value={cost1}
                  />
                </div>
                <div>
                  <label>Valor: </label>
                  <input
                    {...register(`value-1`)}
                    type="number"
                    className={`${globals.input} ${styles.productValue}`}
                    onChange={(e) => setValue1(parseInt(e.target.value))}
                    value={value1}
                  />
                </div>
              </div>

              <div
                className={styles.product}
              >
                <div>
                  <input
                    {...register(`name-2`)}
                    type="text"
                    className={`${globals.input} ${styles.productName}`}
                    placeholder="Nome do produto"
                  />
                </div>
                <div>
                  <label>Custo: </label>
                  <input
                    {...register(`cost-2`)}
                    type="number"
                    className={`${globals.input} ${styles.productCost}`}
                    onChange={(e) => setCost2(parseInt(e.target.value))}
                    value={cost2}
                  />
                </div>
                <div>
                  <label>Valor: </label>
                  <input
                    {...register(`value-2`)}
                    type="number"
                    className={`${globals.input} ${styles.productValue}`}
                    onChange={(e) => setValue2(parseInt(e.target.value))}
                    value={value2}
                  />
                </div>
              </div>

              <div
                className={styles.product}
              >
                <div>
                  <input
                    {...register(`name-3`)}
                    type="text"
                    className={`${globals.input} ${styles.productName}`}
                    placeholder="Nome do produto"
                  />
                </div>
                <div>
                  <label>Custo: </label>
                  <input
                    {...register(`cost-3`)}
                    type="number"
                    className={`${globals.input} ${styles.productCost}`}
                    onChange={(e) => setCost3(parseInt(e.target.value))}
                    value={cost3}
                  />
                </div>
                <div>
                  <label>Valor: </label>
                  <input
                    {...register(`value-3`)}
                    type="number"
                    className={`${globals.input} ${styles.productValue}`}
                    onChange={(e) => setValue3(parseInt(e.target.value))}
                    value={value3}
                  />
                </div>
              </div>

              <div
                className={styles.product}
              >
                <div>
                  <input
                    {...register(`name-4`)}
                    type="text"
                    className={`${globals.input} ${styles.productName}`}
                    placeholder="Nome do produto"
                  />
                </div>
                <div>
                  <label>Custo: </label>
                  <input
                    {...register(`cost-4`)}
                    type="number"
                    className={`${globals.input} ${styles.productCost}`}
                    onChange={(e) => setCost4(parseInt(e.target.value))}
                    value={cost4}
                  />
                </div>
                <div>
                  <label>Valor: </label>
                  <input
                    {...register(`value-4`)}
                    type="number"
                    className={`${globals.input} ${styles.productValue}`}
                    onChange={(e) => setValue4(parseInt(e.target.value))}
                    value={value4}
                  />
                </div>
              </div>

              <div
                className={styles.product}
              >
                <div>
                  <input
                    {...register(`name-5`)}
                    type="text"
                    className={`${globals.input} ${styles.productName}`}
                    placeholder="Nome do produto"
                  />
                </div>
                <div>
                  <label>Custo: </label>
                  <input
                    {...register(`cost-5`)}
                    type="number"
                    className={`${globals.input} ${styles.productCost}`}
                    onChange={(e) => setCost5(parseInt(e.target.value))}
                    value={cost5}
                  />
                </div>
                <div>
                  <label>Valor: </label>
                  <input
                    {...register(`value-5`)}
                    type="number"
                    className={`${globals.input} ${styles.productValue}`}
                    onChange={(e) => setValue5(parseInt(e.target.value))}
                    value={value5}
                  />
                </div>
              </div>

              <div
                className={styles.product}
              >
                <div>
                  <input
                    {...register(`name-6`)}
                    type="text"
                    className={`${globals.input} ${styles.productName}`}
                    placeholder="Nome do produto"
                  />
                </div>
                <div>
                  <label>Custo: </label>
                  <input
                    {...register(`cost-6`)}
                    type="number"
                    className={`${globals.input} ${styles.productCost}`}
                    onChange={(e) => setCost6(parseInt(e.target.value))}
                    value={cost6}
                  />
                </div>
                <div>
                  <label>Valor: </label>
                  <input
                    {...register(`value-6`)}
                    type="number"
                    className={`${globals.input} ${styles.productValue}`}
                    onChange={(e) => setValue6(parseInt(e.target.value))}
                    value={value6}
                  />
                </div>
              </div>

              <div
                className={styles.product}
              >
                <div>
                  <input
                    {...register(`name-7`)}
                    type="text"
                    className={`${globals.input} ${styles.productName}`}
                    placeholder="Nome do produto"
                  />
                </div>
                <div>
                  <label>Custo: </label>
                  <input
                    {...register(`cost-7`)}
                    type="number"
                    className={`${globals.input} ${styles.productCost}`}
                    onChange={(e) => setCost7(parseInt(e.target.value))}
                    value={cost7}
                  />
                </div>
                <div>
                  <label>Valor: </label>
                  <input
                    {...register(`value-7`)}
                    type="number"
                    className={`${globals.input} ${styles.productValue}`}
                    onChange={(e) => setValue7(parseInt(e.target.value))}
                    value={value7}
                  />
                </div>
              </div>

              <div
                className={styles.product}
              >
                <div>
                  <input
                    {...register(`name-8`)}
                    type="text"
                    className={`${globals.input} ${styles.productName}`}
                    placeholder="Nome do produto"
                  />
                </div>
                <div>
                  <label>Custo: </label>
                  <input
                    {...register(`cost-8`)}
                    type="number"
                    className={`${globals.input} ${styles.productCost}`}
                    onChange={(e) => setCost8(parseInt(e.target.value))}
                    value={cost8}
                  />
                </div>
                <div>
                  <label>Valor: </label>
                  <input
                    {...register(`value-8`)}
                    type="number"
                    className={`${globals.input} ${styles.productValue}`}
                    onChange={(e) => setValue8(parseInt(e.target.value))}
                    value={value8}
                  />
                </div>
              </div>

              <div
                className={styles.product}
              >
                <div>
                  <input
                    {...register(`name-9`)}
                    type="text"
                    className={`${globals.input} ${styles.productName}`}
                    placeholder="Nome do produto"
                  />
                </div>
                <div>
                  <label>Custo: </label>
                  <input
                    {...register(`cost-9`)}
                    type="number"
                    className={`${globals.input} ${styles.productCost}`}
                    onChange={(e) => setCost9(parseInt(e.target.value))}
                    value={cost9}
                  />
                </div>
                <div>
                  <label>Valor: </label>
                  <input
                    {...register(`value-9`)}
                    type="number"
                    className={`${globals.input} ${styles.productValue}`}
                    onChange={(e) => setValue9(parseInt(e.target.value))}
                    value={value9}
                  />
                </div>
              </div>

            </div>
            <div className={styles.totals}>
              <p>Custo Total: {totalCost}</p>
              <p>Valor Total: {totalValue}</p>
            </div>
          </div>

          <div>
            <label htmlFor="paid">Já está pago?</label>
            <input
              {...register('paid')}
              id="paid"
              type="checkbox"
            />
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
