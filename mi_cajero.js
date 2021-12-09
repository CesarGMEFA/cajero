class Billete {
    constructor(valor, cantidad) {
        this.valor = valor;
        this.cantidad = cantidad;
        this.imagen = new Image();
        this.imagen.src = imagenes[this.valor];
    }
}

const cantidadDeDinero = document.getElementById("cantidadDeDinero")
const resultado = document.getElementById("resultado")

let papeles = 0;
let entregado = [];
let almacen = [];
let matrizDelDinero = [];
let cantidadDisponible = 0;

const imagenes = [];
imagenes[100] = "./images/100_$_.png";
imagenes[50] = "./images/50_$_.png";
imagenes[20] = "./images/20_$_.png";
imagenes[10] = "./images/10_$_.png";
imagenes[5] = "./images/5_$_.png";
imagenes[2] = "./images/2_$_.png";
imagenes[1] = "./images/1_$_.png";

const caja = [];
caja.push(new Billete(100, 4)); //400
caja.push(new Billete(50, 6)); // 300
caja.push(new Billete(20, 9)); // 180
caja.push(new Billete(10, 7)); // 70
caja.push(new Billete(5, 11)); // 55
caja.push(new Billete(2, 13)); // 26
caja.push(new Billete(1, 17)); // 26

for (iter of caja) {
    let mult = iter.valor * iter.cantidad
    almacen.push(mult);
}
cantidadDisponible = almacen.reduce((acum, e) => acum + e, 0)
cantidadDeDinero.innerHTML += `Saldo disponible en el cajero: ${cantidadDisponible}`


function onClick() {    
    let t = document.getElementById("dineroInput")
    let dinero = parseInt(t.value);

    matrizDelDinero.push(dinero)
    let dineroSumado = matrizDelDinero.reduce( (acum, item) => acum + item, 0);
    console.log("Dinero sumado: ",dineroSumado);

    let saldoActual = cantidadDisponible;
    if (saldoActual > dinero) {
        saldoActual -= dineroSumado
        console.log("Saldo: ", saldoActual);
        cantidadDeDinero.innerHTML = `Saldo disponible en el cajero2x: ${saldoActual}`
    }


    if ( saldoActual < 0) {
        cantidadDeDinero.innerHTML = `Saldo disponible en el cajero2x: ${0}`
    }

    if (dinero < 0) {
        resultado.innerHTML = `No se permite montos negativos.`
      } 
    
    for (b of caja) 
    {
        if (dinero > 0) {
            let division = Math.floor(dinero / b.valor)
            if (division > b.cantidad ) {
                papeles = b.cantidad;
            } else {
                papeles = division;
            }
            entregado.push( new Billete(b.valor, papeles));
            dinero = dinero - (b.valor * papeles);
            b.cantidad -= papeles;
        }
    };
    
    
    if(dinero > 0)
    {
        resultado.innerHTML = "No tenemos disponibles los billetes para tu solitud, por lo cual vuelve a intentarlo con otro monto.";
    } else {
        for (e of entregado) 
        {
            if (e.cantidad > 1) 
            {
                resultado.innerHTML += `<img src="${e.imagen.src}" ><br /> ${e.cantidad} billetes de ${e.valor}$ <br />`
            } else if (e.cantidad === 1) {
                resultado.innerHTML += `<img src="${e.imagen.src}" ><br />${e.cantidad} billete de ${e.valor}$ <hr />`
            }
        }
    }
    
}