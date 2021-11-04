import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import styles from './styles.module.scss'
import globals from '../../../styles/globals.module.scss'
import LoadingScreen from '../../../components/LoadingScreen'
import { useEffect, useState } from 'react'
import { IClient } from '../../../components/ClientTable'
import { api } from '../../api'
import BasicPage from '../../../components/BasicPage'
import UpdateClientForm from '../../../components/UpdateClientForm'
import Navbar from '../../../components/Navbar'

const Client: NextPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [client, setClient] = useState<IClient | null>(null)

  useEffect(() => {
    try {
      async function getClient() {

        const { id } = await router.query // necessary "await" here

        const clientResponse = await api.post<IClient>('/client/getData', {
          id
        })

        setClient(clientResponse.data)

      }

      getClient()

    } catch (error) {
      alert(error)
    } finally {
      setLoading(false)
    }
  }, [router.query])

  return (
    <BasicPage
      title="Cadastro de cliente"
    >
      <>
        <LoadingScreen visible={loading} />

        {client &&
          <>
            <Navbar />
            <UpdateClientForm client={client} />
          </>
        }
      </>
    </BasicPage>
  )
}

export default Client
