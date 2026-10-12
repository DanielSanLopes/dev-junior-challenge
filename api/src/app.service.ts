import { Injectable } from '@nestjs/common';
import { error } from 'console';
import { Pool } from 'pg';

@Injectable()
export class AppService {

  constructor(private readonly pool:Pool){}

  getHello(): string {
    return (
      `<pre>
       \n
       /health: verify if API is on with database connected\n
       /setcheck/:cpf: receipts the CPF number, consults the cadaster and put in the checkin list\n
       /getchecklist: returns the list of the registered checkins\n
       </pre>
       `);
  }

  async health(): Promise<string> {
    const result = await this.pool.query('SELECT NOW()');
    return `API on. Connected to Postgres at: ${result.rows[0].now}`;
  }
  
  async setcheck(cpf:string):Promise<any>{

    const verify_existence = await this.pool.query(
      'SELECT cpf FROM checkins WHERE cpf = $1',
      [cpf])

    if (verify_existence.rowCount != 0)
      return {
        status:409,
        error: "Conflict",
        message: "Já existe um chekin para este paciente",
      }

    let server
    if(process.env.PROD == '1'){
      server = process.env.CADASTRO_URL
    }else{
      server = 'http://localhost:4000'
    }
    console.log("CPF: ", cpf)
    const endpoint = "pacientes/"
    const response = await fetch(`${server}/${endpoint}${cpf}`)

    if (response.status == 404){
      return {
        status:404,
        error: "Not Found",
        message: (await response.json()).erro,
      }  
    }

    if (response.status != 200){
      return {
        status:500,
        error: "Internal server error",
        message: "Não foi possível concluir a solicitação",
      }
    } 
    
    const data = await response.json()
    console.log(data)

    const check = {
      cpf: data.cpf,
      nome: data.nome,
      dataNascimento: data.dataNascimento
    }
    
    const result_query = await this.pool.query(
      `INSERT INTO checkins (cpf, nome, "dataNascimento")
      VALUES ($1, $2, $3) RETURNING *`,
      [check.cpf, check.nome, check.dataNascimento]
    )

    if(result_query.rows[0] == null || result_query.rows[0] == undefined)
      return {
        status:500,
        error: "Internal server error",
        message: "Não foi possível concluir a solicitação",
      }
    else
      return {
        status:201,
        error: null,
        message: "Registro criado com sucesso",
      }  
  }

  async getchecklist():Promise<object|any[]>{
    const checklist = await this.pool.query(`SELECT * FROM checkins ORDER BY "horaCheckin"`)

    if(checklist.rowCount == null && checklist.rowCount == undefined)
      return{
        status:500,
        error: "Internal server error",
        message: "Não foi possível concluir a solicitação",
      }
    
    if(checklist.rowCount == 0)
      return{
        status:404,
        error: "Not Found",
        message: "Não há nenhum checkin registrado",
      }

    console.log(checklist.rows)

    return checklist.rows
  }
}
