import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { PdfService } from './pdf.service';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Get('pdf1/:idProceso')
  async generarPDF1(
    @Param('idProceso') idProceso: string,
    @Res() res: Response,
  ): Promise<void> {
    const buffer = await this.pdfService.generarPDF1(idProceso);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition':
        'attachment; filename="ResumenEncuestaFinalizada.pdf"',
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }
}
