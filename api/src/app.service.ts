import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class AppService {

  constructor(private readonly pool:Pool){}

  getHello(): string {
    return (
      `/health: verify if API is on with database connected\n
       /setcheck/:cpf: receipts the CPF number, consults the cadaster and put in the checkin list\n
       /getchecklist: returns the list of the registered checkins\n
       `);
  }

  async health(): Promise<string> {
    const result = await this.pool.query('SELECT NOW()');
    return `API on. Connected to Postgres at: ${result.rows[0].now}`;
  }  
}
