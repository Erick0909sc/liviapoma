export const ejecutarDespuesDeFecha = (
  date: string,
  customFunction: () => void
) => {
  const nowInPeru = new Date().toLocaleString("en-US", {
    timeZone: "America/Lima",
  });
  const currentDate = new Date(nowInPeru);
  const fechaEspecifica = new Date(date).toLocaleString("en-US", {
    timeZone: "America/Lima",
  });
  const fechaEspecificaDate = new Date(fechaEspecifica);
  const tiempoRestante = fechaEspecificaDate.getTime() - currentDate.getTime();

  if (tiempoRestante <= 0) {
    customFunction();
  } else {
    setTimeout(customFunction, tiempoRestante);
  }
};
