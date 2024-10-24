/**
 * Clase que representa los detalles de errores devueltos por un servicio.
 */
export class ProblemDetails extends Error {

    /**
     * Constructor de la clase ProblemDetails.
     * 
     * @param {number} status - El código de estado HTTP del error.
     * @param {Headers} headers - Los encabezados de la respuesta HTTP.
     * @param {string} title - El título del error.
     * @param {string} [type] - El tipo de error (opcional).
     * @param {string} [detail] - Información adicional sobre el error (opcional).
     */
    constructor(status, headers, title, type, detail) {
        super(title); // Llama al constructor de la clase Error con el título del error.

        /**
         * Código de estado HTTP.
         * @type {number}
         * @readonly
         */
        this.status = status;

        /**
         * Encabezados de la respuesta HTTP.
         * @type {Headers}
         * @readonly
         */
        this.headers = headers;

        /**
         * Tipo de error (por ejemplo, una URI que identifica el tipo de error).
         * @type {string | undefined}
         * @readonly
         */
        this.type = type;

        /**
         * Información detallada sobre el error.
         * @type {string | undefined}
         * @readonly
         */
        this.detail = detail;

        /**
         * Título del error, heredado de la clase Error.
         * @type {string}
         * @readonly
         */
        this.title = title;
    }
}
