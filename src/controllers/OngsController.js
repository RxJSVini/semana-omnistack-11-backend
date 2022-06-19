const crypto = require('crypto');
const { connection } = require('../database/connection');
const getUniqueId = require('../utils/generateUniqueId');

getUniqueId()


module.exports = {

    async store(req, res) {

        try {
            // const id = crypto.randomBytes(4).toString("HEX");

            const id = getUniqueId();

            const { name, email, whatsapp, city, uf } = req.body;

            await connection("ongs").insert({
                id, name, email, whatsapp, city, uf
            })

            return res.status(201).json({ id })
        } catch (error) {
            return res.status(500).json(error);
        }

    },
    async index(req, res) {
        try {
            const ongs = await connection.select("*").from("ongs");
            return res.status(200).json(ongs);
        } catch (error) {
            return res.status(500).json(error);
        }

    }
}