import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { ProcesoService } from 'src/gestor/proceso/proceso.service';

const fs = require('fs');
const PDFDocument = require('pdfkit-table');

@Injectable()
export class PdfService {
  constructor(private readonly procesoService: ProcesoService) {}

  async generarPDF1(idProceso: string): Promise<Buffer> {
    const proceso = await this.procesoService.findByProceso(idProceso);

    if (!proceso || !proceso.planta || !proceso.planta.inquilino) {
      throw new Error(
        'No se encontró información suficiente del proceso, planta o inquilino.',
      );
    }

    const pdfBuffer: Buffer = await new Promise((resolve) => {
      const doc = new PDFDocument({
        size: 'LETTER',
        margin: 50,
        autoFirstPage: false,
      });

      // Agregar página de portada
      doc.addPage();

      // Logo (ajusta este path a la imagen final si quieres cambiar el logo)
      const logoPath = join(process.cwd(), '/img/Logo1.png');
      if (fs.existsSync(logoPath)) {
        doc.image(logoPath, doc.page.width / 2 - 75, 100, { width: 150 });
      }

      // Espacio entre logo y texto
      doc.moveDown(7);

      // Título central
      doc
        .font('Helvetica-Bold')
        .fontSize(24)
        .text('Resumen Encuesta Terminada', {
          align: 'center',
        });

      doc.moveDown(3);

      // Información principal centrada con más espacio
      doc
        .font('Helvetica-Bold')
        .fontSize(18)
        .text(proceso.planta.inquilino.nombreInquilino, {
          align: 'center',
        });

      doc.moveDown(1.5);

      doc
        .font('Helvetica-Bold')
        .fontSize(18)
        .text(`Planta ${proceso.planta.nombre}`, {
          align: 'center',
        });

      doc.moveDown(1.5);

      doc
        .font('Helvetica-Bold')
        .fontSize(18)
        .text(String(proceso.año_proceso), {
          align: 'center',
        });

      // Fecha actual centrada en la parte inferior
      const currentDate = new Date();
      const day = currentDate.getDate().toString().padStart(2, '0');
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const year = currentDate.getFullYear();
      const fechaFormateada = `${day}-${month}-${year}`;

      doc.moveDown(6);
      doc.font('Helvetica').fontSize(14).text(`${fechaFormateada}`, {
        align: 'center',
      });

      // Finalizar y devolver el buffer
      const buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const finalBuffer = Buffer.concat(buffers);
        resolve(finalBuffer);
      });

      doc.end();
    });

    return pdfBuffer;
  }
}
