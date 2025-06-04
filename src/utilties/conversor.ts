type DatosEnergeticos = {
  idEnergetico: number;
  idUnidad: number;
  cantidad: number;
  poderCalorifico: number | null;
  humedad: number | null;
};

export const conversorTcal = async (
  datos: DatosEnergeticos,
): Promise<{ cantidadTcal: number; cantidadGeneral: number; unidadGeneral:number } | null> => {
  switch (datos.idEnergetico) {
    // COQUE METALÚRGICO (id: 1)
    case 1:
      switch (datos.idUnidad) {
        case 1: // m3
          if (datos.poderCalorifico) {
            const cantidadPoderCalorfico =
              (datos.cantidad * 800 * datos.poderCalorifico) / 1e9; // Convertir a Tcal;
            return {
              cantidadTcal: cantidadPoderCalorfico,
              cantidadGeneral: datos.cantidad * 800, // Convertir m3 a kg (1 m3 de coque = 800 kg)
              unidadGeneral: 2, // kg
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 0.0056, // 1 m3 de coque metalúrgico = 0.0056 Tcal ;7000 de PC
              cantidadGeneral: datos.cantidad * 800, // Convertir m3 a kg (1 m3 de coque = 800 kg)
              unidadGeneral: 2, // kg
            };
          }

        case 2: // kg
          if (datos.poderCalorifico) {
            const cantidadPoderCalorfico =
              (datos.cantidad * datos.poderCalorifico) / 1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorfico,
              cantidadGeneral: datos.cantidad,
              unidadGeneral: 2, // kg
            };
          }
          return {
            cantidadTcal: datos.cantidad * 0.000007,
            cantidadGeneral: datos.cantidad,
            unidadGeneral: 2, // kg
          };

        case 3: // ton
          if (datos.poderCalorifico) {
            const cantidadPoderCalorfico =
              (datos.cantidad * 1000 * datos.poderCalorifico) / 1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorfico,
              cantidadGeneral: datos.cantidad * 1000, // pasar a kg
              unidadGeneral: 2, // kg
            };
          }
          return {
            cantidadTcal: datos.cantidad * 0.007,
            cantidadGeneral: datos.cantidad * 1000, // pasar a kg
            unidadGeneral: 2, // kg
          };
        default:
          return null;
      }

    // GAS COQUE (id: 2)
    case 2:
      switch (datos.idUnidad) {
        case 4: // Gcal
          return {
            cantidadTcal: datos.cantidad * 0.001,
            cantidadGeneral: datos.cantidad / 4.4,
            unidadGeneral: 5, // m3
          };
        case 5: // m3
          if (datos.poderCalorifico) {
            const cantidadPoderCalorfico =
              (datos.cantidad * datos.poderCalorifico) / 1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorfico,
              cantidadGeneral: datos.cantidad, // m3 ya está en la unidad correcta
              unidadGeneral: 5, // m3
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 0.0000048,
              cantidadGeneral: datos.cantidad,
              unidadGeneral: 5, // m3
            };
          }
        case 6: // MMm3
          if (datos.poderCalorifico) {
            const cantidadPoderCalorfico =
              (datos.cantidad * datos.poderCalorifico) / 1e3; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorfico,
              cantidadGeneral: datos.cantidad * 1e6, // pasar a m3
              unidadGeneral: 5, // m3
            };
          }
          return {
            cantidadTcal: datos.cantidad * 4.8,
            cantidadGeneral: datos.cantidad * 1e6, // pasar a m3
            unidadGeneral: 5, // m3
          };
        default:
          return null;
      }

    // ALQUITRÁN (id: 3)
    case 3:
      switch (datos.idUnidad) {
        case 7: //Mm3
          return {
            cantidadTcal: (datos.cantidad * 8700 * 1000000) / 1e9,
            cantidadGeneral: datos.cantidad,
            unidadGeneral: 7, // Mm3
          };
        default:
          return null; // No hay conversión definida para ALQUITRÁN
      }

    // GASOLINA 93 (id: 4)
    case 4:
      switch (datos.idUnidad) {
        case 8: // Lts
          if (datos.poderCalorifico) {
            const cantidadPoderCalorfico =
              datos.cantidad * 0.73 * datos.poderCalorifico * 1e-9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorfico,
              cantidadGeneral: datos.cantidad / 1000, // pasar a m3
              unidadGeneral: 9, // m3
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 0.00000817, // 11.200 PC
              cantidadGeneral: datos.cantidad / 1000, // pasar a m3
              unidadGeneral: 9, // m3
            };
          }
        case 9: // m3
          if (datos.poderCalorifico) {
            const cantidadPoderCalorfico =
              datos.cantidad * 0.73 * datos.poderCalorifico * 1e-6; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorfico,
              cantidadGeneral: datos.cantidad,
              unidadGeneral: 9, // m3
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 0.008176, // 11.200
              cantidadGeneral: datos.cantidad, // m3 ya está en la unidad correcta
              unidadGeneral: 9, // m3
            };
          }
        case 10: // Mm3
          if (datos.poderCalorifico) {
            const cantidadPoderCalorfico =
              datos.cantidad * 0.73 * datos.poderCalorifico * 1e-3; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorfico,
              cantidadGeneral: datos.cantidad * 1000, // pasar a m3
              unidadGeneral: 9, // m3
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 8.176,
              cantidadGeneral: datos.cantidad * 1000, // pasar a m3
              unidadGeneral: 9, // m3
            };
          }
        default:
          return null;
      }

    // GASOLINA 95 (id: 5)
    case 5:
      switch (datos.idUnidad) {
        case 11: // Lts
          if (datos.poderCalorifico) {
            const cantidadPoderCalorfico =
              datos.cantidad * 0.73 * datos.poderCalorifico * 1e-9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorfico,
              cantidadGeneral: datos.cantidad / 1000, // pasar a m3
              unidadGeneral: 12, // m3
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 0.00000817, // 11.200 PC
              cantidadGeneral: datos.cantidad / 1000, // pasar a m3
              unidadGeneral: 12, // m3
            };
          }
        case 12: // m3
          if (datos.poderCalorifico) {
            const cantidadPoderCalorfico =
              datos.cantidad * 0.73 * datos.poderCalorifico * 1e-6; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorfico,
              cantidadGeneral: datos.cantidad,
              unidadGeneral: 12, // m3
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 0.008176, // 11.200
              cantidadGeneral: datos.cantidad, // m3 ya está en la unidad correcta
              unidadGeneral: 12, // m3
            };
          }
        case 13: // Mm3
          if (datos.poderCalorifico) {
            const cantidadPoderCalorfico =
              datos.cantidad * 0.73 * datos.poderCalorifico * 1e-3; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorfico,
              cantidadGeneral: datos.cantidad * 1000, // pasar a m3
              unidadGeneral: 12, // m3
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 8.176,
              cantidadGeneral: datos.cantidad * 1000, // pasar a m3
              unidadGeneral: 12, // m3
            };
          }
        default:
          return null;
      }

    // GASOLINA 97 (id: 6)
    case 6:
      switch (datos.idUnidad) {
        case 14: // Mm3
          if (datos.poderCalorifico) {
            const cantidadPoderCalorfico =
              datos.cantidad * 0.73 * datos.poderCalorifico * 1e-9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorfico,
              cantidadGeneral: datos.cantidad * 1000, // pasar a m3
              unidadGeneral: 15, // m3
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 0.00000817, // 11.200 PC
              cantidadGeneral: datos.cantidad * 1000, // pasar a m3
              unidadGeneral: 15, // m3
            };
          }
        case 15: // m3
          if (datos.poderCalorifico) {
            const cantidadPoderCalorfico =
              datos.cantidad * 0.73 * datos.poderCalorifico * 1e-6; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorfico,
              cantidadGeneral: datos.cantidad,
              unidadGeneral: 15, // m3
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 0.008176, // 11.200
              cantidadGeneral: datos.cantidad, // m3 ya está en la unidad correcta
              unidadGeneral: 15, // m3
            };
          }
        case 16: // Lts
          if (datos.poderCalorifico) {
            const cantidadPoderCalorfico =
              datos.cantidad * 0.73 * datos.poderCalorifico * 1e-3; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorfico,
              cantidadGeneral: datos.cantidad / 1000, // pasar a m3
              unidadGeneral: 15, // m3
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 8.176,
              cantidadGeneral: datos.cantidad / 1000, // pasar a m3
              unidadGeneral: 15, // m3
            };
          }
        default:
          return null;
      }

    // GASOLINA AVIACIÓN (id: 7)
    case 7:
      switch (datos.idUnidad) {
        case 17: // Lts
          if (datos.poderCalorifico) {
            const cantidadPoderCalorfico =
              datos.cantidad * 0.0007 * ((datos.poderCalorifico * 1000) / 1e9); // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorfico,
              cantidadGeneral: datos.cantidad / 1000, // pasar a m3
              unidadGeneral: 18, // m3
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 0.00000798, // 11.400 PC
              cantidadGeneral: datos.cantidad / 1000, // pasar a m3
              unidadGeneral: 18, // m3
            };
          }
        case 18: // m3
          if (datos.poderCalorifico) {
            const cantidadPoderCalorfico =
              datos.cantidad * 0.7 * datos.poderCalorifico * 1e-6; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorfico,
              cantidadGeneral: datos.cantidad, // m3 ya está en la unidad correcta
              unidadGeneral: 18, // m3
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 0.00798, // 11.400 PC
              cantidadGeneral: datos.cantidad, // m3 ya está en la unidad correcta
              unidadGeneral: 18, // m3
            };
          }
        case 19: // Mm3
          if (datos.poderCalorifico) {
            const cantidadPoderCalorifico =
              datos.cantidad * 1000 * 0.7 * datos.poderCalorifico * 1e-3; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad * 1000, // pasar a m3
              unidadGeneral: 18, // m3
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 7.98, // 11.400 PC
              cantidadGeneral: datos.cantidad * 1000, // pasar a m3
              unidadGeneral: 18, // m3
            };
          }
        default:
          return null;
      }

    // BIODIÉSEL (id: 8)
    case 8:
      switch (datos.idUnidad) {
        case 20: // m3
          if (datos.poderCalorifico && datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad *
                (datos.poderCalorifico * (1 - datos.humedad / 100)) *
                1000 *
                0.88) /
              1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad,
              unidadGeneral: 20, // m3
            };
          }
          if (datos.humedad && !datos.poderCalorifico) {
            const cantidadPoderCalorifico =
              (datos.cantidad *
                (9000 * (1 - datos.humedad / 100)) *
                1000 *
                0.88) /
              1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad,
              unidadGeneral: 20, // m3
            };
          }
          if (datos.poderCalorifico && !datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad * datos.poderCalorifico * 1000 * 0.88) / 1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad,
              unidadGeneral: 20, // m3
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 0.00792, // 9.000 PC
              cantidadGeneral: datos.cantidad, // m3 ya está en la unidad correcta
              unidadGeneral: 20, // m3
            };
          }
        case 21: // Mm3
          if (datos.poderCalorifico && datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad *
                1000 *
                (datos.poderCalorifico * (1 - datos.humedad / 100)) *
                1000 *
                0.88) /
              1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad * 1000, // pasar a m3
              unidadGeneral: 20, // m3
            };
          }
          if (datos.humedad && !datos.poderCalorifico) {
            const cantidadPoderCalorifico =
              (datos.cantidad *
                1000 *
                (9000 * (1 - datos.humedad / 100)) *
                1000 *
                0.88) /
              1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad * 1000, // pasar a m3
              unidadGeneral: 20, // m3
            };
          }
          if (datos.poderCalorifico && !datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad * 1000 * datos.poderCalorifico * 1000 * 0.88) /
              1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad * 1000, // pasar a m3
              unidadGeneral: 20, // m3
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 0.00792, // 9.000 PC
              cantidadGeneral: datos.cantidad * 1000, // pasar a m3
              unidadGeneral: 20, // m3
            };
          }
        case 22: // ton
          if (datos.poderCalorifico && datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad *
                1000 *
                (datos.poderCalorifico * (1 - datos.humedad / 100))) /
              1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad * 1.136, // pasar a m3
              unidadGeneral: 20, // m3
            };
          }
          if (datos.humedad && !datos.poderCalorifico) {
            const cantidadPoderCalorifico =
              (datos.cantidad * 1000 * (9000 * (1 - datos.humedad / 100))) /
              1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad * 1.136, // pasar a m3
              unidadGeneral: 20, // m3
            };
          }
          if (datos.poderCalorifico && !datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad * 1000 * datos.poderCalorifico) / 1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad * 1.136, // pasar a m3
              unidadGeneral: 20, // m3
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 0.009, // 9.000 PC
              cantidadGeneral: datos.cantidad * 1.136, // pasar a m3
              unidadGeneral: 20, // m3
            };
          }
        default:
          return null;
      }

    // BIOENTANOL (id: 9)
    case 9:
      switch (datos.idUnidad) {
        case 23: // ton
          if (datos.poderCalorifico) {
            const cantidadPoderCalorifico =
              (datos.cantidad * 1000 * datos.poderCalorifico) / 1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad * 0.001267, // pasar a Mm3
              unidadGeneral: 24, // Mm3
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 0.0064, // 6.400  PC
              cantidadGeneral: datos.cantidad * 0.001267, // pasar a Mm3
              unidadGeneral: 24, // Mm3
            };
          }
        case 24: // Mm3
          if (datos.poderCalorifico) {
            const cantidadPoderCalorifico =
              (datos.cantidad * 1000 * 0.789 * datos.poderCalorifico * 1000) /
              1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad,
              unidadGeneral: 24, // Mm3
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 5.049, // 6.400  PC
              cantidadGeneral: datos.cantidad,
              unidadGeneral: 24, // Mm3
            };
          }
        case 25: // m3
          if (datos.poderCalorifico) {
            const cantidadPoderCalorifico =
              (datos.cantidad * 0.789 * datos.poderCalorifico * 1000) / 1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad / 1000, // pasar a Mm3
              unidadGeneral: 24, // Mm3
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 0.00504, // 6.400  PC
              cantidadGeneral: datos.cantidad / 1000, // pasar a Mm3
              unidadGeneral: 24, // Mm3
            };
          }
        default:
          return null;
      }

    // BIOGÁS (id: 10)
    case 10:
      switch (datos.idUnidad) {
        case 26: // m3
          if (datos.poderCalorifico && datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad *
                (datos.poderCalorifico * (1 - datos.humedad / 100))) /
              1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad / 1000, // pasar a Mm3
              unidadGeneral: 27, // Mm3
            };
          }
          if (datos.humedad && !datos.poderCalorifico) {
            const cantidadPoderCalorifico =
              (datos.cantidad * (5600 * (1 - datos.humedad / 100))) / 1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad / 1000, // pasar a Mm3
              unidadGeneral: 27, // Mm3
              
            };
          }
          if (datos.poderCalorifico && !datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad * datos.poderCalorifico) / 1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad / 1000, // pasar a Mm3
              unidadGeneral: 27, // Mm3
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 0.0000056, // 5.600  PC
              cantidadGeneral: datos.cantidad / 1000, // pasar a Mm3
              unidadGeneral: 27, // Mm3
            };
          }
        case 27: // Mm3
          if (datos.poderCalorifico && datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad *
                (datos.poderCalorifico * (1 - datos.humedad / 100)) *
                1000) /
              1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad,
              unidadGeneral: 27, // Mm3
            };
          }
          if (datos.humedad && !datos.poderCalorifico) {
            const cantidadPoderCalorifico =
              (datos.cantidad * (5600 * (1 - datos.humedad / 100)) * 1000) /
              1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad,
              unidadGeneral: 27, // Mm3
            };
          }
          if (datos.poderCalorifico && !datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad * datos.poderCalorifico * 1000) / 1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad,
              unidadGeneral: 27, // Mm3
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 0.0056, // 5.600  PC
              cantidadGeneral: datos.cantidad,
              unidadGeneral: 27, // Mm3
            };
          }
        case 28: // MMm3
          if (datos.poderCalorifico && datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad *
                (datos.poderCalorifico * (1 - datos.humedad / 100)) *
                1000000) /
              1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad * 1000, // pasar a Mm3
              unidadGeneral: 27, // Mm3
            };
          }
          if (datos.humedad && !datos.poderCalorifico) {
            const cantidadPoderCalorifico =
              (datos.cantidad * (5600 * (1 - datos.humedad / 100)) * 1000000) /
              1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad * 1000, // pasar a Mm3
              unidadGeneral: 27, // Mm3
            };
          }
          if (datos.poderCalorifico && !datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad * datos.poderCalorifico * 1000000) / 1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad * 1000, // pasar a Mm3
              unidadGeneral: 27, // Mm3
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 5.6, // 5.600  PC
              cantidadGeneral: datos.cantidad * 1000, // pasar a Mm3
              unidadGeneral: 27, // Mm3
            };
          }
        default:
          return null;
      }

    // LEÑA - BIOMASA (id: 11)
    case 11:
      switch (datos.idUnidad) {
        case 29: // m3
          if (datos.poderCalorifico && datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad *
                (datos.poderCalorifico * (1 - datos.humedad / 100)) *
                1000 *
                0.6) /
              1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad * 0.6, // Convertir m3 a toneladas (1 m3 de leña = 0.6 ton)
              unidadGeneral:30, // ton
            };
          }
          if (datos.humedad && !datos.poderCalorifico) {
            const cantidadPoderCalorifico =
              (datos.cantidad *
                (3500 * (1 - datos.humedad / 100)) *
                1000 *
                0.6) /
              1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad * 0.6, // Convertir m3 a toneladas (1 m3 de leña = 0.6 ton)
              unidadGeneral:30, // ton
            };
          }
          if (datos.poderCalorifico && !datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad * datos.poderCalorifico * 1000 * 0.6) / 1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad * 0.6, // Convertir m3 a toneladas (1 m3 de leña = 0.6 ton)
              unidadGeneral:30, // ton
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 0.0021, // 3500  PC
              cantidadGeneral: datos.cantidad * 0.6, // Convertir m3 a toneladas (1 m3 de leña = 0.6 ton)
              unidadGeneral:30, // ton
            };
          }
        case 30: // ton
          if (datos.poderCalorifico && datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad *
                (datos.poderCalorifico * (1 - datos.humedad / 100)) *
                1000) /
              1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad,
              unidadGeneral:30, // ton
            };
          }
          if (datos.humedad && !datos.poderCalorifico) {
            const cantidadPoderCalorifico =
              (datos.cantidad * (3500 * (1 - datos.humedad / 100)) * 1000) /
              1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad,
              unidadGeneral:30, // ton
            };
          }
          if (datos.poderCalorifico && !datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad * datos.poderCalorifico * 1000) / 1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad,
              unidadGeneral:30, // ton
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 0.0035, // 3500  PC
              cantidadGeneral: datos.cantidad,
              unidadGeneral:30, // ton
            };
          }
        default:
          return null;
      }

    // PELLET (id: 12)
    case 12:
      switch (datos.idUnidad) {
        case 31: // ton
          if (datos.poderCalorifico && datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad *
                (datos.poderCalorifico * (1 - datos.humedad / 100)) *
                1000) /
              1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad,
              unidadGeneral:31, // ton
            };
          }
          if (datos.humedad && !datos.poderCalorifico) {
            const cantidadPoderCalorifico =
              (datos.cantidad * (3500 * (1 - datos.humedad / 100)) * 1000) /
              1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad,
              unidadGeneral:31, // ton
            };
          }
          if (datos.poderCalorifico && !datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad * datos.poderCalorifico * 1000) / 1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad,
              unidadGeneral:31, // ton
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 0.0035, // 3500  PC
              cantidadGeneral: datos.cantidad,
              unidadGeneral:31, // ton
            };
          }
        case 32: // m3
          if (datos.poderCalorifico && datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad *
                0.6 *
                (datos.poderCalorifico * (1 - datos.humedad / 100)) *
                1000) /
              1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad * 0.6, // Convertir m3 a toneladas (1 m3 de pellet = 0.6 ton)
              unidadGeneral:31, // ton
            };
          }
          if (datos.humedad && !datos.poderCalorifico) {
            const cantidadPoderCalorifico =
              (datos.cantidad *
                0.6 *
                (3500 * (1 - datos.humedad / 100)) *
                1000) /
              1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad * 0.6, // Convertir m3 a toneladas (1 m3 de pellet = 0.6 ton)
              unidadGeneral:31, // ton
            };
          }
          if (datos.poderCalorifico && !datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad * 0.6 * datos.poderCalorifico * 1000) / 1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad * 0.6, // Convertir m3 a toneladas (1 m3 de pellet = 0.6 ton)
              unidadGeneral:31, // ton
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 0.0021, // 3500  PC
              cantidadGeneral: datos.cantidad * 0.6, // Convertir m3 a toneladas (1 m3 de pellet = 0.6 ton)
              unidadGeneral:30, // ton
            };
          }
        default:
          return null;
      }

    // CARBÓN VEGETAL (id: 13)
    case 13:
      switch (datos.idUnidad) {
        case 33: // ton
          if (datos.poderCalorifico) {
            const cantidadPoderCalorifico =
              (datos.cantidad * datos.poderCalorifico * 1000) / 1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad,
              unidadGeneral:33, // ton
              
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 0.007, // 7000  PC
              cantidadGeneral: datos.cantidad,
              unidadGeneral:33, // ton
            };
          }
        case 34: // kg
          if (datos.poderCalorifico) {
            const cantidadPoderCalorifico =
              (datos.cantidad * datos.poderCalorifico) / 1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad / 1000, // pasar a toneladas
              unidadGeneral:33, // ton
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 0.000007, // 7000  PC
              cantidadGeneral: datos.cantidad / 1000, // pasar a toneladas
              unidadGeneral:33, // ton
            };
          }
        default:
          return null;
      }

    // BRIQUETA DE BIOMASA (id: 14)
    case 14:
      switch (datos.idUnidad) {
        case 35: // ton
          if (datos.poderCalorifico && datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad *
                (datos.poderCalorifico * (1 - datos.humedad / 100))) /
              1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad,
              unidadGeneral:35, // ton
            };
          }
          if (datos.humedad && !datos.poderCalorifico) {
            const cantidadPoderCalorifico =
              (datos.cantidad * (4200 * (1 - datos.humedad / 100))) / 1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad,
              unidadGeneral:35, // ton
            };
          }
          if (datos.poderCalorifico && !datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad * datos.poderCalorifico) / 1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad,
              unidadGeneral:35, // ton
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 0.0000042, // 4200  PC
              cantidadGeneral: datos.cantidad,
              unidadGeneral:35, // ton
            };
          }
        case 36: // m3
          if (datos.poderCalorifico && datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad *
                (datos.poderCalorifico * (1 - datos.humedad / 100)) *
                1000 *
                0.7) /
              1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad * 0.7, // pasar a toneladas
              unidadGeneral:35, // ton
            };
          }
          if (datos.humedad && !datos.poderCalorifico) {
            const cantidadPoderCalorifico =
              (datos.cantidad *
                (4200 * (1 - datos.humedad / 100)) *
                1000 *
                0.7) /
              1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad * 0.7, // pasar a toneladas
              unidadGeneral:35, // ton
            };
          }
          if (datos.poderCalorifico && !datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad * datos.poderCalorifico * 0.7 * 1000) / 1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad * 0.7, // pasar a toneladas
              unidadGeneral:35, // ton
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 0.00294, // 7000  PC
              cantidadGeneral: datos.cantidad * 0.7, // pasar a toneladas
              unidadGeneral:35, // ton
            };
          }
        default:
          return null;
      }

    // LICOR NEGRO (id: 15)
    case 15:
      switch (datos.idUnidad) {
        case 37: // m3
          if (datos.poderCalorifico && datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad *
                (datos.poderCalorifico * (1 - datos.humedad / 100)) *
                1000 *
                1.28) /
              1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad * 1.28, // pasar a toneladas
              unidadGeneral:38, // ton
            };
          }
          if (datos.humedad && !datos.poderCalorifico) {
            const cantidadPoderCalorifico =
              (datos.cantidad *
                (2885 * (1 - datos.humedad / 100)) *
                1000 *
                1.28) /
              1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad * 1.28, // pasar a toneladas
              unidadGeneral:35, // ton
            };
          }
          if (datos.poderCalorifico && !datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad * datos.poderCalorifico * 1000 * 1.28) / 1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad * 1.28, // pasar a toneladas
              unidadGeneral:35, // ton
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 0.00369, // 2885  PC
              cantidadGeneral: datos.cantidad * 1.28, // pasar a toneladas
              unidadGeneral:35, // ton
            };
          }
        case 38: // ton
          if (datos.poderCalorifico && datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad *
                (datos.poderCalorifico * (1 - datos.humedad / 100)) *
                1000) /
              1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad,
              unidadGeneral:35, // ton
            };
          }
          if (datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad * (2885 * (1 - datos.humedad / 100)) * 1000) /
              1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad,
              unidadGeneral:35, // ton
            };
          }
          if (datos.poderCalorifico) {
            const cantidadPoderCalorifico =
              (datos.cantidad * datos.poderCalorifico * 1000) / 1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad,
              unidadGeneral:35, // ton
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 0.002885, // 2885  PC
              cantidadGeneral: datos.cantidad,
              unidadGeneral:35, // ton
            };
          }
        default:
          return null;
      }

    // OTROS DERIVADOS DE BIOMASA (id: 16)
    case 16:
      switch (datos.idUnidad) {
        case 39: // m3
          if (datos.poderCalorifico && datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad *
                (datos.poderCalorifico * (1 - datos.humedad / 100)) *
                0.45 *
                1000) /
              1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad * 0.45,
              unidadGeneral:41, // ton
            };
          }
          if (datos.humedad && !datos.poderCalorifico) {
            const cantidadPoderCalorifico =
              (datos.cantidad *
                (3800 * (1 - datos.humedad / 100)) *
                0.45 *
                1000) /
              1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad * 0.45,
              unidadGeneral:41, // ton
            };
          }
          if (datos.poderCalorifico && !datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad * datos.poderCalorifico * 0.45 * 1000) / 1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad * 0.45,
              unidadGeneral:41, // ton
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 0.00171, // 3800  PC
              cantidadGeneral: datos.cantidad * 0.45,
              unidadGeneral:41, // ton
            };
          }
        case 40: // kg
          if (datos.poderCalorifico && datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad *
                (datos.poderCalorifico * (1 - datos.humedad / 100))) /
              1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad / 1000, // pasar a toneladas
              unidadGeneral:41, // ton
            };
          }
          if (datos.humedad && !datos.poderCalorifico) {
            const cantidadPoderCalorifico =
              (datos.cantidad * (3800 * (1 - datos.humedad / 100))) / 1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad / 1000, // pasar a toneladas
              unidadGeneral:41, // ton
            };
          }
          if (datos.poderCalorifico && !datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad * datos.poderCalorifico) / 1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad / 1000, // pasar a toneladas
              unidadGeneral:41, // ton
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 0.0000038, // 3800  PC
              cantidadGeneral: datos.cantidad / 1000, // pasar a toneladas
              unidadGeneral:41, // ton
            };
          }
        case 41: // ton
          if (datos.poderCalorifico && datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad *
                (datos.poderCalorifico * (1 - datos.humedad / 100)) *
                1000) /
              1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad,
              unidadGeneral:41, // ton
            };
          }
          if (datos.humedad && !datos.poderCalorifico) {
            const cantidadPoderCalorifico =
              (datos.cantidad * (3800 * (1 - datos.humedad / 100)) * 1000) /
              1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad,
              unidadGeneral:41, // ton
            };
          }
          if (datos.poderCalorifico && !datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad * datos.poderCalorifico * 1000) / 1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad,
              unidadGeneral:41, // ton
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 0.0038, // 3800  PC
              cantidadGeneral: datos.cantidad,
              unidadGeneral:41, // ton
            };
          }
        default:
          return null;
      }
    // CARBÓN TÉRMICO BITUMINOSO
    case 17:
      switch (datos.idUnidad) {
        case 42: // kg
          if (datos.poderCalorifico && datos.humedad !== null) {
            const cantidadTcal =
              (datos.cantidad *
                datos.poderCalorifico *
                (1 - datos.humedad * 0.01)) /
              10 ** 9;

            const cantidadGeneral = datos.cantidad / 1000; // pasar a toneladas

            return { cantidadTcal, cantidadGeneral, unidadGeneral:43};
          }
          if (datos.poderCalorifico !== null && datos.humedad === null) {
            const cantidadTcal =
              (datos.cantidad * datos.poderCalorifico * (1 - 10 * 0.01)) /
              10 ** 9;

            const cantidadGeneral = datos.cantidad / 1000; // pasar a toneladas

            return { cantidadTcal, cantidadGeneral,unidadGeneral:43 };
          } else {
            const cantidadTcal =
              (datos.cantidad * 7800 * (1 - 10 * 0.01)) / 10 ** 9;

            const cantidadGeneral = datos.cantidad / 1000; // pasar a toneladas
            return { cantidadTcal, cantidadGeneral,unidadGeneral:43  };
          }
          break;

        case 43: // toneladas
          if (datos.poderCalorifico && datos.humedad !== null) {
            const cantidadTcal =
              (datos.cantidad *
                1000 * // convertir toneladas a kg
                datos.poderCalorifico *
                (1 - datos.humedad * 0.01)) /
              10 ** 9;

            const cantidadGeneral = datos.cantidad; // ya está en toneladas

            return { cantidadTcal, cantidadGeneral, unidadGeneral:43 };
          }
          if (datos.poderCalorifico !== null && datos.humedad === null) {
            const cantidadTcal =
              (datos.cantidad *
                1000 * // convertir toneladas a kg
                datos.poderCalorifico *
                (1 - 10 * 0.01)) /
              10 ** 9;

            const cantidadGeneral = datos.cantidad; // ya está en toneladas

            return { cantidadTcal, cantidadGeneral, unidadGeneral:43 };
          } else {
            const cantidadTcal =
              (datos.cantidad *
                1000 * // convertir toneladas a kg
                7800 *
                (1 - 10 * 0.01)) /
              10 ** 9;

            const cantidadGeneral = datos.cantidad; // ya está en toneladas

            return { cantidadTcal, cantidadGeneral, unidadGeneral:43 };
          }
          break;

        default:
          return null; // unidad no reconocida
      }
      break;
    case 18:
      switch (datos.idUnidad) {
        case 44: // kg
          if (datos.poderCalorifico && datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad *
                (datos.poderCalorifico * (1 - datos.humedad / 100))) /
              1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad / 1000, // pasar a toneladas
              unidadGeneral:45 //ton
            };
          }
          if (datos.humedad && !datos.poderCalorifico) {
            const cantidadPoderCalorifico =
              (datos.cantidad * (7000 * (1 - datos.humedad / 100))) / 1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad / 1000, // pasar a toneladas
              unidadGeneral:45 //ton
            };
          }
          if (datos.poderCalorifico && !datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad * datos.poderCalorifico) / 1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad / 1000, // pasar a toneladas
              unidadGeneral:45 //ton
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 0.000007, // 7000  PC
              cantidadGeneral: datos.cantidad / 1000, // pasar a toneladas
              unidadGeneral:45 //ton
            };
          }
        case 45: // ton
          if (datos.poderCalorifico && datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad *
                (datos.poderCalorifico * (1 - datos.humedad / 100)) *
                1000) /
              1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad,
              unidadGeneral:45 //ton
            };
          }
          if (datos.humedad && !datos.poderCalorifico) {
            const cantidadPoderCalorifico =
              (datos.cantidad * (7000 * (1 - datos.humedad / 100)) * 1000) /
              1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad,
              unidadGeneral:45 //ton
            };
          }
          if (datos.poderCalorifico && !datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad * datos.poderCalorifico * 1000) / 1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad,
              unidadGeneral:45 //ton
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 0.0007, // 7000  PC
              cantidadGeneral: datos.cantidad,
              unidadGeneral:45 //ton
            };
          }
        default:
          return null;
      }

    // CARBÓN TÉRMICO SUB BITUMINOSO (id: 19)
    case 19:
      switch (datos.idUnidad) {
        case 46: // ton
          if (datos.poderCalorifico && datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad *
                (datos.poderCalorifico * (1 - datos.humedad / 100)) *
                1000) /
              1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad,
              unidadGeneral:46 //ton
            };
          }
          if (datos.humedad && !datos.poderCalorifico) {
            const cantidadPoderCalorifico =
              (datos.cantidad * (7000 * (1 - datos.humedad / 100)) * 1000) /
              1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad,
              unidadGeneral:46 //ton
            };
          }
          if (datos.poderCalorifico && !datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad * datos.poderCalorifico * 1000) / 1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad,
              unidadGeneral:46 //ton
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 0.0007, // 7000  PC
              cantidadGeneral: datos.cantidad,
              unidadGeneral:46 //ton
            };
          }
        case 47: // kg
          if (datos.poderCalorifico && datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad *
                (datos.poderCalorifico * (1 - datos.humedad / 100))) /
              1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad / 1000, // pasar a toneladas
              unidadGeneral:46 //ton
            };
          }
          if (datos.humedad && !datos.poderCalorifico) {
            const cantidadPoderCalorifico =
              (datos.cantidad * (7000 * (1 - datos.humedad / 100))) / 1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad / 1000, // pasar a toneladas
              unidadGeneral:46 //ton
            };
          }
          if (datos.poderCalorifico && !datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad * datos.poderCalorifico) / 1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad / 1000, // pasar a toneladas
              unidadGeneral:46 //ton
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 0.000007, // 7000  PC
              cantidadGeneral: datos.cantidad / 1000, // pasar a toneladas
              unidadGeneral:46 //ton
            };
          }
        default:
          return null;
      }

    // ANTRACITA (id: 20)
    case 20:
      switch (datos.idUnidad) {
        case 48: // kg
          if (datos.poderCalorifico && datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad *
                (datos.poderCalorifico * (1 - datos.humedad / 100))) /
              1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad / 1000, // pasar a toneladas
              unidadGeneral:49 //ton
            };
          }
          if (datos.humedad && !datos.poderCalorifico) {
            const cantidadPoderCalorifico =
              (datos.cantidad * (8000 * (1 - datos.humedad / 100))) / 1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad / 1000, // pasar a toneladas
              unidadGeneral:49 //ton
            };
          }
          if (datos.poderCalorifico && !datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad * datos.poderCalorifico) / 1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad / 1000, // pasar a toneladas
              unidadGeneral:49 //ton
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 0.000008, // 8000  PC
              cantidadGeneral: datos.cantidad / 1000, // pasar a toneladas
              unidadGeneral:49 //ton
            };
          }
        case 49: // ton
          if (datos.poderCalorifico && datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad *
                1000 *
                (datos.poderCalorifico * (1 - datos.humedad / 100))) /
              1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad,
              unidadGeneral:49 //ton
            };
          }
          if (datos.humedad && !datos.poderCalorifico) {
            const cantidadPoderCalorifico =
              (datos.cantidad * 1000 * (8000 * (1 - datos.humedad / 100))) /
              1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad,
              unidadGeneral:49 //ton
            };
          }
          if (datos.poderCalorifico && !datos.humedad) {
            const cantidadPoderCalorifico =
              (datos.cantidad * 1000 * datos.poderCalorifico) / 1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad,
              unidadGeneral:49 //ton
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 0.008, // 8000  PC
              cantidadGeneral: datos.cantidad,
              unidadGeneral:49 //ton
            };
          }
        default:
          return null;
      }

    // OTROS PRODUCTOS DE CARBÓN (id: 21)
    case 21:
      switch (datos.idUnidad) {
        case 50: // ton
          if (datos.poderCalorifico) {
            const cantidadPoderCalorifico =
              (datos.cantidad * 1000 * datos.poderCalorifico) / 1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad,
              unidadGeneral:50 //ton
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 0.007, // 7000  PC
              cantidadGeneral: datos.cantidad,
              unidadGeneral:50 //ton
              
            };
          }
        case 51: // kg
          if (datos.poderCalorifico) {
            const cantidadPoderCalorifico =
              (datos.cantidad * datos.poderCalorifico) / 1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad / 1000, // pasar a toneladas
              unidadGeneral:50 //ton
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 0.000007, // 7000  PC
              cantidadGeneral: datos.cantidad / 1000, // pasar a toneladas
              unidadGeneral:50 //ton
            };
          }
        default:
          return null;
      }
    //GLP - GAS LICUADO DE PETRÓLEO
    case 22:
      switch (datos.idUnidad) {
        case 52: // m3
          if (datos.poderCalorifico !== null) {
            const cantidadTcal =
              (datos.cantidad * 550 * datos.poderCalorifico) / 1_000_000_000;
            const cantidadGeneral = datos.cantidad; // unidad general: m3
            return { cantidadGeneral, cantidadTcal, unidadGeneral:52 };
          } else {
            const cantidadTcal = (datos.cantidad * 550 * 12000) / 1_000_000_000;
            const cantidadGeneral = datos.cantidad;
            return { cantidadGeneral, cantidadTcal , unidadGeneral:52 };
          }

        case 53: // kg
          if (datos.poderCalorifico !== null) {
            const cantidadTcal =
              (datos.cantidad * datos.poderCalorifico) / 1_000_000_000;
            const cantidadGeneral = datos.cantidad / 550; // a m3
            return { cantidadTcal, cantidadGeneral , unidadGeneral:52 };
          } else {
            const cantidadTcal = (datos.cantidad * 12000) / 1_000_000_000;
            const cantidadGeneral = datos.cantidad / 550; // a m3
            return { cantidadTcal, cantidadGeneral, unidadGeneral:52  };
          }
          break;

        case 54: // ton (1 ton = 1000 kg)
          if (datos.poderCalorifico !== null) {
            const cantidadKg = datos.cantidad * 1000;
            const cantidadTcal =
              (cantidadKg * datos.poderCalorifico) / 1_000_000_000;
            const cantidadGeneral = cantidadKg / 550; // a m3
            return { cantidadTcal, cantidadGeneral, unidadGeneral:52  };
          } else {
            const cantidadKg = datos.cantidad * 1000;
            const cantidadTcal = (cantidadKg * 12000) / 1_000_000_000;
            const cantidadGeneral = cantidadKg / 550; // a m3
            return { cantidadTcal, cantidadGeneral , unidadGeneral:52 };
          }
          break;

        case 55: // Mton (1 Mton = 1,000,000 kg)
          if (datos.poderCalorifico !== null) {
            const cantidadKg = datos.cantidad * 1_000_000;
            const cantidadTcal =
              (cantidadKg * datos.poderCalorifico) / 1_000_000_000;
            const cantidadGeneral = cantidadKg / 550; // a m3
            return { cantidadTcal, cantidadGeneral, unidadGeneral:52  };
          } else {
            const cantidadKg = datos.cantidad * 1_000_000;
            const cantidadTcal = (cantidadKg * 12000) / 1_000_000_000;
            const cantidadGeneral = cantidadKg / 550; // a m3
            return { cantidadTcal, cantidadGeneral, unidadGeneral:52  };
          }
          break;

        default:
          return null; // unidad no reconocida
      }
      break;
    // GAS NATURAL (id: 23)
    case 23:
      switch (datos.idUnidad) {
        case 56: // MMBTu
          return {
            cantidadTcal: datos.cantidad * 0.000252,
            cantidadGeneral: datos.cantidad,
            unidadGeneral:56, // MMBTu
          };
        case 57: // m3
          if (datos.poderCalorifico) {
            const cantidadPoderCalorifico =
              (datos.cantidad * datos.poderCalorifico) / 1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad * 0.03346, // pasar a MMBtu
              unidadGeneral:56, // MMBTu
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 0.000009341, // 9341  PC
              cantidadGeneral: datos.cantidad * 0.03346, // pasar a MMBtu
              unidadGeneral:56, // MMBTu
            };
          }
        case 58: // Mm3
          if (datos.poderCalorifico) {
            const cantidadPoderCalorifico =
              (datos.cantidad * 1000 * datos.poderCalorifico) / 1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad * 33.46, // pasar a MMBtu
              unidadGeneral:56, // MMBTu
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 0.009341, // 9341  PC
              cantidadGeneral: datos.cantidad * 33.46, // pasar a MMBtu
              unidadGeneral:56, // MMBTu
            };
          }
        case 59: // MMm3
          if (datos.poderCalorifico) {
            const cantidadPoderCalorifico =
              (datos.cantidad * 1000000 * datos.poderCalorifico) / 1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad * 33460, // pasar a MMBtu
              unidadGeneral:56, // MMBTu
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 9.341, // 9341  PC
              cantidadGeneral: datos.cantidad * 33460, // pasar a MMBtu
              unidadGeneral:56, // MMBTu
            };
          }
        case 60: // ton
          if (datos.poderCalorifico) {
            const cantidadPoderCalorifico =
              (((datos.cantidad * 1000) / 0.717) * datos.poderCalorifico) / 1e9; // Convertir a Tcal
            return {
              cantidadTcal: cantidadPoderCalorifico,
              cantidadGeneral: datos.cantidad * 46.67, // pasar a MMBtu
              unidadGeneral:56, // MMBTu
            };
          } else {
            return {
              cantidadTcal: datos.cantidad * 0.013, // 9341  PC
              cantidadGeneral: datos.cantidad * 46.67, // pasar a MMBtu
              unidadGeneral:56, // MMBTu
            };
          }
        default:
          return null;
      }

    //Metanol
    case 24:
      switch (datos.idUnidad) {
        case 61: //Ton------------- UNIDAD GENERAL---------------
          if (datos.cantidad) {
            const poderCalorifico = 5000; //aprox consultar PC Metanol
            const cantidadTcal = datos.cantidad * 0.005;
            const cantidadGeneral = datos.cantidad;
            return { cantidadTcal, cantidadGeneral , unidadGeneral:61 }; 
          }

        case 62: //MTon
          if (datos.cantidad) {
            const poderCalorifico = 5000; //aprox consultar PC Metanol
            const cantidadTcal = datos.cantidad * 5;
            const cantidadGeneral = datos.cantidad / 1000;
            return { cantidadTcal, cantidadGeneral  , unidadGeneral:61};
          }
      }
      break;
    //Gas Natural Corriente
    case 25:
      switch (datos.idUnidad) {
        case 63: //GCal
          if (datos.poderCalorifico !== null) {
            const cantidadTcal = datos.cantidad * 10 ** -3;
            const cantidadGeneral =
              (datos.cantidad * 1000000) / datos.poderCalorifico; //a m3
            return { cantidadGeneral, cantidadTcal , unidadGeneral:64 };
          } else {
            const cantidadTcal = datos.cantidad * 10 ** -3;
            const cantidadGeneral = (datos.cantidad * 1000000) / 9341; //PC estandar
            return { cantidadGeneral, cantidadTcal, unidadGeneral:64 };
          }
        case 64: //m3------------- UNIDAD GENERAL---------------
          if (datos.poderCalorifico !== null) {
            const cantidadTcal =
              datos.cantidad * datos.poderCalorifico * 10 ** -9;
            const cantidadGeneral = datos.cantidad;

            return { cantidadGeneral, cantidadTcal , unidadGeneral:64};
          } else {
            const cantidadTcal = datos.cantidad * 9431 * 10 ** -9;
            const cantidadGeneral = datos.cantidad;

            return { cantidadGeneral, cantidadTcal, unidadGeneral:64 };
          }
        case 65: //MMm3
          if (datos.poderCalorifico !== null) {
            const cantidadTcal =
              datos.cantidad * datos.poderCalorifico * 10 ** -3;
            const cantidadGeneral = datos.cantidad * 1000000;

            return { cantidadGeneral, cantidadTcal, unidadGeneral:64 };
          } else {
            const cantidadTcal = datos.cantidad * 9431 * 10 ** -3;
            const cantidadGeneral = datos.cantidad * 1000000;

            return { cantidadGeneral, cantidadTcal, unidadGeneral:64 };
          }
      }
    //GNL-GAS NATURAL LICUADO
    case 26:
      switch (datos.idUnidad) {
        case 66: //MMBtu
          if (datos.poderCalorifico !== null) {
            const cantidadTcal = datos.cantidad * 0.000252;
            const cantidadAKcal = datos.cantidad * 252000;
            const cantidadAM3 = cantidadAKcal / datos.poderCalorifico;
            const cantidadGeneral = cantidadAM3 / 1000000;
            return { cantidadGeneral, cantidadTcal, unidadGeneral:67 };
          } else {
            const cantidadTcal = datos.cantidad * 0.000252;
            const cantidadAKcal = datos.cantidad * 252000;
            const cantidadAM3 = cantidadAKcal / 9555;
            const cantidadGeneral = cantidadAM3 / 1000000;
            return { cantidadGeneral, cantidadTcal, unidadGeneral:67 };
          }
        case 67: //MMmm3------------- UNIDAD GENERAL---------------
          if (datos.poderCalorifico !== null) {
            const cantidadTcal =
              (datos.cantidad * 1000000 * datos.poderCalorifico) / 10 ** 9;
            const cantidadGeneral = datos.cantidad;
            return { cantidadGeneral, cantidadTcal, unidadGeneral:67 };
          } else {
            const cantidadTcal = (datos.cantidad * 1000000 * 9555) / 10 ** 9;
            const cantidadGeneral = datos.cantidad;
            return { cantidadGeneral, cantidadTcal, unidadGeneral:67 };
          }
      }
      break;
    //NAFTA
    case 27:
      switch (datos.idUnidad) {
        case 68: //m3
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 0.00805;
            const cantidadGeneral = datos.cantidad;
            return { cantidadGeneral, cantidadTcal , unidadGeneral:68 };
          }
        case 69: //Mm3
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 8.05;
            const cantidadGeneral = datos.cantidad * 1000;
            return { cantidadGeneral, cantidadTcal, unidadGeneral:68 };
          }
      }
    //COQUE DE PETRÓLEO
    case 28:
      switch (datos.idUnidad) {
        case 70: //m3
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 0.00891;
            const cantidadGeneral = datos.cantidad * 1100; //a kg
            return { cantidadGeneral, cantidadTcal , unidadGeneral:71};
          }

        case 71: //kg------------- UNIDAD GENERAL---------------
          if (datos.cantidad) {
            const cantidadTcal = (datos.cantidad * 8100) / 10 ** 9;
            const cantidadGeneral = datos.cantidad;
            return { cantidadTcal, cantidadGeneral, unidadGeneral:71 };
          }
        case 72: //ton Toneladas
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 0.0081;
            const cantidadGeneral = datos.cantidad * 1000; //a kg
            return { cantidadGeneral, cantidadTcal , unidadGeneral:71};
          }
        case 73: //Mton Miles de Toneladas(debería ser kton, Mton = Megatoneladas)
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 8.1;
            const cantidadGeneral = datos.cantidad * 1000000; //a kg
            return { cantidadGeneral, cantidadTcal , unidadGeneral:71};
          }
      }
    //OTROS DERIVADOS DEL PETRÓLEO
    case 29:
      switch (datos.idUnidad) {
        case 74: //ton------------- UNIDAD GENERAL---------------
          if (datos.poderCalorifico !== null) {
            const cantidadTcal =
              datos.cantidad * (datos.poderCalorifico / 1_000_000);
            const cantidadGeneral = datos.cantidad;
            return { cantidadGeneral, cantidadTcal , unidadGeneral:74};
          }
        case 75: //Mton Miles de toneladas
          if (datos.poderCalorifico !== null) {
            const cantidadTcal = datos.cantidad * datos.poderCalorifico;
            const cantidadGeneral = datos.cantidad * 1_000;
            return { cantidadGeneral, cantidadTcal , unidadGeneral:74 };
          }
      }

    //PROPILENO
    case 30:
      switch (datos.idUnidad) {
        case 76: //m3------------- UNIDAD GENERAL---------------
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 6.08 * 10 ** -3;
            const cantidadGeneral = datos.cantidad;
            return { cantidadTcal, cantidadGeneral  , unidadGeneral:76};
          }
        case 77: //Mm3 Miles de m3
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 6.08;
            const cantidadGeneral = datos.cantidad * 1_000;
            return { cantidadTcal, cantidadGeneral  , unidadGeneral:76};
          }
      }
    //Pitch
    case 31:
      switch (datos.idUnidad) {
        case 78: //m3------------- UNIDAD GENERAL---------------
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 0.0094;
            const cantidadGeneral = datos.cantidad;
            return { cantidadTcal, cantidadGeneral , unidadGeneral:78 };
          }
        case 79: // Mm3 Miles de m3
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 9.4;
            const cantidadGeneral = datos.cantidad * 1000;
            return { cantidadTcal, cantidadGeneral, unidadGeneral:78  };
          }
      }
    //Componente Asfaltico
    case 32:
      switch (datos.idUnidad) {
        case 80: //m3------------- UNIDAD GENERAL---------------
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 0.00992;
            const cantidadGeneral = datos.cantidad;
            return { cantidadGeneral, cantidadTcal, unidadGeneral:80  };
          }
        case 81: // Mm3 Miles de m3
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 9.92;
            const cantidadGeneral = datos.cantidad * 1000;
            return { cantidadGeneral, cantidadTcal, unidadGeneral:80 };
          }
      }
    //Solventes
    case 33:
      switch (datos.idUnidad) {
        case 83: //m3------------- UNIDAD GENERAL---------------
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 0.00805;
            const cantidadGeneral = datos.cantidad;
            return { cantidadGeneral, cantidadTcal , unidadGeneral:83};
          }
        case 82: // Mm3 Miles de m3
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 8.05;
            const cantidadGeneral = datos.cantidad * 1000;
            return { cantidadGeneral, cantidadTcal, unidadGeneral:83 };
          }
      }

    //Asfalto
    case 34:
      switch (datos.idUnidad) {
        case 85: //m3------------- UNIDAD GENERAL---------------
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 0.00992;
            const cantidadGeneral = datos.cantidad;
            return { cantidadGeneral, cantidadTcal, unidadGeneral:85 };
          }
        case 84: // Mm3 Miles de m3
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 9.92;
            const cantidadGeneral = datos.cantidad * 1000;
            return { cantidadGeneral, cantidadTcal, unidadGeneral:85 };
          }
      }

    //Gasoil
    case 35:
      switch (datos.idUnidad) {
        case 86: //m3------------- UNIDAD GENERAL---------------
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 0.00916;
            const cantidadGeneral = datos.cantidad;
            return { cantidadGeneral, cantidadTcal, unidadGeneral:86 };
          }
        case 87: // Mm3 Miles de m3
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 9.16;
            const cantidadGeneral = datos.cantidad * 1000;
            return { cantidadGeneral, cantidadTcal , unidadGeneral:86};
          }
      }
    //Petróleo crudo
    case 36:
      switch (datos.idUnidad) {
        case 88: //Mm3 miles de métros cúbicos------------- UNIDAD GENERAL---------------
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 9.04;
            const cantidadGeneral = datos.cantidad;
            return { cantidadGeneral, cantidadTcal , unidadGeneral:88};
          }
        case 89: // Ton
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 0.01096;
            const cantidadGeneral = datos.cantidad / 825;
            return { cantidadGeneral, cantidadTcal  , unidadGeneral:88};
          }
      }
    //DIESEL//
    case 37:
      switch (datos.idUnidad) {
        case 90: // Lts
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 0.000009156;
            const cantidadGeneral = datos.cantidad * 0.001;
            return { cantidadGeneral, cantidadTcal , unidadGeneral:91 };
          }
        case 91: // m3------------- UNIDAD GENERAL---------------
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 0.009156;
            const cantidadGeneral = datos.cantidad;
            return { cantidadGeneral, cantidadTcal , unidadGeneral:91};
          }

        case 92: // Mm3
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 9.156;
            const cantidadGeneral = datos.cantidad * 1000000;
            return { cantidadGeneral, cantidadTcal , unidadGeneral:91};
          }

        case 93: // Ton
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 0.0109;
            const cantidadGeneral = datos.cantidad / 0.84; //(densidad ton/m3);
            return { cantidadGeneral, cantidadTcal, unidadGeneral:91 };
          }
        default:
          return null;
      }
      break;

    //Petróleo Comb 5
    case 38:
      switch (datos.idUnidad) {
        case 94: //m3
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 0.00973;
            const cantidadGeneral = datos.cantidad * 927; //a kg
            return { cantidadGeneral, cantidadTcal, unidadGeneral:95 };
          }
        case 95: //kg------------- UNIDAD GENERAL---------------
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 0.0000109;
            const cantidadGeneral = datos.cantidad;
            return { cantidadGeneral, cantidadTcal, unidadGeneral:95 };
          }
        case 96: // Ton
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 0.0105;
            const cantidadGeneral = datos.cantidad * 1000;
            return { cantidadGeneral, cantidadTcal, unidadGeneral:95 };
          }
        case 97: // MTon
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 10.5;
            const cantidadGeneral = datos.cantidad * 1000000;
            return { cantidadGeneral, cantidadTcal, unidadGeneral:95 };
          }
      }
    //Petróleo Comb 6
    case 39:
      switch (datos.idUnidad) {
        case 101: //m3
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 0.00992;
            const cantidadGeneral = datos.cantidad * 936; //a kg
            return { cantidadGeneral, cantidadTcal, unidadGeneral:100 };
          }
        case 100: //kg------------- UNIDAD GENERAL---------------
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 0.0000105;
            const cantidadGeneral = datos.cantidad;
            return { cantidadGeneral, cantidadTcal , unidadGeneral:100 };
          }
        case 98: // Ton
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 0.0105;
            const cantidadGeneral = datos.cantidad * 1000;
            return { cantidadGeneral, cantidadTcal, unidadGeneral:100  };
          }
        case 99: // MTon
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 10.5;
            const cantidadGeneral = datos.cantidad * 1000000;
            return { cantidadGeneral, cantidadTcal, unidadGeneral:100  };
          }
      }

    //ifo
    case 40:
      switch (datos.idUnidad) {
        case 102: //m3
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 0.00983;
            const cantidadGeneral = datos.cantidad * 936; //a kg
            return { cantidadGeneral, cantidadTcal , unidadGeneral:103};
          }
        case 103: //------------- UNIDAD GENERAL---------------
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 0.0000105;
            const cantidadGeneral = datos.cantidad;
            return { cantidadGeneral, cantidadTcal , unidadGeneral:103};
          }
        case 105: // Ton
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 0.0105;
            const cantidadGeneral = datos.cantidad * 1000;
            return { cantidadGeneral, cantidadTcal , unidadGeneral:103};
          }
        case 104: // MTon
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 10.5;
            const cantidadGeneral = datos.cantidad * 1000000;
            return { cantidadGeneral, cantidadTcal, unidadGeneral:103 };
          }
      }
    //KEROSENE
    case 41:
      switch (datos.idUnidad) {
        case 106: //lts
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 0.000008991;
            const cantidadGeneral = datos.cantidad * 0.001;
            return { cantidadGeneral, cantidadTcal, unidadGeneral:109 };
          }
        case 109: //m3------------- UNIDAD GENERAL---------------
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 0.008991;
            const cantidadGeneral = datos.cantidad;
            return { cantidadGeneral, cantidadTcal , unidadGeneral:109};
          }
        case 108: //Mm3 miles de m3
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 8.991;
            const cantidadGeneral = datos.cantidad * 1_000;
            return { cantidadGeneral, cantidadTcal, unidadGeneral:109 };
          }
      }

    //KEROSENE DE AVIACIÓN
    case 42:
      switch (datos.idUnidad) {
        case 112: //lts
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 0.000008991;
            const cantidadGeneral = datos.cantidad * 0.001;
            return { cantidadGeneral, cantidadTcal , unidadGeneral:110};
          }
        case 110: //m3------------- UNIDAD GENERAL---------------
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 0.008991;
            const cantidadGeneral = datos.cantidad;
            return { cantidadGeneral, cantidadTcal , unidadGeneral:110};
          }
        case 111: //Mm3
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 8.991;
            const cantidadGeneral = datos.cantidad * 1_000;
            return { cantidadGeneral, cantidadTcal, unidadGeneral:110 };
          }
      }
    //Electricidad//
    case 43:
      switch (datos.idUnidad) {
        case 113: //kHh//m3------------- UNIDAD GENERAL---------------
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 0.00000086;
            const cantidadGeneral = datos.cantidad;
            return { cantidadGeneral, cantidadTcal, unidadGeneral:113 };
          }
        case 114: // MHh
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 0.00086;
            const cantidadGeneral = datos.cantidad * 1000;
            return { cantidadGeneral, cantidadTcal , unidadGeneral:113};
          }

        case 115: // GHh
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 0.86;
            const cantidadGeneral = datos.cantidad * 1000000;
            return { cantidadGeneral, cantidadTcal , unidadGeneral:113};
          }

        default:
          return null;
      }
    case 44:
      switch (datos.idUnidad) {
        case 116:
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad;
            const cantidadGeneral = datos.cantidad;
            return { cantidadGeneral, cantidadTcal, unidadGeneral:116 };
          }
        case 117:
          if (datos.cantidad) {
            const cantidadTcal = datos.cantidad * 0.239;
            const cantidadGeneral = datos.cantidad * 0.239;
            return { cantidadGeneral, cantidadTcal , unidadGeneral:116};
          }
      }

    default:
      return null; // tipo no reconocido
  }

  return null; // si no cumple ninguna condición
};
