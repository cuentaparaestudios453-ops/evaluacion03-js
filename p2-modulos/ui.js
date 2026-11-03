export const render = (pedidos, filtro, listaPedidos, total) => {
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

        if (pedido.estado === "pendiente") {
            const botonEntregar = document.createElement("button");
            botonEntregar.type = "button";
            botonEntregar.className = "btn-entregar";
            botonEntregar.textContent = "Entregar";
            botonEntregar.dataset.id = pedido.id;
            botonEntregar.dataset.accion = "entregar";
            acciones.appendChild(botonEntregar);
        }

        const botonEliminar = document.createElement("button");
        botonEliminar.type = "button";
        botonEliminar.className = "btn-eliminar";
        botonEliminar.textContent = "Eliminar";
        botonEliminar.dataset.id = pedido.id;
        botonEliminar.dataset.accion = "eliminar";

        acciones.appendChild(botonEliminar);
        elemento.append(informacion, acciones);
        listaPedidos.appendChild(elemento);
    });

    const sumaTotal = pedidos.reduce((suma, pedido) => {
        return suma + pedido.subtotal();
    }, 0);

    total.textContent = `S/ ${sumaTotal.toFixed(2)}`;
};