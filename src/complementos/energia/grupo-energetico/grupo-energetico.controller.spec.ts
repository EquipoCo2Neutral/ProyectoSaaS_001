import { Test, TestingModule } from '@nestjs/testing';
import { GrupoEnergeticoController } from './grupo-energetico.controller';
import { GrupoEnergeticoService } from './grupo-energetico.service';

describe('GrupoEnergeticoController', () => {
  let controller: GrupoEnergeticoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GrupoEnergeticoController],
      providers: [GrupoEnergeticoService],
    }).compile();

    controller = module.get<GrupoEnergeticoController>(GrupoEnergeticoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
