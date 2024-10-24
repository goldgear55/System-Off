<?php
require_once __DIR__ . "/devuelveResultadoNoJson.php";

function devuelveJson($resultado)
{
    $json = json_encode($resultado);

    if ($json === false) {
        // Si no se puede codificar el resultado como JSON
        devuelveResultadoNoJson();
    } else {
        // Respuesta JSON exitosa
        http_response_code(200);
        header("Content-Type: application/json");
        echo $json;
    }
}
?>
