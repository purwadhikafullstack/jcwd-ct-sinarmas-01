require("dotenv/config");
const opencage = require("opencage-api-client");
const { models } = require("../models");
const { Addresses } = models;

const addressController = {
  /**
   * @param {string} q
   * */
  searchGeo: async function (q) {
    const data = await opencage.geocode({ q });
    return data.results;
  },
  /**
   * Menambah alamat baru
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  newAddress: async function (req, res) {
    try {
      const { q } = req.body;
      const [place] = await this.searchGeo(q);
      const address = await Addresses.create({
        address_name: place.formatted,
        city: place.components?.city || place.components?.county,
        province: place.components.state,
        geolocation: q,
      });
      return res
        .status(201)
        .json({ message: "Successfully Added Address", address });
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
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  removeAddress: async function (req, res) {
    try {
      const { address_id } = req.params;
      const address = await Addresses.destroy({ where: { id: address_id } });
      return res.status(200).json({ message: "Address deleted", address });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  editAddress: async function (req, res) {
    try {
      const { address_id } = req.params;
      const { address_name } = req.body;
      await Addresses.update({ address_name }, { where: { address_id } });
      return res.status(200).json({ message: "Address Updated" });
    } catch (e) {
      console.log(e);
      return res
        .status(e.statusCode || 500)
        .json({ message: e.message, err: e });
    }
  },
};

module.exports = addressController;
