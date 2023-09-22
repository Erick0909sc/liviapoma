export const formatFechaISO = (fecha: Date): string => {
  // Ajustar la hora a la zona horaria de Perú (UTC-5)
  // fecha.setUTCHours(fecha.getUTCHours() - 5);

  // Formatear la fecha en la zona horaria de Perú
  const formatoPeruano = new Intl.DateTimeFormat("es-PE", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  });

  return formatoPeruano.format(fecha);
};

export const formatFecha = (fecha: Date): Date => {
  // Ajustar la hora a la zona horaria de Perú (UTC-5)
  fecha.setUTCHours(fecha.getUTCHours() - 5);
  return fecha;
};

export const executeAfterDate = (date: string, customFunction: () => void) => {
  const nowInPeru = formatFecha(new Date());
  const fechaEspecificaDate = formatFecha(new Date(date));

  const tiempoRestante = fechaEspecificaDate.getTime() - nowInPeru.getTime();

  if (tiempoRestante <= 0) {
    customFunction();
  } else {
    setTimeout(customFunction, tiempoRestante);
  }
};
