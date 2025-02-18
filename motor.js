const montosMinimosMasc = 
{
  "[0-26)": { A: 100, B: 1000, C: 400, D: 400 },
  "27": { A: 400, B: 600, C: 200, D: 300 },
  "28": { A: 900, B: 1000, C: 200, D: 500 },
  "29": { A: 100, B: 1000, C: 1000, D: 900 },
  "[30 - inf]": { A: 600, B: 1000, C: 600, D: 1000 }
};

const montosMinimosFem = 
{
  "[0-24)": { A: 800, B: 800, C: 200, D: 500 },
  "25": { A: 800, B: 700, C: 900, D: 1000 },
  "26": { A: 800, B: 100, C: 700, D: 600 },
  "27": { A: 600, B: 600, C: 800, D: 400 },
  "[28 - inf]": { A: 200, B: 700, C: 100, D: 700 },
};

const montosMaximosMasc = {
  "[0-26)": { A: 4900, B: 4700, C: 5000, D: 4400 },
  "27": { A: 4700, B: 4400, C: 4700, D: 4700 },
  "28": { A: 4600, B: 5000, C: 5000, D: 4300 },
  "29": { A: 4600, B: 4400, C: 4200, D: 4900 },
  "[30 - inf]": { A: 4500, B: 4900, C: 4600, D: 4300 }
};

const montosMaximosFem = 
{
  "[0-24)": { A: 4000, B: 4700, C: 4600, D: 5000 },
  "25": { A: 4200, B: 4200, C: 4900, D: 4900 },
  "26": { A: 4100, B: 4500, C: 4600, D: 4700 },
  "27": { A: 4200, B: 4300, C: 4700, D: 5000 },
  "[28 - inf]": { A: 4500, B: 4400, C: 4000, D: 4300 },
  "[30 - inf]": { A: 300, B: 800, C: 200, D: 800 }

};

function calcularMesesDesdePrimerEmpleo(fechaPrimerEmpleo) 
{
  const hoy = new Date();
  const meses = (hoy.getFullYear() - fechaPrimerEmpleo.getFullYear()) * 12;
  return meses + hoy.getMonth() - fechaPrimerEmpleo.getMonth();
}

function determinarRangoMeses(meses) 
{
  switch (true) {
    case meses < 25:
      return "[0-24)";
    case meses === 25:
      return "25";
    case meses === 26:
      return "26";
    case meses === 27:
      return "27";
    case meses === 28:
      return "28";
    case meses === 29:
      return "29";
    default:
      return "[30 - inf]";
  }
}

function determinarRangoMesesFem(meses) 
{
  switch (true) {
    case meses < 25:
      return "[0-24)";
    case meses === 25:
      return "25";
    case meses === 26:
      return "26"; 
    case meses === 27:
      return "27";
    default:
      return "[28 - inf]";
  }
 }

function calcularLineaOptima(montoMinimo, montoMaximo) {
  const p1 = montoMinimo + Math.sqrt(montoMaximo - montoMinimo);
  const p2 = montoMinimo + 0.0175 * (montoMaximo - montoMinimo);
  return Math.max(p1, p2);
}

function calculoMotor(tipo, fecha, genero) 
{
  const meses = calcularMesesDesdePrimerEmpleo(fecha);
  const rango = determinarRangoMeses(meses);
  const rangoFem = determinarRangoMesesFem(meses)
  console.log(meses)

  let montoMinimo, montoMaximo;

  if (genero === 'f') {
    montoMinimo = montosMinimosFem[rangoFem][tipo];
    montoMaximo = montosMaximosFem[rangoFem][tipo];
  } else if (genero === 'm') {
    montoMinimo = montosMinimosMasc[rango][tipo];
    montoMaximo = montosMaximosMasc[rango][tipo];
  } 
  const recomendacionLinea = calcularLineaOptima(montoMinimo, montoMaximo);

  return {montoMinimo, montoMaximo, recomendacionLinea};
}


const resultados = [
    calculoMotor('A', new Date('2022-06-12'), 'f'),
    calculoMotor('B', new Date('1993-12-30'), 'f'),
    calculoMotor('C', new Date('2020-09-19'), 'm'),
    calculoMotor('D', new Date('2019-01-15'), 'm')
];

console.log(resultados)
