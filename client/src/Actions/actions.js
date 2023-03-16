import axios from 'axios'
export function gettemperaments(){
    return function (dispatch){
        return axios.get('http://localhost:3001/temperaments').then((response)=>{
            dispatch({type: 'getTemperaments', payload: response.data})
        })
    }
}

export function postdog (body){
    return function(dispatch){
        return axios.post('http://localhost:3001/dogs', body).then( (response)=>{
            dispatch({type: 'postDog', payload: response})
        })
    }
}

export function getDogs (name){
    return function (dispatch){
        return axios.get(`http://localhost:3001/dogs${name? `?name=${name}`:''}`).then((response)=>{
           // console.log(response)
            dispatch({type: 'getDogs', payload: response.data})
        }).catch(err=> {
            throw Error(err.response.data.error)})
    }
}

export function getordereddogs(payload){
    return{
        type: 'orderDogs',
        payload
    }
}
export function filterTemp(payload){
    return{
        type:"filtertemp",
        payload
    }
}
export function filterorigin(payload){
    return{
        type:"filterorigin",
        payload
    }
}
export function getdetails(params){
    return function(dispatch){
        return axios.get(`http://localhost:3001/dogs/${params}`).then((response)=>{
            dispatch({type: 'getDetails', payload: response.data })})
       
    }
}
