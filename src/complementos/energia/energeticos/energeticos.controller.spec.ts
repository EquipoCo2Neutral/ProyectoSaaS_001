import { Test, TestingModule } from '@nestjs/testing';
import { EnergeticosController } from './energeticos.controller';
import { EnergeticosService } from './energeticos.service';

describe('EnergeticosController', () => {
  let controller: EnergeticosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnergeticosController],
      providers: [EnergeticosService],
    }).compile();

    controller = module.get<EnergeticosController>(EnergeticosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
