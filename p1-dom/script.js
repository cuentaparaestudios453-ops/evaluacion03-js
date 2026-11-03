// Elementos del DOM
const formulario = document.getElementById("form-pedido");
const producto = document.getElementById("producto");
const precio = document.getElementById("precio");
const cantidad = document.getElementById("cantidad");
const mensaje = document.getElementById("mensaje");
const filtro = document.getElementById("filtro");
const listaPedidos = document.getElementById("lista-pedidos");
const total = document.getElementById("total");

// Animaciones al desplazarse
const elementos = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
    const observador = new IntersectionObserver((entradas, observer) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visible");
                observer.unobserve(entrada.target);
            }
        });
    }, {
        threshold: 0.15
    });

    elementos.forEach(elemento => {
        observador.observe(elemento);
    });
} else {
    elementos.forEach(elemento => {
        elemento.classList.add("visible");
    });
}

console.log("CaféTec: JavaScript conectado correctamente.");
mensaje.textContent = "Sistema listo para registrar pedidos.";


// Modelo de pedidos
class Pedido {
    constructor(id, producto, precio, cantidad) {
        this.id = id;
        this.producto = producto;
        this.precio = precio;
        this.cantidad = cantidad;
        this.estado = "pendiente";
    }

    subtotal() {
        return this.precio * this.cantidad;
    }

    marcarEntregado() {
        this.estado = "entregado";
    }
}

// Arreglo de pedidos
let pedidos = [];
let siguienteId = 1;

// Mostrar pedidos y actualizar el total
function render() {
    listaPedidos.replaceChildren();

    const pedidosFiltrados = pedidos.filter(pedido => {
    return filtro.value === "todos" || pedido.estado === filtro.value;
    });

    pedidosFiltrados.forEach(pedido => {
        const elemento = document.createElement("li");

        const informacion = document.createElement("div");
        informacion.className = "pedido-info";

        const nombre = document.createElement("h3");
        nombre.textContent = pedido.producto;

        const detalle = document.createElement("p");
        detalle.textContent = `S/ ${pedido.precio.toFixed(2)} x ${pedido.cantidad} = S/ ${pedido.subtotal().toFixed(2)}`;

        informacion.append(nombre, detalle);

        const acciones = document.createElement("div");
        acciones.className = "pedido-acciones";

        const estado = document.createElement("span");
        estado.className = "estado-pedido";
        estado.textContent = pedido.estado;

        acciones.appendChild(estado);

        const botonEntregar = document.createElement("button");
        botonEntregar.type = "button";
        botonEntregar.className = "btn-entregar";
        botonEntregar.textContent = "Entregar";
        botonEntregar.dataset.id = pedido.id;
        botonEntregar.dataset.accion = "entregar";

        const botonEliminar = document.createElement("button");
        botonEliminar.type = "button";
        botonEliminar.className = "btn-eliminar";
        botonEliminar.textContent = "Eliminar";
        botonEliminar.dataset.id = pedido.id;
        botonEliminar.dataset.accion = "eliminar";

        if (pedido.estado === "pendiente") {
            acciones.appendChild(botonEntregar);
        }

        acciones.appendChild(botonEliminar);

        elemento.append(informacion, acciones);
        listaPedidos.appendChild(elemento);
    });

    const sumaTotal = pedidos.reduce((suma, pedido) => {
        return suma + pedido.subtotal();
    }, 0);

    total.textContent = `S/ ${sumaTotal.toFixed(2)}`;
}

// Primera visualización
render();


formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombreProducto = producto.value.trim();
    const precioPedido = Number(precio.value);
    const cantidadPedido = Number(cantidad.value);

    if (nombreProducto === "") {
        mensaje.textContent = "Ingresa el nombre del producto.";
        return;
    }

    if (precio.value.trim() === "" || precioPedido <= 0 || !Number.isFinite(precioPedido)) {
        mensaje.textContent = "El precio debe ser mayor que cero.";
        return;
    }

    if (cantidad.value.trim() === "" || cantidadPedido < 0 || !Number.isFinite(cantidadPedido)) {
        mensaje.textContent = "Ingresa una cantidad válida.";
        return;
    }

    const nuevoPedido = new Pedido(
        siguienteId,
        nombreProducto,
        precioPedido,
        cantidadPedido
    );

    pedidos.push(nuevoPedido);
    siguienteId++;

    formulario.reset();
    mensaje.textContent = "";

    render();
});


listaPedidos.addEventListener("click", (event) => {
    const boton = event.target.closest("button");

    if (!boton) return;

    const id = Number(boton.dataset.id);
    const accion = boton.dataset.accion;

    if (accion === "entregar") {
        const pedido = pedidos.find(pedido => pedido.id === id);

        if (pedido) {
            pedido.marcarEntregado();
        }
    }

    if (accion === "eliminar") {
        pedidos = pedidos.filter(pedido => pedido.id !== id);
    }
    render();
});

filtro.addEventListener("change", () => {
    render();
});
