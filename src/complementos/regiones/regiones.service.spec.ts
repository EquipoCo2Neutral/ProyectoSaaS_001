import { Test, TestingModule } from '@nestjs/testing';
import { RegionesService } from './regiones.service';

describe('RegionesService', () => {
  let service: RegionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegionesService],
    }).compile();

    service = module.get<RegionesService>(RegionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
