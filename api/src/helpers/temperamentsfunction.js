const { Temperament } = require("../db.js");
const axios = require("axios");
const { API_KEY } = process.env;

async function getalltemperaments() {
  try {
    const array = [];
    const apitemperaments = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );
    //console.log(apitemperaments)
    await apitemperaments.data?.map((d) => {
      const split = d.temperament?.split(", ");
      //console.log(split);
      split?.forEach((e) => {
        if (!array.includes(e)) array.push(e);
      });
    });

    array.map(
      async (e) => await Temperament.findOrCreate({ where: { nombre: e } })
    );
    return await Temperament.findAll()

  } catch (error) {
    throw Error(error);
  }
}
module.exports = getalltemperaments;
