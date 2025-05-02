import { Test, TestingModule } from '@nestjs/testing';
import { GeneracionService } from './generacion.service';

describe('GeneracionService', () => {
  let service: GeneracionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneracionService],
    }).compile();

    service = module.get<GeneracionService>(GeneracionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
