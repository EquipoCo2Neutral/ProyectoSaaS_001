import { Test, TestingModule } from '@nestjs/testing';
import { GrupoEnergeticoService } from './grupo-energetico.service';

describe('GrupoEnergeticoService', () => {
  let service: GrupoEnergeticoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GrupoEnergeticoService],
    }).compile();

    service = module.get<GrupoEnergeticoService>(GrupoEnergeticoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
