import React, { Suspense } from 'react'
import AdminHome from './AdminHome'

function BasePage({value}) {
  return (
    <div>
        <Suspense >
            {value='home'?
            <AdminHome/>
            :''
        }
        </Suspense>
    </div>
  )
}

export default BasePage