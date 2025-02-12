import connection from '../../database/connection';

class IncidentController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const [count] = await connection('incidents').select('*').count();

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf',
      ]);

    res.header('X-Total-Count', count['count(*)']);

    return res.json(incidents);
  }

  async store(req, res) {
    const ong_id = req.headers.authorization;
    const { title, description, price } = req.body;

    const [id] = await connection('incidents').insert({
      title,
      description,
      price,
      ong_id,
    });

    return res.json({ id });
  }

  async delete(req, res) {
    const ong_id = req.headers.authorization;
    const { id } = req.params;

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

    if (incident.ong_id !== ong_id) {
      return res
        .status(401)
        .json({ error: "You don't have permission for this" });
    }

    await connection('incidents').where('id', id).delete();

    return res.status(204).send();
  }
}

export default new IncidentController();
