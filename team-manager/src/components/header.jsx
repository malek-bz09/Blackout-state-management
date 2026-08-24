import { useContext } from "react"
import "./header.css"
import { AppContext } from "../context/AppContext"

function Header() {
  const { theme, setTheme } = useContext(AppContext)

  function changeTheme() {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <header>
      <h1>Team Manager</h1>
      <button onClick={changeTheme}>Toggle Theme</button>
    </header>
  )
}

export default Header