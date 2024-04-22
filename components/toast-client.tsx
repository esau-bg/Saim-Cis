'use client'

import { ToastContainer, toast } from 'react-toastify'

type ToastType = 'error' | 'success' | 'info' | 'warning'

export default function ToastClient ({
  type,
  message
}: {
  type: ToastType
  message: string
}) {
  if (type === 'error') {
    toast.error(message)
  } else if (type === 'success') {
    toast.success(message)
  } else if (type === 'info') {
    toast.info(message)
  } else if (type === 'warning') {
    toast.warn(message)
  } else {
    toast(message)
  }
  return (
    <main>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </main>
  )
}
