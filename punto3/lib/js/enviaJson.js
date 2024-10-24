import { consumeJson } from "./consumeJson.js";
import { exportaAHtml } from "./exportaAHtml.js";

/**
 * Envía una solicitud HTTP a la URL proporcionada con el cuerpo de datos en formato JSON.
 * @param {string} url - La URL a la que se envía la solicitud.
 * @param {Object} body - El cuerpo de la solicitud, convertido a JSON.
 * @param { "POST" | "PUT" | "PATCH" | "DELETE" | "TRACE" | "OPTIONS" | "CONNECT" | "HEAD" } [metodoHttp="POST"] - El método HTTP (por defecto es POST).
 * @returns {Promise<Object>} - El resultado de la respuesta procesada por `consumeJson`.
 */
export async function enviaJson(url, body, metodoHttp = "POST") {
    try {
        const response = await consumeJson(fetch(url, {
            method: metodoHttp,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json, application/problem+json"
            },
            body: JSON.stringify(body)
        }));

        return response;

    } catch (error) {
        console.error("Error en la solicitud:", error);
        throw error;
    }
}

exportaAHtml(enviaJson);
