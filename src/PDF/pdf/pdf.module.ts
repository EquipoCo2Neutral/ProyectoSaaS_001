import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { PdfController } from './pdf.controller';
import { ProcesoModule } from 'src/gestor/proceso/proceso.module';
import { ResumenTransaccionModule } from 'src/registro/resumen-transaccion/resumen-transaccion.module';

@Module({
  imports: [ProcesoModule, ResumenTransaccionModule],
  controllers: [PdfController],
  providers: [PdfService],
})
export class PdfModule {}
