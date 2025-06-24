import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { ProcesoService } from 'src/gestor/proceso/proceso.service';
import { ResumenTransaccionService } from '../../registro/resumen-transaccion/resumen-transaccion.service';

const fs = require('fs');
const PDFDocument = require('pdfkit-table');

@Injectable()
export class PdfService {
  constructor(
    private readonly procesoService: ProcesoService,
    private readonly resumenTransaccionService: ResumenTransaccionService,
  ) {}

  async generarPDF1(idProceso: string): Promise<Buffer> {
    const proceso = await this.procesoService.findByProceso(idProceso);

    if (!proceso || !proceso.planta || !proceso.planta.inquilino) {
      throw new Error(
        'No se encontró información suficiente del proceso, planta o inquilino.',
      );
    }

    // Obtener datos de registros energéticos
    const conteoRegistros =
      await this.resumenTransaccionService.getConteoIdRegistrosDesdeResumenes(
        [proceso.planta.idPlanta],
        [idProceso],
      );

    const pdfBuffer: Buffer = await new Promise((resolve) => {
      const doc = new PDFDocument({
        size: 'LETTER',
        margin: 50,
        autoFirstPage: false,
      });

      // Función para índice de páginas y encabezado
      let pageNumber = 0;
      doc.on('pageAdded', () => {
        pageNumber++;

        if (pageNumber > 1) {
          // Logo en encabezado
          doc.image(
            join(process.cwd(), '/img/Logo1.png'),
            doc.page.width - 100,
            5,
            { fit: [45, 45], align: 'center' },
          );

          // Título de planta y año en encabezado
          doc
            .font('Helvetica-Bold')
            .fontSize(12)
            .text(`${proceso.planta.nombre} - ${proceso.año_proceso}`, 50, 20);

          // Línea divisoria
          doc
            .moveTo(50, 55)
            .lineTo(doc.page.width - 50, 55)
            .stroke();

          // Número de página
          let bottom = doc.page.margins.bottom;
          doc.page.margins.bottom = 0;
          doc.text(
            'Pag. ' + pageNumber,
            (doc.page.width - 100) * 0.5,
            doc.page.height - 50,
            {
              width: 100,
              align: 'center',
              lineBreak: false,
            },
          );
          doc.page.margins.bottom = bottom;
        }
      });

      // Agregar página de portada
      doc.addPage();

      // Logo centrado
      const logoPath = join(process.cwd(), '/img/Logo1.png');
      if (fs.existsSync(logoPath)) {
        const imgWidth = 250;
        const xPos = (doc.page.width - imgWidth) / 2;
        doc.image(logoPath, xPos, 100, { width: imgWidth });
      }

      doc.moveDown(20);

      // Título central
      doc
        .font('Helvetica-Bold')
        .fontSize(24)
        .text('Resumen Encuesta Terminada', { align: 'center' });

      doc.moveDown(3);

      // Información principal
      doc
        .font('Helvetica-Bold')
        .fontSize(18)
        .text(proceso.planta.inquilino.nombreInquilino, { align: 'center' });

      doc.moveDown(1.5);

      doc
        .font('Helvetica-Bold')
        .fontSize(18)
        .text(proceso.planta.nombre, { align: 'center' });

      doc.moveDown(1.5);

      doc
        .font('Helvetica-Bold')
        .fontSize(18)
        .text(String(proceso.año_proceso), { align: 'center' });

      // Fecha de emisión
      const currentDate = new Date();
      const fechaFormateada = currentDate.toLocaleDateString('es-CL');
      doc.moveDown(6);
      doc
        .font('Helvetica')
        .fontSize(14)
        .text(`Emitido el ${fechaFormateada}`, { align: 'center' });

      // Página de resumen energético
      doc.addPage();

      // Título de sección
      doc
        .font('Helvetica-Bold')
        .fontSize(18)
        .text('Resumen de Registros Energéticos', { align: 'center' });

      doc.moveDown(1);

      // Descripción
      doc
        .font('Helvetica')
        .fontSize(12)
        .text(
          'Este documento representa un resumen de todas las actividades energéticas de la empresa en el periodo seleccionado.',
          {
            align: 'justify',
            lineGap: 5,
          },
        );

      doc.moveDown(2);

      // Subtítulo
      doc
        .font('Helvetica-Bold')
        .fontSize(14)
        .text('Resumen de Registros', { underline: true });

      doc.moveDown(1);

      doc
        .font('Helvetica')
        .fontSize(12)
        .text(
          'Esta sección representa todos los movimientos energéticos de la organización en los distintos tipos de registro.',
          {
            lineGap: 5,
          },
        );

      doc.moveDown(2);

      // Mapear los tipos de registro
      const tiposRegistro = {
        1: 'ADQUISICIONES',
        2: 'GENERACIONES',
        3: 'TRANSFORMACIONES',
        4: 'USOS FINALES',
        5: 'VENTAS DE ELECTRICIDAD',
        6: 'VENTAS DE ENERGÉTICOS',
        7: 'EXPORTACIONES',
      };

      // Preparar datos para la tabla
      const tableData = Object.entries(tiposRegistro).map(([id, nombre]) => {
        const registro = conteoRegistros.find(
          (r) => r.idRegistro === parseInt(id),
        );
        return [nombre, registro ? registro.total : '0'];
      });

      // Crear tabla
      const table = {
        headers: ['Tipo de Registro', 'Total'],
        rows: tableData,
      };

      // Añadir tabla al documento
      doc.table(table, {
        prepareHeader: () => doc.font('Helvetica-Bold').fontSize(12),
        prepareRow: (row, i) => doc.font('Helvetica').fontSize(10),
        width: doc.page.width - 100,
        x: 50,
      });

      // Finalizar documento
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
