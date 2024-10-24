/**
 * Permite que los eventos de HTML usen la función.
 * Registra la función en el objeto `window` con su nombre.
 * 
 * @param {function} functionInstance - La función que será accesible desde HTML.
 */
export function exportaAHtml(functionInstance) {
    const nombreFuncion = nombreDeFuncionParaHtml(functionInstance);
    if (nombreFuncion) {
        window[nombreFuncion] = functionInstance;
    } else {
        console.error("No se pudo exportar la función a HTML. La función no tiene un nombre válido.");
    }
}

/**
 * Obtiene el nombre de una función. Si la función es anónima o no tiene un nombre claro,
 * se devuelve `undefined` para evitar errores.
 * 
 * @param {function} valor - La función de la cual se obtendrá el nombre.
 * @returns {string|undefined} - El nombre de la función, o `undefined` si no tiene nombre.
 */
export function nombreDeFuncionParaHtml(valor) {
    if (typeof valor !== "function") {
        console.error("El valor proporcionado no es una función.");
        return undefined;
    }

    // Intenta obtener el nombre de la función
    const nombre = valor.name;
    
    if (!nombre) {
        // La función es anónima o no tiene nombre
        console.error("La función es anónima o no tiene un nombre.");
        return undefined;
    }

    // Divide el nombre en palabras por si contiene espacios (aunque no es común)
    const names = nombre.split(/\s+/g);
    return names[names.length - 1];
}
