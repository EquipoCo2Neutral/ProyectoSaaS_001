import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { PdfController } from './pdf.controller';
import { ProcesoModule } from 'src/gestor/proceso/proceso.module';

@Module({
  imports: [ProcesoModule],
  controllers: [PdfController],
  providers: [PdfService],
})
export class PdfModule {}
