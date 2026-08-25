import { useContext } from "react"
import "./header.css"
import { AppContext } from "../context/AppContext"



function Header() {
  const { theme, setTheme } = useContext(AppContext)

  function changeTheme() {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <header className={theme === "light" ? "header header-light" : "header header-dark"}>
      <h1 className="header-title">Team Manager</h1>
      <button className="theme-toggle" onClick={changeTheme}>
        {theme === "light" ? " Dark Mode" : " Light Mode"}
      </button>
    </header>
  )
}

export default Header