import type { NextPage } from 'next'
import { useEffect } from 'react'
import InitialPage from '../../components/InitialPage'
import Layout from '../../components/Layout'
import { useAuth } from '../../hooks/useAuth'

const Dashboard: NextPage = () => {
  const { verifyUser } = useAuth()
  useEffect(() => {
    verifyUser()
  }, [])

  return (
    <Layout>
      <InitialPage />
    </Layout>
  )
}

export default Dashboard
