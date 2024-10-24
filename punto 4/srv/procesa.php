<?php

require_once __DIR__ . "/../lib/php/recuperaTexto.php";
require_once __DIR__ . "/../lib/php/devuelveJson.php";

$respuesta = recuperaTexto("respuesta");
if($respuesta=="aguacate"){
$resultado="muy bien";
}
else{
    $resultado="muy mal";

}

devuelveJson($resultado);
