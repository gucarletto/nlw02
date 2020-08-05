import { Request, Response } from 'express';
import connection from '../database/connection';

export default class ConnectionsController {
  async index(request: Request, response: Response) {
    const totalConnections = await connection('connections').count('* as total');
    console.log(totalConnections);

    const { total } = totalConnections[0];

    return response.json({
      total
    });
  };

  async create(request: Request, response: Response) {
    const { user_id } = request.body;

    const trx = await connection.transaction();

    try {
      const insertedIds = await trx('connections').insert({
        user_id
      }).returning('id');

      await trx.commit();

      return response.status(201).send();
    } catch(err) {
      await trx.rollback();
      return response.status(400).json({
        err
      });
    }
  };
}