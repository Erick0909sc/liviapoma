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
    timeZone: "America/Lima", // Establecer la zona horaria de Perú
  });

  return formatoPeruano.format(fecha);
};

export const formatFechaPeru = (fecha: Date): Date => {
  // Clonar la fecha para evitar modificar la original
  const fechaPeru = new Date(fecha);

  // Ajustar la hora a la zona horaria de Perú (UTC-5)
  fechaPeru.setUTCHours(fechaPeru.getUTCHours()); // Deploy
  // fechaPeru.setUTCHours(fechaPeru.getUTCHours() - 5); // Local
  return fechaPeru;
};

export const formatFechaNow = (fecha: Date): Date => {
  // Clonar la fecha para evitar modificar la original
  const fechaPeru = new Date(fecha);

  // Ajustar la hora a la zona horaria de Perú (UTC-5)
  fechaPeru.setUTCHours(fechaPeru.getUTCHours() - 5);
  return fechaPeru;
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
