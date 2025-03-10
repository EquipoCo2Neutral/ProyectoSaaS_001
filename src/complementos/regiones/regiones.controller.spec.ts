import { Test, TestingModule } from '@nestjs/testing';
import { RegionesController } from './regiones.controller';
import { RegionesService } from './regiones.service';

describe('RegionesController', () => {
  let controller: RegionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegionesController],
      providers: [RegionesService],
    }).compile();

    controller = module.get<RegionesController>(RegionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
