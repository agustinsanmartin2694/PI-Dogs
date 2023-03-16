import React from "react";
import {NavLink} from 'react-router-dom'
import styles from './dogcard.module.css'

export default function DogCard(props) {
  return (
    <NavLink to={`/detail/${props.id}`} className={styles.container} style={{textDecoration:'none'}}>
    {/* //<div > */}
      <img className={styles.img} src={props.imagen} alt={props.nombre} />
      <h2 className={styles.title}>{props.nombre}</h2>
      <p>Weight in kg: {props.peso}</p>
      <span className={styles.temp}>
        Temperaments:{" "}
        {typeof props.temperamentos === "object" ? (
          props.temperamentos.map((t, i) => <p className={styles.ptemp} key={i}>{t}</p>)
        ) : (
          <p >{props.temperamentos}</p>
        )}
      </span>
    {/* //</div> */}
    </NavLink>
  );
}
