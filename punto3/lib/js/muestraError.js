import { exportaAHtml } from "./exportaAHtml.js"
import { ProblemDetails } from "./ProblemDetails.js"

/**
 * Muestra un error en la consola y en un cuadro de
 * alerta el mensaje de una excepción.
 * @param { ProblemDetails | Error | null } error - Descripción del error.
 */
export function muestraError(error) {

    if (error === null) {
        console.error("Error");
        alert("Error");
    } else if (error instanceof ProblemDetails) {

        let mensaje = error.title;

        if (error.detail) {
            mensaje += `\n\n${error.detail}`;
        }

        mensaje += `\n\nCódigo: ${error.status}`;

        if (error.type) {
            mensaje += ` ${error.type}`;
        }

        // Mostrar el mensaje de error en la consola
        console.error("Mensaje de error:", mensaje);
        console.error("Detalles del error:", error);
        
        // Mostrar los headers del error en la consola
        console.error("Headers:");
        error.headers.forEach((valor, llave) => console.error(`${llave}: ${valor}`));

        // Mostrar el mensaje de error en una alerta
        alert(mensaje);

    } else {
        // En caso de que el error no sea un ProblemDetails
        console.error(error);
        alert(error.message);
    }

    // Exporta la función para que sea accesible desde HTML
    exportaAHtml(muestraError);
}
