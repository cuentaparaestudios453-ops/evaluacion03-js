const formulario = document.getElementById("form-clima");
const entrada = document.getElementById("ciudad");
const boton = document.getElementById("buscar");
const mensaje = document.getElementById("mensaje");
const resultado = document.getElementById("resultado");
const pruebas = document.getElementById("pruebas");

// Primera llamada: buscar ciudad y coordenadas
const buscarCiudad = async (nombre) => {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(nombre)}&count=1&language=es`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error de geocodificación: ${response.status}`);
    }

    const datos = await response.json();

    if (!datos.results || datos.results.length === 0) {
        throw new Error("No se encontró la ciudad. Intenta con otro nombre.");
    }

    return datos.results[0];
};

// Segunda llamada: obtener el clima
const obtenerClima = async (lat, lon) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error al consultar el clima: ${response.status}`);
    }

    return await response.json();
};

// Consultar una ciudad completa
const consultarClima = async (nombre) => {
    const ciudad = await buscarCiudad(nombre);
    const clima = await obtenerClima(ciudad.latitude, ciudad.longitude);

    return { ciudad, clima };
};

// Mostrar el clima en pantalla
formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    boton.disabled = true;
    mensaje.textContent = "Cargando...";
    resultado.hidden = true;

    try {
        const { ciudad, clima } = await consultarClima(entrada.value.trim());

        document.getElementById("nombre").textContent = ciudad.name;
        document.getElementById("region").textContent =
            `Región: ${ciudad.admin1 ?? "No disponible"}`;
        document.getElementById("temperatura").textContent =
            `Temperatura: ${clima.current.temperature_2m} °C`;
        document.getElementById("viento").textContent =
            `Viento: ${clima.current.wind_speed_10m} km/h`;

        resultado.hidden = false;
        mensaje.textContent = "";
    } catch (error) {
        mensaje.textContent = error.message === "Failed to fetch"
            ? "No hay conexión. Comprueba tu internet."
            : error.message;
    } finally {
        boton.disabled = false;
    }
});

// Comparar consultas secuenciales y paralelas, tres veces
document.getElementById("comparar").addEventListener("click", async () => {
    const ciudades = ["Lima", "Cusco", "Arequipa"];
    const resultados = [];

    pruebas.textContent = "Midiendo tiempos...";

    try {
        for (let i = 1; i <= 3; i++) {
            let inicio = performance.now();

            for (const nombre of ciudades) {
                await consultarClima(nombre);
            }

            const secuencial = performance.now() - inicio;

            inicio = performance.now();

            await Promise.all(ciudades.map(nombre => consultarClima(nombre)));

            const paralelo = performance.now() - inicio;

            resultados.push(
                `Prueba ${i}: Secuencial ${secuencial.toFixed(2)} ms | Promise.all ${paralelo.toFixed(2)} ms`
            );
        }

        pruebas.textContent = resultados.join("\n");
    } catch (error) {
        pruebas.textContent = `Error: ${error.message}`;
    }
});

// Comprobar qué sucede si una ciudad falla
document.getElementById("probar").addEventListener("click", async () => {
    const ciudades = ["Lima", "Xyzabc", "Cusco"];

    const resultados = await Promise.allSettled(
        ciudades.map(async nombre => {
            const { ciudad, clima } = await consultarClima(nombre);
            return `${ciudad.name}: ${clima.current.temperature_2m} °C`;
        })
    );

    pruebas.textContent = resultados.map((item, i) => {
        return item.status === "fulfilled"
            ? `Resultado ${i + 1}: ${item.value}`
            : `Resultado ${i + 1}: Error - ${item.reason.message}`;
    }).join("\n");
});