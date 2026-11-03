## Pregunta 1: Análisis de eventos del DOM

### Descripción

En esta actividad se identificaron los eventos necesarios para desarrollar el sistema de registro de pedidos de la cafetería CaféTec. Se analizaron las interacciones del usuario con el formulario, el filtro y la lista de pedidos.

### Tabla de eventos

| Elemento | Evento | Acción |
|---|---|---|
| `#form-pedido` | `submit` | Valida los datos y registra un nuevo pedido utilizando `preventDefault()`. |
| `#filtro` | `change` | Filtra los pedidos según el estado seleccionado. |
| `#lista-pedidos` | `click` | Permite entregar o eliminar pedidos mediante delegación de eventos. |
| Documento HTML | `DOMContentLoaded` | Inicializa la aplicación y prepara la visualización inicial. |

### Análisis

Se identificaron tres eventos principales para las interacciones del usuario: `submit`, `change` y `click`.

El evento `submit` permite registrar pedidos sin recargar la página. El evento `change` actualiza la visualización según el filtro seleccionado y el evento `click` permite ejecutar acciones sobre los pedidos.

Para administrar los botones de entregar y eliminar se utilizará delegación de eventos, colocando un único listener en el elemento `#lista-pedidos`.

Esta organización permite controlar las interacciones de manera centralizada y facilita el mantenimiento del código.

### Evidencias

- Tabla de eventos: análisis inicial de las interacciones.
- Captura de la página funcionando: `img/p1/01-pagina-inicial.png`.
- Las demás capturas se agregarán conforme se desarrollen y prueben las funcionalidades.