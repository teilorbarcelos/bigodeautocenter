import Image from 'next/image'
import { SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'

import styles from './styles.module.scss'
import globals from '../../../styles/globals.module.scss'
import User1 from '../../../public/user1.jpeg'
import User2 from '../../../public/user1.jpeg'
import User3 from '../../../public/user1.jpeg'
import Testimonial from '../Testimonial'
import MySwiper from '../MySwiper'

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      text: 'Eu sou cliente do Bigode Auto Center desde que iniciou suas atividades, e posso garantir que tem o melhor serviço e atendimento da cidade.',
      userImage: User1,
      name: 'Teilor Barcelos'
    },
    {
      id: 2,
      text: 'Eu sou cliente do Bigode Auto Center desde que iniciou suas atividades, e posso garantir que tem o melhor serviço e atendimento da cidade.',
      userImage: User2,
      name: 'Teilor Barcelos'
    },
    {
      id: 3,
      text: 'Eu sou cliente do Bigode Auto Center desde que iniciou suas atividades, e posso garantir que tem o melhor serviço e atendimento da cidade.',
      userImage: User3,
      name: 'Teilor Barcelos'
    },
  ]

  return (
    <section className={`${styles.testimonials}`} id="testimonials">
      <div className={`${styles.container}`}>
        <header className={styles.header}>
          <h2 className={globals.title}>Depoimentos de quem já passou por aqui</h2>
        </header>
        <div>

          <MySwiper>
            {testimonials.map(item => {
              return (
                <SwiperSlide key={item.id} className={`${styles.swiperSlide}`} >
                  <Testimonial
                    text={item.text}
                    userImage={
                      <Image
                        objectFit={'cover'}
                        width={32}
                        height={32}
                        className={styles.userImage}
                        src={item.userImage}
                        alt={`Foto ${item.name}`}
                      />
                    }
                    userName={item.name}
                  />
                </SwiperSlide>
              )
            })}
          </MySwiper>

        </div>
      </div>
    </section >
  )
}