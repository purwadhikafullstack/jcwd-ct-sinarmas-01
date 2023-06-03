require("dotenv/config");
const opencage = require("opencage-api-client");
const { models } = require("../models");
const { Addresses } = models;

async function fromCoordinates(q) {
  const data = await opencage.geocode({ q });
  console.log(data);
  return data.results[0];
}

async function search(q) {
  const data = await opencage.geocode({ q });
  return data.results;
}

const addressController = {
  /**
   * Menambah alamat baru
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  newAddress: async function (req, res) {
    try {
      const { q } = req.body;
      const place = await fromCoordinates(q);
      const address = await Addresses.create({
        address_name: place.formatted,
        city: place.components.city,
        province: place.components.state,
        geolocation: q,
      });
      return res.status(201).json({ message: "Successfully Added Address", address });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  /**
   * Melihat daftar alamat yang telah ada di database
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  listAddresses: async function (req, res) {
    try {
      const addresses = await Addresses.findAndCountAll();
      return res.status(200).json(addresses);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  /**
   * 
   * @param {import("express").Request} req 
   * @param {import("express").Response} res 
   * @returns 
   */
  searchLocation: async function (req, res) {
    try {
      const { q } = req.body;
      /** @type {any[]} */
      const results = await search(q);
      return res.status(200).json({ count: results.length, results });
    } 
    catch (error) {
      return res.status(500).json(error);  
    }
  }
};

module.exports = addressController;
