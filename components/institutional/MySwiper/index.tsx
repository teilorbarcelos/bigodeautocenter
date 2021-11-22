import { ReactNode } from 'react'
import { Pagination } from 'swiper'
import { Swiper } from 'swiper/react'

import styles from './styles.module.scss'

interface Props {
  children: ReactNode
}

export default function MySwiper({ children }: Props) {
  return (
    <Swiper
      className={`${styles.swiper}`}
      modules={[Pagination]}
      spaceBetween={5}
      slidesPerView={1}
      breakpoints={
        {
          768: {
            width: 768,
            slidesPerView: 2,
            spaceBetween: 20
          },
          1024: {
            width: 1024,
            slidesPerView: 2,
            spaceBetween: 20
          },
          1120: {
            width: 1120,
            slidesPerView: 2,
            spaceBetween: 20
          },

        }
      }
      pagination={{
        clickable: true
      }}
      scrollbar={{ draggable: true }}
      mousewheel={true}
      keyboard={true}
    >
      {children}
    </Swiper>
  )
}