import { NextPage } from "next"
import { useAuth } from "../../hooks/useAuth"
import BasicPage from "../BasicPage"
import LoadingScreen from "../LoadingScreen"
import Login from "../Login"
import Navbar from "../Navbar"

interface ILayoutProps {
  title?: string
  content?: string
}

const Layout: NextPage<ILayoutProps> = ({
  children,
  title = "Bigode Internal Sales System",
  content = "Sistema interno restrito a funcionários"
}) => {
  const { user, loading } = useAuth()

  return (
    <BasicPage
      title={title}
      content={content}
    >
      <>
        <LoadingScreen visible={loading} />

        {
          user ?
            <>
              <Navbar />
              {children}
            </>
            :
            <Login />
        }
      </>
    </BasicPage>
  )
}

export default Layout
