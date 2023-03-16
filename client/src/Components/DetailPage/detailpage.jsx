import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { getdetails } from "../../Actions/actions";
import styles from "./detailpage.module.css";

export default function Details() {
  const dispatch = useDispatch();
  const dogsdetails = useSelector((state) => state.dogsdetail);

  const { params } = useParams();

  console.log(dogsdetails);
  useEffect(() => {
    dispatch(getdetails(params));
  }, []);
  return (
    <div style={{width:'100%', height:'100vh'}}>
      <NavLink to={"/home"}>
        {" "}
        <button className={styles.backtohome}>BACK TO HOME</button>
      </NavLink>
      {dogsdetails ? (
        <div className={styles.container}>

          <img
            className={styles.img}
            src={dogsdetails.imagen}
            alt={dogsdetails.id}
          />
          <h1 className={styles.name}>Breed Name:</h1>
          <h1 style={{marginTop:'5px'}}>{dogsdetails.nombre}</h1>
          <h4 className={styles.documento}>
            Life Span: {dogsdetails.edadestimada}
          </h4>
          <h4 className={styles.documento}>
            Height in cm: {dogsdetails.altura}
          </h4>
          <h4 className={styles.documento}>Weight in kg: {dogsdetails.peso}</h4>
          
          <h4 className={styles.documento}>Temperaments: </h4>
          <div style={{marginTop:'10px'}}>
            {Array.isArray(dogsdetails.temperamentos) ? (
              dogsdetails.temperamentos.map((p) => (
                <span className={styles.temperamento} key={p}>
                  {p}
                </span>
              ))
            ) : (
              <span className={styles.temperamento}>
                {dogsdetails.temperamentos}
              </span>
            )}
          </div>
        </div>
      ) : (
        <h4 className={styles.loading}>loading</h4>
      )}
    </div>
  );
}
