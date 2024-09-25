
import Login from '@/components/Login'
import React from 'react'

const index = () => {
  return (
    <div>
      <Login />
    </div>
  )
}
index.getLayout = (page) => <>{page}</>; // No layout or custom layout
export default index