import React from "react";
import styles from ".//paginado.module.css";

export default function Pagination({ DogsPerPage, allDogs, paginado, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allDogs / DogsPerPage); i++) {
    //cantidad de elementos totales, dividido limite de elementos por pagina
    pageNumbers.push(i);
  }

  return (
    <nav className={styles.nav_container}>
      <ul className={styles.ul_container}>
        {pageNumbers.length &&
          pageNumbers.map((number) => (
            <li
              
              onClick={() => paginado(number)}
              key={number}
            >
              <button className={currentPage===number? styles.activebutt : styles.pbutton} type="button">{number}</button>
            </li>
          ))}
      </ul>
    </nav>
  );
}
