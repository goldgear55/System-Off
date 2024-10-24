import { exportaAHtml } from "./exportaAHtml.js";
import { ProblemDetails } from "./ProblemDetails.js";

/**
 * Espera a que la promesa de un fetch termine. Si
 * hay error, lanza una excepción. Si no hay error,
 * interpreta la respuesta del servidor como JSON y
 * la convierte en un literal de objeto.
 * 
 * @param { string | Promise<Response> } servicio
 * @returns {Promise<Object>} - Un objeto con headers y body.
 */
export async function consumeJson(servicio) {
    // Si 'servicio' es una cadena, realiza la solicitud.
    if (typeof servicio === "string") {
        servicio = fetch(servicio, {
            headers: { "Accept": "application/json, application/problem+json" }
        });
    } else if (!(servicio instanceof Promise)) {
        // Verifica si el tipo de servicio es incorrecto.
        throw new Error("Servicio de tipo incorrecto.");
    }

    const respuesta = await servicio;
    const headers = respuesta.headers;

    if (respuesta.ok) {
        // El servidor respondió correctamente.

        if (respuesta.status === 204) {
            // No hay contenido en la respuesta.
            return { headers, body: {} };
        } else {
            // Intenta interpretar el cuerpo como JSON.
            const texto = await respuesta.text();

            try {
                return { headers, body: JSON.parse(texto) };
            } catch (error) {
                // El cuerpo no es JSON, podría ser un error en formato texto.
                throw new ProblemDetails(
                    respuesta.status, headers, texto, "/error/errorinterno.html"
                );
            }
        }

    } else {
        // Hubo un error en la respuesta.
        const texto = await respuesta.text();

        if (texto === "") {
            // Sin texto en la respuesta, usar statusText.
            throw new ProblemDetails(
                respuesta.status, headers, respuesta.statusText
            );
        } else {
            // Intentar interpretar el error como un ProblemDetails en JSON.
            try {
                const { title, type, detail } = JSON.parse(texto);
                throw new ProblemDetails(
                    respuesta.status, headers,
                    typeof title === "string" ? title : respuesta.statusText,
                    typeof type === "string" ? type : undefined,
                    typeof detail === "string" ? detail : undefined
                );
            } catch (error) {
                // Si no es un ProblemDetails, lanzar un error genérico.
                if (error instanceof ProblemDetails) {
                    throw error;
                } else {
                    throw new ProblemDetails(
                        respuesta.status, headers, respuesta.statusText,
                        undefined, texto
                    );
                }
            }
        }
    }
}

// Exporta la función para su uso en HTML
exportaAHtml(consumeJson);
