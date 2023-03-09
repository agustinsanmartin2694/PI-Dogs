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