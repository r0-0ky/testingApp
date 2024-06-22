import { useState } from "react"

const useLocalStorage = (key: string, initialValue: string | number | boolean | Array<any>) => {
  const [state, setState] = useState(() => {

    try {
      const value = window.localStorage.getItem(key)
      return value ? JSON.parse(value) : initialValue
    } catch (error) {
      console.log(error)
    }
  })

  const setValue = (value: string | number | boolean | Array<any> | ((state: string | number | boolean | Array<any>) => string | number | boolean | Array<any>)  ) => {
    try {
      const valueToStore = value instanceof Function ? value(state) : value
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
      setState(value)
    } catch (error) {
      console.log(error)
    }
  }

  return [state, setValue]
}

export default useLocalStorage