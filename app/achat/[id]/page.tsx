import { OperationOverview } from '@/components/opertaionOverview/OperationOverview'
import React from 'react'

const page = () => {
  return (
    <div className='h-[calc(100vh-80px)] p-6 w-[calc(100vw-250px)]  bg-Charcoal overflow-y-scroll'>
      <OperationOverview/>
    </div>
  )
}

export default page
