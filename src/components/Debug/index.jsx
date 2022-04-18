import { useState } from 'react'
import { ClipboardCopyIcon } from '@heroicons/react/outline'
import Button from '@/components/Button'

export default function Debug({ data }) {
  const [show, setShow] = useState(true)

  function copy() {
    navigator.clipboard.writeText(JSON.stringify(data))
  }

  function close() {
    setShow(false)
  }

  if (GLOBAL.DEBUG) {
    return (
      show && (
        <div className="relative my-10 bg-rose-50 p-6 pt-12 text-rose-500">
          <div className="absolute top-4 left-4 text-sm uppercase">Debug</div>
          <div className="absolute top-4 right-4 flex space-x-2">
            <Button color="red" onClick={copy}>
              <ClipboardCopyIcon className="h-5 w-5 " aria-hidden="true" />
            </Button>
            <Button color="red" onClick={close}>
              Close
            </Button>
          </div>
          <pre className="text-sm leading-tight">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )
    )
  } else {
    return null
  }
}
