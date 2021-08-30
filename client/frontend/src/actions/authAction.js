import * as api from '../api'
import {
    AUTH,
} from '../constants/AuthConstants.js'

export const signIn = (values,history) =>async(dispatch)=>{
    try {
        const { data } = await api.signIn(values)
        dispatch({type:AUTH,data})
        history.push('/')
    } catch (error) {
        console.log(error)
    }
}

export const signUp = (values,history) =>async(dispatch)=>{
    try {
        const { data } = await api.signUp(values)
        dispatch({type:AUTH,data})
        history.push('/')
    } catch (error) {
        console.log(error)
    }
}