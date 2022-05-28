import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useQueueState } from 'rooks'
import { classNames } from '@/utils/common'

const NotificationContext = createContext()

export function useNotification() {
  return useContext(NotificationContext)
}

export function NotificationProvider({ children }) {
  const [text, setText] = useState('')
  const [visible, setVisible] = useState(false)
  const [queue, setQueue] = useState([])
  const queueRef = useRef('')

  function enqueue(message) {
    setQueue([...queueRef.current, message])
  }

  function dequeue() {
    setQueue(queueRef.current.slice(1))
  }

  function peek() {
    return queueRef.current[0] || null
  }

  function length() {
    return queueRef.current.length
  }

  const showNotification = (message) => {
    enqueue(message)
  }

  useEffect(() => {
    queueRef.current = queue

    if (length() > 0 && !visible) {
      show()
    }
  }, [queue])

  let show = () => {
    setText(peek())
    setVisible(true)

    setTimeout(() => {
      setVisible(false)

      setTimeout(() => {
        dequeue()
      }, 250)
    }, 4000)
  }

  let value = { showNotification }

  function renderNotification() {
    return (
      <div
        className={classNames(
          'fixed top-20 left-0 right-9 z-10 inline-flex h-10 w-full items-center justify-center bg-orange-500/10 font-semibold text-orange-600 transition-all ease-in-out',
          visible ? 'h-12' : 'h-0 opacity-0'
        )}
      >
        {text}
      </div>
    )
  }

  return (
    <NotificationContext.Provider value={value}>
      {renderNotification()}
      {children}
    </NotificationContext.Provider>
  )
}
