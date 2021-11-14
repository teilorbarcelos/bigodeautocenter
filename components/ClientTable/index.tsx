import Link from 'next/link'

import styles from './styles.module.scss'
import globals from '../../styles/globals.module.scss'
import { IDebit } from '../DebitSaleList'

export interface IProduct {
  name: string
  cost: number
  value: number
}

export interface ICost {
  id?: string
  saleId?: string
  value: number
}

export interface ISale {
  id?: string
  createdAt: string
  car?: string
  client: IClient
  cost?: ICost
  debits?: IDebit[]
  info?: string
  km?: string
  paid: boolean
  plate?: string
  products?: IProduct[]
  total?: number
  userId: string
  error?: string
}

export interface IClient {
  id?: string
  name: string
  contact: string
  cpf: string
  info: string
  birthday: Date
  sales?: ISale[]
  reminder?: [{}]
  error?: string
}

interface Props {
  clients: IClient[]
}

export default function ClientTable({ clients = [] }: Props) {
  return (
    <>
      <section className={styles.clienttable} id="clientlist">

        <div className={styles.list}>

          {
            clients.length > 0 ?
              clients.map(client => {
                return (
                  <Link
                    key={client.id}
                    href={`/client/id/${client.id}`}
                  >
                    <a>
                      <div
                        title={`Visualizar cadastro do cliente ${client.name}`}
                        className={styles.client}
                      >
                        <p>{client.name}</p>
                        <p>{client.contact}</p>
                      </div>
                    </a>
                  </Link>
                )
              })
              :
              <h6>Nenhum cliente cadastrado!</h6>
          }

        </div>
      </section>
    </>
  )
}