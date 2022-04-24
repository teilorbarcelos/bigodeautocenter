import type { NextPage } from 'next'
import globals from '../../../styles/globals.module.scss'
import styles from './styles.module.scss'
import { useRouter } from 'next/router'
import { api } from '../../api'
import Button1 from '../../../components/Button1'
import { FormEvent, useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import axios from 'axios'
import { IProduct } from '../../../components/ProductTable'
import { useAuth } from '../../../hooks/useAuth'

const ProductCreate: NextPage = () => {
  const { logOut } = useAuth()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState<string>('')
  const [amount, setAmount] = useState<number>(0)
  const [cost, setCost] = useState<number>(0.00)
  const [value, setValue] = useState<number>(0.00)

  const router = useRouter()

  const getProduct = async () => {
    const { id } = await router.query // necessary "await" here

    if (!id) {
      return
    }

    try {
      const { data: response } = await api.post<IProduct>('/product/getData', { id })

      setName(response.name)
      setAmount(response.amount)
      setCost(response.cost)
      setValue(response.value)
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

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const { id } = await router.query // necessary "await" here

    if (!id) {
      return
    }

    const data: IProduct = {
      id: String(id),
      name,
      amount,
      cost,
      value
    }

    try {
      setLoading(true)

      await api.post<IProduct>('/product/update', data)

      alert('Produto atualizado com sucesso!')
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

  useEffect(() => {
    getProduct()
  }, [router.query])

  return (
    <Layout
      title="Atualização de produto"
      externalLoading={loading}
    >
      <form
        className={styles.newproductform}
        onSubmit={event => handleSubmit(event)}
      >
        <h5>Atualizar produto</h5>

        <div>
          <label htmlFor="name">Nome:</label>
          <input
            id="name"
            type="text"
            className={globals.input}
            placeholder="Nome do produto"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="amount">Quantidade:</label>
          <input
            id="amount"
            defaultValue={0}
            type="number"
            className={globals.input}
            value={amount}
            onChange={e => setAmount(Number(e.target.value))}
          />
        </div>

        <div>
          <label htmlFor="cost">Custo (R$):</label>
          <input
            id="cost"
            type="number"
            step='0.01'
            className={globals.input}
            defaultValue={0.00}
            onChange={e => setCost(Number(parseFloat(e.target.value).toFixed(2)))}
            value={cost}
          />
        </div>

        <div>
          <label htmlFor="value">Valor (R$):</label>
          <input
            id="value"
            type="number"
            step='0.01'
            className={globals.input}
            defaultValue={0.00}
            onChange={e => setValue(Number(parseFloat(e.target.value).toFixed(2)))}
            value={value}
          />
        </div>

        <div className={styles.buttons}>
          <Button1 title="Salvar" />
        </div>

      </form>
    </Layout>
  )
}

export default ProductCreate
