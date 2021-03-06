import type { NextPage } from 'next'
import BasicPage from '../components/BasicPage'
import About from '../components/institutional/About'
import BackToTopButton from '../components/institutional/BackToTopButton'
import Contact from '../components/institutional/Contact'
import Divider1 from '../components/institutional/Divider1'
import Divider2 from '../components/institutional/Divider2'
import Footer from '../components/institutional/Footer'
import Header from '../components/institutional/Header'
import IHome from '../components/institutional/IHome'
import Services from '../components/institutional/Services'
import Testimonials from '../components/institutional/Testimonials'
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

        <Divider1 />

        <About />

        <Divider2 />

        <Services />

        <Divider1 />

        <Testimonials />

        <Divider2 />

        <Contact />

        <Divider1 />

        <Footer />

        <BackToTopButton />
      </>
    </BasicPage>
  )
}

export default Home
