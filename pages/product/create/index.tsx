import type { NextPage } from 'next'
import globals from '../../../styles/globals.module.scss'
import styles from './styles.module.scss'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { api } from '../../api'
import Button1 from '../../../components/Button1'
import { useState } from 'react'
import Layout from '../../../components/Layout'
import axios from 'axios'
import { IProduct } from '../../../components/ProductTable'
import { useAuth } from '../../../hooks/useAuth'

const ProductCreate: NextPage = () => {
  const { logOut } = useAuth()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { register, handleSubmit } = useForm()

  async function newProduct(data: IProduct) {
    const newData = {
      ...data,
      amount: Number(data.amount),
      cost: Number(data.cost),
      value: Number(data.value)
    }

    try {
      setLoading(true)

      const response = await api.post<IProduct>('/product/create', newData)

      alert('Produto cadastrado com sucesso!')

      router.push(`/product/id/${response.data.id}`)
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

  return (
    <Layout
      title="Cadastro de produto"
      externalLoading={loading}
    >
      <form
        className={styles.newproductform}
        onSubmit={handleSubmit(newProduct)}
      >
        <h5>Cadastrar produto</h5>

        <div>
          <label htmlFor="name">Nome:</label>
          <input
            {...register('name')}
            id="name"
            type="text"
            className={globals.input}
            placeholder="Nome do produto"
          />
        </div>

        <div>
          <label htmlFor="amount">Quantidade:</label>
          <input
            {...register('amount')}
            id="amount"
            defaultValue={0}
            type="number"
            className={globals.input}
          />
        </div>

        <div>
          <label htmlFor="cost">Custo (R$):</label>
          <input
            {...register('cost')}
            id="cost"
            type="number"
            step='0.01'
            className={globals.input}
            defaultValue={0.00}
          />
        </div>

        <div>
          <label htmlFor="value">Valor (R$):</label>
          <input
            {...register('value')}
            id="value"
            type="number"
            step='0.01'
            className={globals.input}
            defaultValue={0.00}
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
