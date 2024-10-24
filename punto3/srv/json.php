<?php
// json.php

// Verifica que el método de la solicitud sea POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Configura la respuesta para que sea JSON
    header('Content-Type: application/json; charset=utf-8');

    // Lee los datos JSON recibidos
    $jsonData = file_get_contents('php://input');
    $data = json_decode($jsonData, true); // Convierte a un array asociativo

    // Verifica que los datos tengan las claves correctas
    if (isset($data['saludo']) && isset($data['nombre'])) {
        // Construye una respuesta con el saludo
        $respuesta = [
            'mensaje' => $data['saludo'] . $data['nombre'] . '!'
        ];

        // Devuelve la respuesta como JSON
        echo json_encode($respuesta);
    } else {
        // Si faltan datos, devuelve un error
        http_response_code(400);
        echo json_encode(['error' => 'Datos inválidos']);
    }
} else {
    // Si no es POST, devuelve un error de método no permitido
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
}
?>
