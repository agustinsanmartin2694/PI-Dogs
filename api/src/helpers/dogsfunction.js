const { Dog,Temperament } = require("../db");
const { API_KEY } = process.env;
const axios = require("axios");

async function getDBdogs() {
  try {
    // console.log (Dog)
    const info = await Dog.findAll({
      include: {
        model: Temperament,
        attributes: ["nombre"],
        through: {
          attributes: [],
        },
      },
    });
    const puppies = info?.map((d) => {
      return {
        ID: d.ID,
        nombre: d.nombre,
        edadestimada: d.edadestimada,
        altura: d.altura,
        peso: d.peso,
        imagen: d.imagen,
        temperamentos: d.temperaments?.map((d) => d.nombre),
      };
    });
    return puppies;
  } catch (error) {
    throw Error(error);
  }
}

async function getAPIdogs() {
  try {
    const info = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );
    const puppies = info.data?.map((d) => {
      return {
        ID: d.id,
        nombre: d.name,
        edadestimada: d.life_span,
        altura: d.height.metric,
        peso: d.weight.metric,
        imagen: d.image.url,
        temperamentos:d.temperament? d.temperament.split(', ') : 'No hay temperamentos registrados'
      };
    });

    //console.log(puppies)
    return puppies;
  } catch (error) {
    throw Error(error);
  }
}
async function getalldogs() {
  try {
    const dbdogs = await getDBdogs();

    const apidogs = await getAPIdogs();

    return apidogs.concat(dbdogs);
  } catch (error) {
    throw Error(error);
  }
}
async function getdogsbyname(name) {
  try {
    const info = await getalldogs();
    console.log(info.map((a) => a.nombre?.toLowerCase()));

    const same = info.filter((a) =>
      a.nombre?.toLowerCase().includes(name.toLowerCase())
    );

    return same;
  } catch (error) {
    throw Error(error);
  }
}
async function getdogbyid(idRaza) {
  try {
    const alldogs = await getalldogs();
    const dogid = await alldogs.find((d) => d.ID.toString() === idRaza);
    if (!dogid) {
      throw Error("id inexistente");
    } else return dogid;
  } catch (error) {
    throw Error(error);
  }
}

async function postdogs({nombre,edadestimada,altura,peso,temperamentos,imagen}) {
  try {
    const post = await Dog.create({nombre,edadestimada,altura,peso,imagen});

    for (const tem of temperamentos) {
      const [temper, created] = await Temperament.findOrCreate({ where: { nombre: tem } });
      console.log(temper)
      if (created) {
        console.log(`Se creó un nuevo modelo de Temperament con nombre ${temper.nombre}`);
      } else {
        console.log(`Se encontró un modelo de Temperament existente con nombre ${temper.nombre}`);
      }
      await post.addTemperament(temper);
    }

    const pos = await Dog.findOne({
      where: { nombre },
      include: {
        model: Temperament,
        attributes: ['nombre'],
        through: {
          attributes: [],
        },
      },
    });

    return pos;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

module.exports = { getalldogs, getdogsbyname, getdogbyid ,postdogs};
