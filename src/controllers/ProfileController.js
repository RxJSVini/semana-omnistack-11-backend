const { connection } = require('../database/connection');
module.exports = {
    async index(req, res) {
        try {
            const ong_id = req.headers.authorization;
            const incidentes = await connection("incidentes")
                .where("ong_id", ong_id)
                .select("*");

            return res.status(200).json(incidentes)
        } catch (error) {
            return res.status(500).json(error)
        }

    }
}