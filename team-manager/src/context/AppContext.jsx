import { createContext, useState } from "react"

const AppContext = createContext()

function AppProvider({ children }) {
  const [theme, setTheme] = useState("light")

  return (
    <AppContext.Provider value={{ theme, setTheme }}>
      <div className={theme === "light" ? "app-wrapper app-light" : "app-wrapper app-dark"}>
        {children}
      </div>
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }