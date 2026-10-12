import 'dotenv/config'
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Pool } from 'pg';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
              provide: Pool,
              useFactory: ()=>
                new Pool({
                  connectionString:process.env.DATABASE_URL
                })
            }
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });


  describe('/ (GET) ', () => {
    it('should return a list with the endpoints', async () => {
        expect(await appController.getHello())
          .toBe(
      `<pre>
       \n
       /health: verify if API is on with database connected\n
       /setcheck/:cpf: receipts the CPF number, consults the cadaster and put in the checkin list\n
       /getchecklist: returns the list of the registered checkins\n
       </pre>
       `);
      });
  });

  describe('/health (GET)', () => {
    it('should return a positive message with a postgres connection information', async () => {
      expect(await appController.health())
      .toMatch(/^API on\. Connected to Postgres at: /)
    })
  });

  describe('/setcheck/:cpf (POST)', () => {
    it('should return a positive message with a postgres connection information', async () => {
      expect(await appController.setcheck("11111111111"))
      .not.toBeNull();
      expect(typeof await appController.setcheck("11111111111"))
      .toBe('object');
    })
  });

  describe('/getchecklist (GET)', () => {
    it('should return a positive message with a postgres connection information', async () => {
      expect(await appController.getchecklist())
      .not.toBeNull();
      expect(typeof await appController.setcheck("11111111111"))
      .toBe('object');
    })
  });
});

