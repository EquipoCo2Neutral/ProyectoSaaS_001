type DatosEnergeticos = {
  idEnergetico: number;
  idUnidad: number;
  cantidad: number;
  poderCalorifico: number | null;
  humedad: number | null;
};

export const conversorTcal = async (
  datos: DatosEnergeticos,
): Promise<{ cantidadTcal: number; cantidadGeneral: number } | null> => {
  switch (datos.idEnergetico) {
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

            return { cantidadTcal, cantidadGeneral };
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

            return { cantidadTcal, cantidadGeneral };
          }
          break;

        default:
          return null; // unidad no reconocida
      }
      break;

    // CARBÓN TÉRMICO BITUMINOSO METALÚRGICO
    case 18:
      switch (datos.idUnidad) {
        case 44: // kg
          // Aquí debes poner lógica similar si tienes datos para calcular
          return null; // o tu cálculo si existe
        case 45: // toneladas
          // Igual aquí
          return null;
        default:
          return null;
      }
      break;

    default:
      return null; // tipo no reconocido
  }

  return null; // si no cumple ninguna condición
};
