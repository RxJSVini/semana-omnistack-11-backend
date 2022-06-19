const { connection } = require('../database/connection');
module.exports = {
    async store(req, res) {
        try {

            const { title, description, value } = req.body;
            const ong_id = req.headers.authorization;
            const result = await connection("incidentes").insert({
                title, description, value, ong_id
            })

            return res.status(201).send(result)

        } catch (error) {
            return res.status(500).json(error);
        }

    },
    async index(req, res) {
    

        try {
            const { page = 1 } = req.query;

            const [count] = await connection("incidentes").count();

            const incidents = await connection
                .from("incidentes")
                .join('ongs', 'ongs.id', '=', 'incidentes.ong_id')
                .limit(5)
                .offset((page - 1) * 5)
                .select([
                    'incidentes.*',
                    'ongs.name',
                    'ongs.email',
                    'ongs.whatsapp',
                    'ongs.city',
                    'ongs.uf'
                ])
               

            res.header('X-Total-Count', count['count(*)']);

            return res.json(incidents);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    async delete(req, res) {
        try {
            
            const { id } = req.params;
            const ong_id = req.headers.authorization;
            const incidente = await connection("incidentes")
                .where("id", id)
                .select("ong_id")
                .first();

                

            if (incidente.ong_id !== ong_id) {

                return res.status(401).json({ error: "Operação não permitida." })
            } else {
                await connection("incidentes").where("id", id).delete();
            }

            return res.status(204).send()
        } catch (error) {
            return res.status(500).json(error)
        }

    }
}