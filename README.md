## Pregunta 1: Análisis de eventos del DOM

### Descripción

En esta actividad se desarrolló un sistema de registro de pedidos para la cafetería CaféTec. Se trabajó con eventos del DOM, objetos, arreglos y manipulación de elementos HTML mediante JavaScript.

### Tabla de eventos

| Elemento | Evento | Acción |
| :--- | :--- | :--- |
| `#form-pedido` | `submit` | Valida los datos y registra un nuevo pedido utilizando `preventDefault()`. |
| `#filtro` | `change` | Actualiza la lista según el estado seleccionado. |
| `#lista-pedidos` | `click` | Permite entregar o eliminar pedidos mediante delegación de eventos. |

### Análisis

Se identificaron tres eventos principales para las interacciones del usuario: `submit`, `change` y `click`.

El evento `submit` permite registrar pedidos sin recargar la página. El evento `change` actualiza la visualización según el filtro seleccionado y el evento `click` permite ejecutar acciones sobre los pedidos.

Para administrar los botones de entregar y eliminar se utilizó delegación de eventos, colocando un único listener en el elemento `#lista-pedidos`.

### Estructura e implementación

Se crearon tres archivos para organizar el desarrollo:

- `index.html`: contiene la estructura de la aplicación.
- `styles.css`: contiene los estilos de la interfaz.
- `script.js`: contiene la lógica y las interacciones de la aplicación.

Se utilizó el atributo `defer` para ejecutar JavaScript después de analizar el documento HTML.

Para representar los pedidos se creó la clase `Pedido`, con las propiedades `id`, `producto`, `precio`, `cantidad` y `estado`. También se implementaron los métodos `subtotal()` y `marcarEntregado()`.

Se utilizó un arreglo para almacenar los pedidos y una función `render()` para actualizar la lista y calcular el total cada vez que se realiza un cambio.

### Validaciones

Se implementaron validaciones para evitar registrar productos sin nombre, precios menores o iguales a cero y cantidades negativas.

Se utilizó `preventDefault()` para evitar que el formulario recargue la página y `novalidate` para controlar los mensajes de validación mediante JavaScript.

### Funcionalidades implementadas

- Registrar nuevos pedidos.
- Calcular el subtotal de cada pedido.
- Actualizar el total general.
- Marcar pedidos como entregados.
- Eliminar pedidos.
- Filtrar pedidos por estado: todos, pendientes y entregados.

### Delegación de eventos

Se utilizó un único evento `click` en `#lista-pedidos` para controlar los botones Entregar y Eliminar.

Esta técnica permite administrar los eventos desde un elemento padre, evitando agregar un listener individual a cada botón.

### Prueba de seguridad

Se realizó una prueba utilizando el siguiente texto como nombre de producto:

```html
<img src=x onerror="alert(1)">
```

El contenido se mostró literalmente en la lista y no se ejecutó ninguna alerta.

Se decidió utilizar `textContent` para mostrar los nombres de los productos, ya que permite tratarlos como texto y evita que el navegador interprete las etiquetas HTML ingresadas por el usuario.

En cambio, `innerHTML` interpreta el contenido como HTML y puede generar riesgos si se utiliza directamente con datos no confiables.

Por este motivo, se conservó `textContent` en la implementación.

### Diseño de la interfaz

Se personalizó la interfaz de CaféTec utilizando una paleta de cinco colores: `#1F1412`, `#3C2724`, `#6B3F2A`, `#C79B53` y `#F3E6C6`.

Se utilizó CSS para crear un diseño adaptable, con tarjetas, botones personalizados y efectos visuales.

También se implementaron animaciones de aparición mediante `IntersectionObserver`, permitiendo que los elementos se muestren suavemente al desplazarse por la página.

### Evidencias

**Interfaz inicial**

![Interfaz inicial de CaféTec](img/p1/01-pagina-inicial.png)

**Conexión de JavaScript**

![Conexión de JavaScript](img/p1/02-conexion-javascript.png)

**Animaciones al desplazarse**

![Animaciones de CaféTec](img/p1/03-animaciones.gif)

**Prueba de seguridad con innerHTML**

![Alerta ejecutada mediante innerHTML](img/p1/04-prueba-innerHTML.png)

**Prueba de seguridad con textContent**

![Contenido mostrado como texto mediante textContent](img/p1/05-prueba-textContent.png)

### Comprobaciones realizadas

Se verificó el registro de pedidos, las validaciones, el funcionamiento de los botones y el filtrado por estado. También se comprobó que los identificadores originales del HTML se mantuvieran y que la consola no presentara errores durante las pruebas.

### Bitácora de uso de IA – Pregunta 1

| # | Pregunta | IA usada | ¿Qué propuso la IA? | Decisión | ¿Por qué? |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | P1 | ChatGPT | Generar una función `render()` para mostrar pedidos, aplicar filtros y calcular el total mediante `reduce()`. | Corregí y amplié | La propuesta servía como base, pero agregué los botones de entregar y eliminar, los estados y las clases necesarias para mantener el diseño de CaféTec. Verifiqué el funcionamiento registrando, filtrando y eliminando pedidos. |
| 2 | P1 | ChatGPT | Utilizar `createElement()` y `textContent` para mostrar los datos ingresados por el usuario de forma segura. | Acepté | Mantuve esta forma de insertar los nombres de los productos y realicé una prueba con el texto `<img src=x onerror="alert(1)">`. Comprobé que se mostraba como texto y que no se ejecutaba ninguna alerta. |

### Comparación entre textContent e innerHTML

Para comprobar la diferencia entre ambas propiedades, se analizó cómo insertan el contenido ingresado por el usuario.

- `textContent`: muestra el contenido como texto, por lo que no interpreta las etiquetas HTML.
- `innerHTML`: interpreta el contenido como HTML, lo que puede permitir la ejecución de código malicioso si se utiliza con datos no confiables.

En la prueba realizada con el texto `<img src=x onerror="alert(1)">`, se comprobó que `textContent` lo mostraba literalmente, sin ejecutar ninguna alerta.

Por seguridad, se decidió conservar `textContent` en la función `render()`, evitando que los datos ingresados por los usuarios sean interpretados como código HTML.