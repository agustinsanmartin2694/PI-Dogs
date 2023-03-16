const initialState = {
  temperaments: [],
  dogs: [],
  filterbyorigin: "",
  filterbytemp: "",
  filterdogs: [],
  dogsdetail:{}
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "getTemperaments":
      return { ...state, temperaments: action.payload };
    case "getDogs":
      return {
        ...state,
        dogs: action.payload,
        filterdogs: [...action.payload],
      };
    case "orderDogs":
      let razas = [...state.filterdogs];
      razas = razas.sort((a, b) => {
        const [minWeightA, maxWeightA] = a.peso.split(" - ");
        const [minWeightB, maxWeightB] = b.peso.split(" - ");

        switch (action.payload) {
          case "min-weight":
            if (minWeightA !== minWeightB) {
              return minWeightA - minWeightB;
            } else {
              return maxWeightA - maxWeightB;
              // const diff = (maxWeightB || minWeightB) - (maxWeightA || minWeightA)
              // return diff || a.nombre.localeCompare(b.nombre)
            }
          case "max-weight":
            if (maxWeightB && maxWeightA && maxWeightA === maxWeightB) {
              return minWeightB - minWeightA;
            } else {
              return (
                (maxWeightB ? maxWeightB : minWeightB) -
                (maxWeightA ? maxWeightA : minWeightA)
              );
            }
          case "A-Z":
            if (a.nombre > b.nombre) {
              return 1;
            } else return -1;
          case "Z-A":
            if (b.nombre > a.nombre) {
              return 1;
            } else return -1;

          default:
            return 0;
        }
      });
      return {
        ...state,
        filterdogs: razas,
      };
    case "filtertemp":
      if (state.filterbyorigin === "DB") {
        const alldogs = state.dogs;
        let filterdogs = [];
        let filterbytemp = "";
        if (action.payload === "all") {
          filterdogs = alldogs;
        } else {
          for (var i = 0; i < alldogs.length; i++) {
            if (alldogs[i].temperamentos.includes(action.payload))
              filterdogs.push(alldogs[i]);
          }
          filterbytemp = action.payload;
        }
        return {
          ...state,
          filterdogs: filterdogs.filter((d) => d.ID.toString().includes("-")),
          filterbytemp,
        };
      } else if (state.filterbyorigin === "API") {
        const alldogs = state.dogs;
        let filterdogs = [];
        let filterbytemp = "";
        if (action.payload === "all") {
          filterdogs = alldogs;
        } else {
          for (var i = 0; i < alldogs.length; i++) {
            if (alldogs[i].temperamentos.includes(action.payload))
              filterdogs.push(alldogs[i]);
          }
          filterbytemp = action.payload;
        }
        return {
          ...state,
          filterdogs: filterdogs.filter((d) => !d.ID.toString().includes("-")),
          filterbytemp,
        };
      } else {
        const alldogs = state.dogs;
        let filterdogs = [];
        let filterbytemp = "";
        if (action.payload === "all") {
          filterdogs = alldogs;
        } else {
          for (var i = 0; i < alldogs.length; i++) {
            if (alldogs[i].temperamentos.includes(action.payload))
              filterdogs.push(alldogs[i]);
          }
          filterbytemp = action.payload;
        }
        return { ...state, filterdogs: filterdogs, filterbytemp };
      }

    case "filterorigin":
      if (state.filterbytemp !== "") {
        let filteredList = [...state.dogs];
        let filterbyorigin = "";
        switch (action.payload) {
          case "ALL":
            return {
              ...state,
              filterdogs: filteredList.filter((e) =>
                e.temperamentos.includes(state.filterbytemp)
              ),
              filterbyorigin
            };
          case "DB":
            console.log('temp seleccionado y origen DB')
            filteredList = filteredList.filter((dog) =>
              dog.ID.toString().includes("-")
            );
            filterbyorigin = "DB";
            break;
          case "API":
            console.log('temp seleccionado y origen API')
            filteredList = filteredList.filter(
              (dog) => !dog.ID.toString().includes("-")
            );
            filterbyorigin = "API";
            break;
          default:
            break;
        }
        return {
          ...state,
          filterdogs: filteredList.filter((e) =>
            e.temperamentos.includes(state.filterbytemp)
          ),
          filterbyorigin,
        };
      } else {
        let filteredList = [...state.dogs];
        let filterbyorigin = "";
        switch (action.payload) {
          case "ALL":
            return { ...state, filterdogs: filteredList };
          case "DB":
            filteredList = filteredList.filter((dog) =>
              dog.ID.toString().includes("-")
            );
            filterbyorigin = "DB";
            break;
          case "API":
            filteredList = filteredList.filter(
              (dog) => !dog.ID.toString().includes("-")
            );
            filterbyorigin = "API";
            break;
          default:
            break;
        }
        return { ...state, filterdogs: filteredList, filterbyorigin };
      }
      case "getDetails":
        console.log(action.payload)
        return{...state,dogsdetail:action.payload}
        



    default:
      return {
        ...state,
      };
  }
}
