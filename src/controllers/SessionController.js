const { connection } = require('../database/connection');

module.exports = {
    async store(req, res) {
        try {
            

            const { id } = req.body;
            const ong = await connection('ongs')
                .where("id", id)
                .select("name")
                .first();



            if (!ong) {
                return res.status(400).json({ error: "Nenhuma ong encontrada com esse ID" });
            }

            return res.status(200).json(ong);

        } catch (error) {
            return res.status(500).json(error);
        }

    }
}