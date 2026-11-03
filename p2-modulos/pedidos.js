export default class Pedido {
    constructor({ id, producto, precio, cantidad, estado = "pendiente", cliente = null }) {
        this.id = id;
        this.producto = producto;
        this.precio = precio;
        this.cantidad = cantidad;
        this.estado = estado;
        this.cliente = cliente;
    }

    subtotal() {
        return this.precio * (this.cantidad ?? 1);
    }

    marcarEntregado() {
        return new Pedido({ ...this, estado: "entregado" });
    }
}

export const IGV = 0.18;

export const calcularTotal = (pedidos) => {
    const subtotal = pedidos.reduce((total, pedido) => {
        const { precio, cantidad = 1 } = pedido;
        return total + precio * (cantidad ?? 1);
    }, 0);

    return subtotal + subtotal * IGV;
};

export const resumen = (pedido) => {
    const { producto, cantidad = 1, cliente } = pedido;
    const nombre = cliente?.nombre ?? "Anónimo";

    return `Pedido de ${nombre}: ${producto} x${cantidad}`;
};

export const pedidosEjemplo = [
    { producto: "Café", precio: 6, cantidad: 2, cliente: { nombre: "Ana" } },
    { producto: "Croissant", precio: 4.5, cantidad: 0 },
    { producto: "Jugo", precio: 8 }
];