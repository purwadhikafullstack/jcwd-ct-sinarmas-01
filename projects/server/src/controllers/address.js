require("dotenv/config");
const opencage = require("opencage-api-client");
const { models } = require("../models");
const { Addresses, AddressOwners } = models;

/**
 * @param {string} q
 * */
async function searchGeo (q) {
  const data = await opencage.geocode({ q, language: "id" });
  return data.results;
}

const addressController = {
  /**
   * Menambah alamat baru
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  newAddress: async (req, res) => {
    try {
      const { q, address_name = "", user_id } = req.body;
      const [place] = await searchGeo(q);
      const county = place.components?.county ? place.components?.county?.replace("Kabupaten ", "") : "";
      const address = await Addresses.create({
        address_name: address_name || place.formatted,
        city: place.components?.city || county,
        type: place.components?.city ? "Kota" : "Kabupaten",
        province: place.components.state,
        geolocation: q,
      });
      if (user_id) {
        await AddressOwners.create({
          user_id, address_id: address.id
        });
      }
      return res
        .status(201)
        .json({ message: "Successfully Added Address", ...address, user_id });
    } catch (error) {
      return res.status(500).json({ message: error.message, error });
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
      const results = await searchGeo(q);
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
      const { id } = req.params;
      const address = await Addresses.destroy({ where: { id } });
      return res.status(200).json({ message: "Address deleted", address });
    } catch (error) {
      return res.status(500).json({ message: error.message, error });
    }
  },
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  editAddress: async function (req, res) {
    try {
      const { id } = req.params;
      const { address_name, q } = req.body;
      // await Addresses.update({ address_name, geolocation: q }, { where: { id } });
      const address = await Addresses.findOne({ where: { id } });
      console.log(address);
      address.address_name = address_name || address.address_name;
      address.geolocation = q || address.geolocation;
      await address.save();
      return res.status(200).json({ message: "Address Updated" });
    } catch (e) {
      console.log(e);
      return res
        .status(e.statusCode || 500)
        .json({ message: e.message, err: e });
    }
  },
  getUserAddresses: async function (req, res) {
    try {
      const user_id = req.user?.id;
      const addresses = await AddressOwners.findAndCountAll({
        where: { user_id },
        include: ["address"]
      });

      return res.status(200).json({ message: "Fetch Success", ...addresses });
    } catch (e) {
      return res.status(500).json({ message: e.message, error: e });
    }
  },
  addressDetail: async function (req, res) {
    try {
      const { id } = req.params;
      const address = await Addresses.findOne({ where: { id } });
      return res.status(200).json({ message: "Fetch Success", ...address.dataValues });
    } catch (e) {
      return res.status(500).json({ message: e.message, error: e });
    }
  }
};

module.exports = {...addressController, searchGeo};
