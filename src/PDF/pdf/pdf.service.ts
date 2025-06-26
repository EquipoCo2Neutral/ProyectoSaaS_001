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
    //obtener datos de teracalorias totales
    const teraCalorias = await this.resumenTransaccionService.getTeraCalorias(
      [proceso.planta.idPlanta],
      [idProceso],
    );
    //obtener todos los movimientos de energéticos

    const movimientos =
      await this.resumenTransaccionService.getResumenTransaccionPorEnergetico(
        [proceso.planta.idPlanta],
        [idProceso],
      );

    //obtener la cantidad de energéticos

    const energeticos =
      await this.resumenTransaccionService.getEnergeticosAgrupadosTotales(
        [proceso.planta.idPlanta],
        [idProceso],
      );

    const energeticosSalidaYEntrada =
      await this.resumenTransaccionService.getEnergeticosAgrupadosEntradaSalida(
        [proceso.planta.idPlanta],
        [idProceso],
      );

    const resumenDetallado =
      await this.resumenTransaccionService.getResumenTransaccionPorEnergetico(
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
            .text(`${proceso.planta.nombre} - ${proceso.año_proceso}`, 50, 30);

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

      //---------- Agregar página 1 de portada---------------------//
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
      doc.moveDown();

      //---------- Agregar página 2 de información---------------------//

      doc.addPage();
      doc.text('', 50, 70);

      // Página de resumen energético
      // Descripción
      doc.moveDown(1);
      doc
        .font('Helvetica')
        .fontSize(12)
        .text(
          'Este documento representa un resumen de todas las actividades energéticas de la empresa en el periodo y planta seleccionado.',
          {
            align: 'justify',
            lineGap: 5,
          },
        );

      doc.moveDown(2);

      // Tabla N°1
      doc
        .font('Helvetica-Bold')
        .fontSize(14)
        .text('Información de la planta', { underline: false });

      doc.moveDown(1);

      const table2 = {
        headers: ['categoria', ''],
        rows: [
          ['Empresa', proceso.planta.inquilino.nombreInquilino],
          ['Nombre Planta', proceso.planta.nombre],
          ['Región', proceso.planta.comuna.region.nombre],
          ['Comuna', proceso.planta.comuna.nombre],
          ['Dirección', proceso.planta.direccion],
          [
            'Gestor Asignado',
            proceso.planta.usuario.personas[0].nombre +
              ' ' +
              proceso.planta.usuario.personas[0].primerApellido,
          ],
        ],
      };

      doc.table(table2, {
        prepareHeader: () => doc.font('Helvetica-Bold').fontSize(12),
        prepareRow: (row, i) => doc.font('Helvetica').fontSize(10),
        width: doc.page.width - 100,
        x: 50,
      });

      doc.moveDown(1);
      //Tabla N°2
      doc
        .font('Helvetica-Bold')
        .fontSize(14)
        .text('Resumen de Movimientos', { underline: false });

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

      doc.moveDown(1);

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

      //Tabla N°3
      doc
        .font('Helvetica-Bold')
        .fontSize(14)
        .text('Resumen General', { underline: false });

      doc.moveDown(1);

      const table3 = {
        headers: ['', 'Cantidad'],
        rows: [
          ['Cantidad de Movimientos', movimientos.length ?? 'No disponible'],
          ['Cantidad de Energéticos', energeticos.length ?? 'No disponible'],
          [
            'Teracalorias',
            teraCalorias[0]?.totalteraCalorias ?? 'No disponible',
          ],
        ],
      };

      doc.table(table3, {
        prepareHeader: () => doc.font('Helvetica-Bold').fontSize(12),
        prepareRow: (row, i) => doc.font('Helvetica').fontSize(10),
        width: doc.page.width - 100,
        x: 50,
      });

      doc.moveDown(1);

      //---------- Agregar página 3 de energéticos generales---------------------//

      doc.addPage();
      doc.text('', 50, 70);

      doc
        .font('Helvetica-Bold')
        .fontSize(14)
        .text('Resumen de Energéticos General', { underline: false });

      doc.moveDown(1);

      // Construir tabla de energéticos generales

      const tableEnergeticos = {
        headers: ['Energético', 'Entrada', 'Salida', 'Unidad'],
        rows: energeticosSalidaYEntrada.map((item) => [
          item.nombreEnergetico,
          item.totalCantidadEntrada,
          item.totalCantidadSalida,
          item.unidad?.split(' ')[0] ?? 'N/A',
        ]),
      };

      doc.table(tableEnergeticos, {
        columnsSize: [200, 150, 75, 75],

        prepareHeader: () => doc.font('Helvetica-Bold').fontSize(12),
        prepareRow: (row, i) => doc.font('Helvetica').fontSize(10),
        width: doc.page.width - 100,
        x: 50,
      });

      doc.moveDown(1);

      //---------- Agregar página 4 de energéticos detallado ---------------------//

      // 1.  función reutilizable para añadir encabezados
      const addPageHeader = (doc, isContinuation = false) => {
        pageNumber++;

        // Logo
        doc.image(
          join(process.cwd(), '/img/Logo1.png'),
          doc.page.width - 100,
          5,
          { fit: [45, 45], align: 'center' },
        );

        // Título planta y año
        doc
          .font('Helvetica-Bold')
          .fontSize(12)
          .text(`${proceso.planta.nombre} - ${proceso.año_proceso}`, 50, 30);

        // Línea divisoria
        doc
          .moveTo(50, 55)
          .lineTo(doc.page.width - 50, 55)
          .stroke();

        // Título de sección
        doc.y = 70;
        const title = isContinuation
          ? 'Resumen de Energéticos y Movimientos Detallado (continuación)'
          : 'Resumen de Energéticos y Movimientos Detallado';

        doc
          .font('Helvetica-Bold')
          .fontSize(14)
          .text(title, { underline: false });

        doc.moveDown(1);
      };

      // 2. Función para generar la tabla con paginación controlada
      const generateDetailedTable = (doc) => {
        const rowsPerPage = 30;
        let currentRow = 0;
        let currentPage = 0;

        while (currentRow < resumenDetallado.length) {
          if (currentPage > 0) {
            doc.addPage();
            doc.text('', 50, 70);
          }

          addPageHeader(doc, currentPage > 0);

          const pageRows = resumenDetallado.slice(
            currentRow,
            currentRow + rowsPerPage,
          );
          const tableData = {
            headers: ['Energético', 'Categoría', 'Entrada', 'Salida', 'Unidad'],
            rows: pageRows.map((item) => [
              item.nombreEnergetico ?? 'N/D',
              item.nombreCategoriaRegistro ?? 'N/D',
              Number(item.totalEntrada ?? 0).toLocaleString('es-CL'),
              Number(item.totalSalida ?? 0).toLocaleString('es-CL'),
              item.unidad?.split(' ')[0] ?? 'N/A',
            ]),
          };

          doc.table(tableData, {
            columnsSize: [150, 150, 70, 70, 80],
            prepareHeader: () => doc.font('Helvetica-Bold').fontSize(12),
            prepareRow: (row, i) => doc.font('Helvetica').fontSize(10),
            width: doc.page.width - 100,
            x: 50,
            padding: 5,
          });

          currentRow += rowsPerPage;
          currentPage++;
        }
      };

      doc.addPage();
      addPageHeader(doc);
      generateDetailedTable(doc);

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
