import { useForm } from 'react-hook-form'
import Link from 'next/link'
import styles from './styles.module.scss'
import globals from '../../styles/globals.module.scss'
import Button1 from '../../components/Button1'
import { useAuth } from '../../hooks/useAuth'

export default function Login() {
  const { signIn } = useAuth()
  const { register, handleSubmit } = useForm()

  return (
    <section className={styles.login} id="login">
      <div className={styles.box}>
        <form className={styles.form} onSubmit={handleSubmit(signIn)}>
          <h5>Faça Login</h5>
          <div>
            <label htmlFor="login">Login:</label>
            <input
              {...register('login')}
              id="login"
              type="text"
              className={globals.input}
            />
          </div>
          <div>
            <label htmlFor="password">Senha:</label>
            <input
              {...register('password')}
              id="password"
              type="password"
              className={globals.input}
            />
          </div>
          <div>
            <Button1 title="Entrar" />
          </div>
          <p><Link href="/"><a className={globals.link}>Voltar para o site</a></Link></p>
        </form>
      </div>
    </section>
  )
}