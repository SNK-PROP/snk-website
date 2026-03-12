import { useEffect, useState } from 'react'

export default function AnimationProvider({ children }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className={isMounted ? 'animate-once' : ''}>
      {children}
    </div>
  )
}