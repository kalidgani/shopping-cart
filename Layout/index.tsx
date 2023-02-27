import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import Footer from "./Footer"
import Header from "./Header"
import Sidebar from "./Sidebar"

function Layout({children} : any) {
  const [token, setToken] = useState<string>()

  useEffect(() =>{
    const cookie : string | undefined = Cookies.get('token')
    setToken(cookie)
  },[Cookies.get('token')])

  return (
    <>
    {token ? (
    <div className="App">
    <Header />
    <div className="page-wrapper">
    <Sidebar />
    <div className="content-area-wrapper">
    <main>{children}</main>
    <Footer />
    </div>
    </div>
    </div>
    ) : <main>{children}</main>}
    </>
  )
}

export default Layout