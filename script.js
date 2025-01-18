let parcial = "";

// Elemento donde se coloca la operación que se está realizando
let operRealizada = document.getElementById("operacionRealizada");

// Elemento donde se coloca el resultado
let txtResul = document.getElementById("txtResultado");

// Último operador seleccionado
let operadorSeleccionado = "";

// Número ingresado
let numero = "";

// Para determinar si lo último presionado es un número o una operación
let ultimoDigitoPresionado = "";

function operador(num) {
    // Validar que no se exceda el límite de caracteres
    if (parcial.length >= 17) {
        txtResul.innerHTML = "Límite alcanzado";
        return;
    }

    if (ultimoDigitoPresionado === "porcentaje") {
        parcial = parcial + "*";
        operRealizada.innerHTML = parcial; // Mostrar la operación actual
    }

    numero = numero + num;  // Concatenar el número
    parcial = parcial + num;  // Concatenar la operación hasta el momento
    operRealizada.innerHTML = parcial;  // Mostrar la operación actual
    ultimoDigitoPresionado = 'numero';  // Actualizar el tipo de tecla presionada
}

function operacion(oper) {
    // Validar que no se exceda el límite de caracteres
    if (parcial.length >= 17) {
        txtResul.innerHTML = "Límite alcanzado";
        return;
    }

    if (oper === "potencia") {
        if (numero !== "") {
            // Si ya hay un número antes del operador de potencia
            parcial = parcial + "^"; // Añadir el símbolo `^` a la operación visual
            operRealizada.innerHTML = parcial; // Actualizar la operación visual
            ultimoDigitoPresionado = "operacion"; // Asegurarse de que no se borre el número
        } else if (parcial !== "") {
            // Si no hay un número pero ya existe un resultado previo
            parcial = parcial + "^"; // Añadir el símbolo `^` al resultado actual
            operRealizada.innerHTML = parcial; // Actualizar la operación visual
            ultimoDigitoPresionado = "operacion";
        }
        return; // Salir para permitir ingresar el exponente
    }
    operadorSeleccionado = oper;  // Si no es un porcentaje, guarda la operación que eligió
    ultimoDigitoPresionado = "operacion";  // Actualizar el tipo de tecla presionada
    parcial = parcial + oper;  // Armar la fórmula matemática
    numero = "";  // Reiniciar el número
    operRealizada.innerHTML = parcial;  // Mostrar la operación actual
}

// Realizo el cálculo de la fórmula matemática
function calculo() {
    try {      
        let formula = parcial.replace(/%/g, "*0.01").replace(/\^/g, "**")
        let resultado = eval(formula); // Evaluar la fórmula matemática
        // Validar división por 0
        if (resultado === Infinity || isNaN(resultado)) {
            limpiar();
            txtResul.innerHTML = "Indefinido";
            return;
        }
        // Comprobar si el resultado es un número entero
        if (Number.isInteger(resultado)) {           
            resultado = resultado.toString();  // Si es entero, no agregamos decimales
            
        } else {
            // Redondear el resultado a dos decimales si no es entero
            resultado = parseFloat(resultado).toFixed(8); // Redondeo a dos decimales
            resultado = parseFloat(resultado).toString(); // Eliminamos ceros innecesarios
        }
        if(parcial != ""){
            txtResul.innerHTML = resultado;   // Mostrar el resultado
            parcial = resultado.toString();
            num = parcial;
            operRealizada.innerHTML = parcial;
            return;
        }
        txtResul.innerHTML = resultado;   // Mostrar el resultado
        parcial = resultado.toString();   // Actualizar parcial como string
        numero = "";
        operRealizada.innerHTML = parcial;
    } catch (error) {
        txtResul.innerHTML = "Error";
        limpiar();
    }
}

function punto() {
    // Verificar si ya existe un punto decimal en el número actual
    if (!numero.includes('.')) {
        numero = numero + '.';
        parcial = parcial + '.';
        operRealizada.innerHTML = parcial;
    }
}

function regresar() {
    // Si hay algo en la operación parcial, eliminamos el último carácter
    if (parcial.length > 0) {
        parcial = parcial.slice(0, -1);
        operRealizada.innerHTML = parcial;

        // Si el último digito presionado es un número, lo eliminamos del número ingresado
        if (ultimoDigitoPresionado === 'numero') {
            numero = numero.slice(0, -1);
        } else {
            // Si el último digito presionado fue un operador, restablecemos el número
            numero = "";
        }

        // Si no hay nada en 'parcial', muestra 0
        if (parcial === "") {
            operRealizada.innerHTML = "0";
            txtResul.innerHTML = "";
        }
    }
}

// Función que limpia todo
function limpiar() {
    operadorSeleccionado = "";
    parcial = "";
    txtResul.innerHTML = "";
    numero = "";
    operRealizada.innerHTML = 0;
}

function porcentaje() {
    // Verificar si ya se ingresó un número antes del símbolo de porcentaje
    if (numero !== "") {
        // Añadir el símbolo `%` visualmente
        parcial = parcial + "%";
        operRealizada.innerHTML = parcial; // Mostrar la operación actual

        // Convertir el número actual a porcentaje internamente (dividir entre 100)
        numero = (parseFloat(numero) / 100).toString();
        ultimoDigitoPresionado = "porcentaje";
    }
}