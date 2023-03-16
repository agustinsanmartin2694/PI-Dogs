import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterTemp,
  filterorigin,
  getDogs,
  getordereddogs,
  gettemperaments,
} from "../../Actions/actions.js";
import {NavLink} from "react-router-dom"
import DogCard from "./DogCard/dogcard.jsx";
import Pagination from "./Paginado/paginado.jsx";
import styles from "./homepage.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.filterdogs);
  const [input, setInput] = useState("");
  const [select, setSelect] = useState({
    orden: "Order",
    filtertemp: "default",
    origen: "origen",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [DogsPerPage, setDogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * DogsPerPage;
  const indexOfFirstDog = indexOfLastDog - DogsPerPage;
  const temperaments = useSelector((state) => state.temperaments);

  useEffect(() => {
    dispatch(getDogs());
    dispatch(gettemperaments());
  }, [dispatch]);

  const handlechangeOrden = (e) => {
    setSelect(e.target.value);
    dispatch(getordereddogs(e.target.value));
    setSelect({ ...select, orden: e.target.value });
    setCurrentPage(1);
  };
  const handlechangeinput = (e) => {
    setInput(e.target.value);
    console.log(input);
  };
  const onClick = (e) => {
    setSelect({ orden: "Order", filtertemp: "default", origen: "origen" });
    setCurrentPage(1);
    dispatch(getDogs(input)).catch((err) => alert(err));
  };
  const resetClick=(e)=>{
    setSelect({ orden: "Order", filtertemp: "default", origen: "origen" });
    setCurrentPage(1);
    dispatch(getDogs())
  };
  const filtertemp = (e) => {
    e.preventDefault();
    dispatch(filterTemp(e.target.value));
    if (select.origen !== "origen") dispatch(filterorigin(select.origen));
    dispatch(getordereddogs(select.orden));
    setSelect({ ...select, filtertemp: e.target.value });
    console.log(e.target.value);
    setCurrentPage(1);
  };
  const filterOrigin = (e) => {
    dispatch(filterorigin(e.target.value));
    if (select.filtertemp !== "default")
      dispatch(filterTemp(select.filtertemp));
    dispatch(getordereddogs(select.orden));
    setSelect({ ...select, origen: e.target.value });
    console.log(e.target.value);
    setCurrentPage(1);
  };
  return (
    <div>
      <h1>Breedkipedia</h1>
      <div style={{height:"2px"}} ><img className={styles.gif} src="https://i.pinimg.com/originals/9f/df/93/9fdf93860f9269c05411e27291a7b936.gif" alt="gif" /></div>
      <div> <NavLink to={"/form"}> <button className={styles.create}>CREATE A NEW BREED</button></NavLink></div>
      <div className={styles.allfilters}>
        <div className={styles.searchcontainer}>
          <input
          className={styles.inputsearch}
            type="text"
            value={input}
            placeholder='search breed'
            onChange={(e) => handlechangeinput(e)}
            name="SearchBar"
          />
          <button className={styles.buttonsearch} onClick={(e) => onClick(e)}>🔍</button>
          <button className={styles.resetbutton} onClick={(e) => resetClick(e)}>Reset Search</button>
        </div>

        <div className={styles.selectcontainer}>
          <select
            className={styles.selected}
            name="ordenamientos"
            value={select.orden}
            onChange={(e) => handlechangeOrden(e)}
            id="ordenamientos"
          >
            <option key={"default"} value={"Order"} selected disabled>
              Order options
            </option>
            <option value="min-weight" key="min">
              min weight
            </option>
            <option value="max-weight" key="max">
              max weight
            </option>
            <option value="A-Z" key="A-Z">
              {" "}
              A - Z
            </option>
            <option value="Z-A" key="Z-A">
              {" "}
              Z - A{" "}
            </option>
          </select>
          <div>
            <select
              className={styles.selected}
              name="temperamentos"
              value={select.filtertemp}
              onChange={(e) => filtertemp(e)}
              id="temperamentos"
            >
              <option value="default" key={"default"} disabled defaultValue>
                Filter By Temperaments
              </option>
              <option key={"all"} value={"all"}>
                All Temperaments{" "}
              </option>
              {temperaments.length ? (
                temperaments.map((t) => (
                  <option value={t.nombre} key={t.id}>
                    {t.nombre}
                  </option>
                ))
              ) : (
                <option key={"loading"}>Loading...</option>
              )}
            </select>
          </div>
          <div>
            <select
              className={styles.selected}
              name="origen"
              id="origen"
              value={select.origen}
              onChange={(e) => filterOrigin(e)}
            >
              <option value="origen" key="default" disabled>
                {" "}
                Filter By Origin
              </option>
              <option value="ALL" key="ALL">
                ALL
              </option>
              <option value="API" key="api">
                API
              </option>
              <option value="DB" key="DB">
                DB
              </option>
            </select>
          </div>
        </div>
      </div>
      <div className={styles.dogcard}>
        {dogs.length ? (
          dogs
            .slice(indexOfFirstDog, indexOfLastDog)
            .map((d) => (
             // <NavLink to={`/detail/${d.ID}`} style={{textDecoration:'none'}}>
              <DogCard
                key={d.ID}
                id={d.ID}
                nombre={d.nombre}
                imagen={d.imagen}
                temperamentos={d.temperamentos}
                peso={d.peso}
              />
              //</NavLink>
            ))
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
      <div>
        <Pagination
          DogsPerPage={DogsPerPage}
          allDogs={dogs.length}
          paginado={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
