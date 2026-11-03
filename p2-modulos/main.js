import Pedido, { calcularTotal, resumen, pedidosEjemplo } from "./pedidos.js";
import { render } from "./ui.js";

// Elementos del DOM
const formulario = document.getElementById("form-pedido");
const producto = document.getElementById("producto");
const precio = document.getElementById("precio");
const cantidad = document.getElementById("cantidad");
const mensaje = document.getElementById("mensaje");
const filtro = document.getElementById("filtro");
const listaPedidos = document.getElementById("lista-pedidos");
const total = document.getElementById("total");

// Arreglo de pedidos
let pedidos = [];
let siguienteId = 1;

// Actualizar la interfaz
const actualizar = () => {
    render(pedidos, filtro, listaPedidos, total);
};

// Comprobar los cálculos del enunciado
console.log("Total correcto:", calcularTotal(pedidosEjemplo).toFixed(2));
console.log(resumen(pedidosEjemplo[0]));
console.log(resumen(pedidosEjemplo[1]));

actualizar();

// Registrar pedidos
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

    const nuevoPedido = new Pedido({
        id: siguienteId,
        producto: nombreProducto,
        precio: precioPedido,
        cantidad: cantidadPedido
    });

    pedidos = [...pedidos, nuevoPedido];
    siguienteId++;

    formulario.reset();
    mensaje.textContent = "";
    actualizar();
});

// Entregar y eliminar pedidos
listaPedidos.addEventListener("click", (event) => {
    const boton = event.target.closest("button");

    if (!boton) return;

    const id = Number(boton.dataset.id);
    const accion = boton.dataset.accion;

    if (accion === "entregar") {
        pedidos = pedidos.map(pedido => {
            return pedido.id === id ? pedido.marcarEntregado() : pedido;
        });
    }

    if (accion === "eliminar") {
        pedidos = pedidos.filter(pedido => pedido.id !== id);
    }

    actualizar();
});

// Filtrar pedidos
filtro.addEventListener("change", actualizar);