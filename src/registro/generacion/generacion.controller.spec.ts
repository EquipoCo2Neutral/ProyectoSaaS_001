import { Test, TestingModule } from '@nestjs/testing';
import { GeneracionController } from './generacion.controller';
import { GeneracionService } from './generacion.service';

describe('GeneracionController', () => {
  let controller: GeneracionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeneracionController],
      providers: [GeneracionService],
    }).compile();

    controller = module.get<GeneracionController>(GeneracionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
