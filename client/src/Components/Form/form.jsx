import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gettemperaments, postdog } from "../../Actions/actions";

export default function Form() {
  const temperaments = useSelector((state) => state.temperaments);
  const [form, setForm] = useState({
    nombre: "",
    altura: "",
    peso: "",
    edadestimada: "",
    imagen: "",
    temperamentos: [],
  });
  const [error,setError]=useState({})
  const [weight, setWeight]=useState({
    minWeight:'',
    maxWeight:''
  })
  const [height, setHeight]=useState({
    minHeight:'',
    maxHeight:''
  })
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(gettemperaments());
  }, []);

  const handlesubmit =async (e) =>{ 
    e.preventDefault();
    console.log(error)
    if(!Object.keys(error).at(0)){
     console.log(form)
await dispatch(postdog({
  ...form,
  altura: `${height.minHeight} - ${height.maxHeight}`,
  peso: `${weight.minWeight} - ${weight.maxWeight}`
}))
.then(()=> alert('perro enviado')) 
    } else{
      alert('Falta completar campos')
    }
    
  }

  const handleHeight= (e)=>{
    setHeight({
      ...height,
      [e.target.name]: e.target.value
    })
    setError(validator(null,null, {...height, [e.target.name]:e.target.value}))
  }
  const handleWeight= (e)=>{
    setWeight({
      ...weight,
      [e.target.name]: e.target.value
    })
   setError(validator(null,{...weight, [e.target.name]:e.target.value}, null))
  }
  const handlechange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(validator({...form,[e.target.name]:e.target.value}, null, null));
    console.log(form)
  };

  const handlechangetemp=(e)=>{
    setForm({...form,[e.target.name]: [...form.temperamentos,e.target.value]})
    setError(validator({...form,[e.target.name]:e.target.value}, null, null));
    console.log(form)
  };

const handlerdelete=(e)=>{
  if(!form.temperamentos.some((el)=> el === e.target.value)){
    setForm({
    ...form,
    temperamentos : [...form.temperamentos, e.target.value],
    })
}else{
    setForm({
        ...form,
        temperamentos :form.temperamentos.filter(el=> el !== e.target.value)
        })
    setError(validator({...form,temperamentos :form.temperamentos.filter(el=> el !== e.target.value)},null, null));
}

}

  return (
    <form onSubmit={(e) => handlesubmit(e)}>
      <h1>Create a new breed</h1>

      <div>
        <div>
        <label>breed name :</label>
        <input
          type="text"
          name={"nombre"}
          value={form.nombre}
          onChange={(e) => handlechange(e)}
        />
        {error.nombre && <span>{error.nombre}</span>}
        </div>
        <div>
        <label>life span:</label>
        <input
          type="text"
          name={"edadestimada"}
          value={form.edadestimada}
          onChange={(e) => handlechange(e)}
          placeholder="Example: 5 - 6 years"
        />
        {error.edadestimada && <span>{error.edadestimada}</span>}
        </div>
        <div>
        <label>image url:</label>
        <input
          type="text"
          name={"imagen"}
          value={form.imagen}
          onChange={(e) => handlechange(e)}
          placeholder="https://dogui.com/something.jpg"
        />
        {error.imagen && <span>{error.imagen}</span>}
        </div>
        <div>
        <label>weight (kg) :</label>
        
        <input
          type="text"
          name='minWeight'
          value={weight.minWeight}
          placeholder='min weight'
          onChange={(e) => handleWeight(e)}
        />
        <span > - </span>
        <input
          type="text"
          name='maxWeight'
          value={weight.maxWeight}
          placeholder='max weight'
          onChange={(e) => handleWeight(e)}
        />
        {error.peso && <span>{error.peso}</span>}
        </div>
        <div>
        <label>height (cm) :</label>
        
        <input
          type="text"
          name='minHeight'
          placeholder='min height'
          value={height.minHeight}
          onChange={(e) => handleHeight(e)}
        />
        <span> - </span>
        <input
          type="text"
          name='maxHeight'
          placeholder='max height'
          value={height.maxHeight}
          onChange={(e) => handleHeight(e)}
        />
        {error.altura && <span>{error.altura}</span>}

        </div>
        <div>
          <label>Temperaments:</label>
          <select name="temperamentos" onChange={(e)=>handlechangetemp(e)} required id="temperamentos">
            <option key={'default'} value={'Temperaments'} selected disabled>select options</option> 
          {temperaments ? temperaments.map((t)=>
          <option value={t.nombre} key={t.id}>{t.nombre}</option>
          ) : 
          <option key={'loading'}>Loading</option>}
          </select>
          { 
            form.temperamentos?.map((e) => {
                        return(
                            <div key={e} style={{display: 'flex', justifyContent:'space-around', width:'100px'}} >
                            <span>{e}</span>
                            <span 
                            // className={xSpanCard} 
                            onClick={()=>handlerdelete( {target:{value:`${e}`}}) }>
                            x
                            </span> 
                            </div>
                        )
                    })
                }
                {error.temperamentos && <span>{error.temperamentos}</span>}
        </div>
        <div>
          <button type='submit'> Submit</button>
        </div>
      </div>
    </form>
  );
};

const validator =(form,weight,height)=>{
  const error={};
  if(form && !form.nombre){
    error.nombre="campo obligatorio"
  }
   if(form && !form.imagen){
    error.imagen="campo obligatorio"
  }
  if(form && !form.temperamentos.length){
    error.temperamentos="campo obligatorio"
  }
   if(form && !form.edadestimada){
    error.edadestimada="campo obligatorio"
  }
  if(weight && (!weight.minWeight || !weight.maxWeight)){
    error.peso='campo obligatorio'
  }
  if(height && (!height.minHeight || !height.maxHeight)){
    error.altura='campo obligatorio'
  }
  
  return error

}
// const validatorWeight=(weight)=>{
//   const error={};
//   if(!weight.minWeight || !weight.maxWeight){
//     error.peso='Campo obligatorio'
//   }
//   else if(!/^\d+$/.test(weight.minWeight || weight.maxWeight)){
//     error.peso='Deben ser solo numeros'
//   }
//   return error
// }


