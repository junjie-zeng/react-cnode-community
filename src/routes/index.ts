import React from 'react'
import { Redirect } from 'react-router-dom'

import  Home  from '../container/Home'
import  Msg  from '../container/Msg'
import  Classify  from '../container/Classify'
import  My  from '../container/My'

let routes  = [
    {
        path:'/home',
        component:Home,
    },
    {
        path:'/msg',
        component:Msg,
    },
    {
        path:'/classify',
        component:Classify,
    },
    {
        path:'/my',
        component:My,
    }
]

export default routes 