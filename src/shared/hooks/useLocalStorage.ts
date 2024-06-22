import { useState, useEffect } from "react"

export const useLocalStorage = (key: string, initialValue: any) => {
  const [state, setState] = useState<any>(initialValue)

  const setValue = (value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
    setState(value)
  }
  
  useEffect(() => {
    setState(() => {
      const value = localStorage.getItem(key)
      return value ? JSON.parse(value) : initialValue
    })
  }, [])
  
  return [state, setValue]
}