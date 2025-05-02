import { Test, TestingModule } from '@nestjs/testing';
import { EnergeticosService } from './energeticos.service';

describe('EnergeticosService', () => {
  let service: EnergeticosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnergeticosService],
    }).compile();

    service = module.get<EnergeticosService>(EnergeticosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
