import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import styles from './styles.module.scss'
import globals from '../../../styles/globals.module.scss'
import LoadingScreen from '../../../components/LoadingScreen'
import { useEffect, useState } from 'react'
import { ISale } from '../../../components/ClientTable'
import { api } from '../../api'
import BasicPage from '../../../components/BasicPage'
import Navbar from '../../../components/Navbar'

const Sale: NextPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [sale, setSale] = useState<ISale | null>(null)

  useEffect(() => {
    try {
      async function getSale() {

        const { id } = await router.query // necessary "await" here

        const saleResponse = await api.post<ISale>('/sale/getData', {
          id
        })

        setSale(saleResponse.data)

      }

      getSale()

    } catch (error) {
      alert(error)
    } finally {
      setLoading(false)
    }
  }, [router.query])

  return (
    <BasicPage
      title="Bigode Internal Sales System"
      content="Sistema interno restrito a funcionários"
    >
      <>
        <LoadingScreen visible={loading} />
        <Navbar />

        {sale &&
          <>
            <p>{sale.id}</p>
            <p>{sale.createdAt}</p>
            <p>{sale.client.name}</p>
            <p>{sale.car}</p>
            <p>{sale.plate}</p>
            <p>{sale.info}</p>
            <p>{sale.total}</p>
            <p>{sale.paid}</p>
            <p>{sale.products}</p>
          </>
        }
      </>
    </BasicPage>
  )
}

export default Sale
