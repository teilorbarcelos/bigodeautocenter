import type { NextPage } from 'next'
import BasicPage from '../components/BasicPage'
import Header from '../components/institutional/Header'
import IHome from '../components/institutional/IHome'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (

    <BasicPage
      title="Bigode Auto Center - Oficina Mecânica Criciúma - SC"
      content="Oficina mecânica do Bigode, Rodovia Luiz Rosso, São Luiz - Criciúma - SC"
    >
      <>
        <Header />

        <IHome />
      </>
    </BasicPage>
  )
}

export default Home
