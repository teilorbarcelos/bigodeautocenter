import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import styles from './styles.module.scss'
import globals from '../../../styles/globals.module.scss'
import LoadingScreen from '../../../components/LoadingScreen'
import { useEffect, useState } from 'react'
import { ISale } from '../../../components/ClientTable'
import { api } from '../../api'

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
    <div className={globals.container}>
      <LoadingScreen visible={loading} />
      <Head>
        <title>Bigode Internal Sales System</title>
        <meta name="description" content="Sistema interno restrito a funcionários" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={globals.main}>
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


        {/* {user ? <InitialPage /> : !loading && <Login />} */}
      </main>
    </div>
  )
}

export default Sale
