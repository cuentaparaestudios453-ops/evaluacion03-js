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

## Pregunta 2: JavaScript moderno ES6+ – Sintaxis avanzada y módulos

### Descripción

En esta actividad se realizó la actualización de un código JavaScript antiguo a una versión moderna utilizando características de ES6+. También se trabajó con clases, módulos y exportación e importación de funciones para organizar mejor el código.

### 1. Cálculo manual y análisis del código antiguo

El código original utiliza `var` y el operador `||` para asignar una cantidad predeterminada de 1 cuando no existe una cantidad registrada.

Sin embargo, esta condición presenta un problema porque considera que el valor `0` también debe reemplazarse por 1.

Para comprobarlo, se realizó el cálculo manual:

| Producto | Precio | Cantidad | Subtotal |
| :--- | ---: | ---: | ---: |
| Café | S/ 6.00 | 2 | S/ 12.00 |
| Croissant | S/ 4.50 | 0 | S/ 0.00 |
| Jugo | S/ 8.00 | 1 | S/ 8.00 |
| **Subtotal** | | | **S/ 20.00** |

Cálculo del IGV:

- Subtotal: S/ 20.00
- IGV (18 %): S/ 3.60
- Total: S/ 23.60

Al ejecutar el código antiguo, el resultado es S/ 28.91, porque el operador `||` reemplaza la cantidad 0 del Croissant por 1.

Por este motivo, se utilizó el operador `??`, que conserva el valor 0 y asigna 1 únicamente cuando la cantidad es `null` o `undefined`.

### 2. Refactorización con ES6+

Se actualizaron las declaraciones de variables, funciones y operaciones utilizando características modernas de JavaScript.

El cálculo del total quedó de la siguiente manera:

```js
export const IGV = 0.18;

export const calcularTotal = (pedidos) => {
    const subtotal = pedidos.reduce((total, pedido) => {
        const { precio, cantidad = 1 } = pedido;
        return total + precio * (cantidad ?? 1);
    }, 0);

    return subtotal + subtotal * IGV;
};
```

También se implementó la función para generar el resumen de cada pedido:

```js
export const resumen = (pedido) => {
    const { producto, cantidad = 1, cliente } = pedido;
    const nombre = cliente?.nombre ?? "Anónimo";

    return `Pedido de ${nombre}: ${producto} x${cantidad}`;
};
```

Se comprobó el resultado utilizando el arreglo de pedidos del enunciado. El total obtenido fue S/ 23.60 y los resúmenes mostraron correctamente los nombres de los clientes o el valor predeterminado "Anónimo".

### 3. Tabla de características ES6+

| Característica ES6+ | Dónde se utilizó | ¿Por qué? |
| :--- | :--- | :--- |
| `const` y `let` | En `pedidos.js` y `main.js`. | Permiten declarar variables según si necesitan reasignarse o no. |
| Funciones flecha | En `calcularTotal()`, `resumen()` y otras funciones. | Simplifican la escritura de funciones. |
| Template literals | En los mensajes y resúmenes. | Permiten insertar variables dentro de cadenas de texto. |
| Destructuring | En `calcularTotal()` y `resumen()`. | Facilita extraer propiedades de los objetos. |
| `reduce()` | En `calcularTotal()` y el cálculo del total mostrado en la interfaz. | Permite acumular los subtotales de los pedidos. |
| Optional chaining `?.` | En `cliente?.nombre`. | Evita errores cuando el cliente no tiene información registrada. |
| Nullish coalescing `??` | En la cantidad y el nombre del cliente. | Permite asignar valores predeterminados sin reemplazar el cero. |
| Clases | En la clase `Pedido`. | Permiten organizar las propiedades y métodos de los pedidos. |
| Spread `...` | En `marcarEntregado()` y la actualización del arreglo. | Permite crear nuevos objetos y arreglos sin modificar los originales. |
| Módulos | En `pedidos.js`, `ui.js` y `main.js`. | Permiten separar las responsabilidades del código. |

### 4. Implementación de la clase Pedido y spread

Se convirtió el modelo de pedidos en una clase llamada `Pedido`, que contiene las propiedades y métodos necesarios para administrar cada registro.

```js
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
```

Se utilizó spread para crear un nuevo objeto con los mismos datos del pedido, cambiando únicamente su estado a "entregado".

También se utilizó spread para agregar pedidos al arreglo sin modificar el arreglo original:

```js
pedidos = [...pedidos, nuevoPedido];
```

Para actualizar el estado de los pedidos se utilizó `map()`, mientras que para eliminarlos se utilizó `filter()`.

### 5. Organización mediante módulos

El código se dividió en tres archivos JavaScript para mantener una mejor organización:

- **pedidos.js:** contiene la clase `Pedido`, el IGV, las funciones de cálculo y los pedidos de ejemplo.
- **ui.js:** contiene la función `render()`, encargada de actualizar la lista de pedidos y el total en la interfaz.
- **main.js:** importa las funciones y la clase necesarias, registra los eventos y conecta la lógica con los elementos HTML.

Para cargar el archivo principal se utilizó:

```html
<script type="module" src="./main.js"></script>
```

**Exportaciones utilizadas**

Se utilizó `export default` para la clase `Pedido`, porque es la clase principal del archivo y se importa como elemento principal.

También se utilizaron exportaciones nombradas (`export`) para las funciones y constantes, como `calcularTotal`, `resumen` e `IGV`, porque permiten importar específicamente los elementos necesarios.

En `ui.js` se utilizó una exportación nombrada para la función `render()`.

### 6. Prueba de ejecución con file:// y Live Server

Se abrió el archivo `index.html` directamente desde el explorador de archivos mediante `file://`.

Al realizar esta prueba, Google Chrome mostró un error de seguridad CORS al intentar cargar `main.js`. Esto ocurrió porque el navegador restringe la carga de módulos JavaScript cuando se ejecutan directamente desde archivos locales.

Como consecuencia, la estructura HTML y los estilos se mostraron, pero las funcionalidades de JavaScript no se ejecutaron.

Para solucionar este problema se utilizó Live Server desde Visual Studio Code, que permite ejecutar la página mediante HTTP y cargar correctamente los módulos.

**Comprobación:** al abrir el proyecto mediante Live Server se verificó que los cálculos, los eventos y las funcionalidades de los pedidos funcionaran correctamente.

### 7. Bitácora de uso de IA – Pregunta 2

| # | Pregunta | IA usada | ¿Qué propuso la IA? | Decisión | ¿Por qué? |
| :---: | :---: | :--- | :--- | :---: | :--- |
| 3 | P2 | Gemini | Refactorizar el código antiguo utilizando características ES6+, como funciones flecha, `reduce()`, `?.`, `??` y template literals. | Corrigió | Revisé el código propuesto y comprobé que faltaba destructuring, una característica solicitada en el enunciado. Agregué esa parte y verifiqué que el cálculo devolviera S/ 23.60. |
| 4 | P2 | ChatGPT | Explicó por qué los módulos JavaScript no se ejecutan al abrir directamente el HTML con `file://` y recomendó utilizar Live Server. | Aceptó | Comprobé el error CORS en la consola al abrir el archivo localmente. Después ejecuté el proyecto con Live Server y verifiqué que los módulos y las funcionalidades funcionaran correctamente. |

### 8. Evidencias

**Error al abrir el proyecto mediante file://**

![Error CORS al cargar módulos JavaScript](img/p2/01-error-file-cors.png)

**Refactorización generada por Gemini**

![Respuesta de Gemini sobre la refactorización ES6+](img/p2/02-refactorizacion-ia.png)

**Registro de pedidos**

![Pedidos registrados en la aplicación](img/p2/03-pedidos-registrados.png)

**Pedido marcado como entregado**

![Pedido entregado](img/p2/04-pedido-entregado.png)

**Filtro de pedidos**

![Filtrado de pedidos por estado](img/p2/05-filtro-pedidos.png)

**Comprobación del cálculo en consola**

![Resultado del cálculo correcto con IGV](img/p2/06-consola-calculo.png)

### 9. Comprobaciones realizadas

Se verificó el cálculo del total con IGV, obteniendo S/ 23.60. También se comprobó que el valor 0 se conservara correctamente y que los pedidos sin cantidad utilizaran el valor predeterminado de 1.

Se revisó la separación de responsabilidades entre los tres módulos y el funcionamiento de las importaciones y exportaciones.

Finalmente, se comprobó que la aplicación pudiera registrar pedidos, marcarlos como entregados, eliminarlos y filtrarlos por estado utilizando Live Server.