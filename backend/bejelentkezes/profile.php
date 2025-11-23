<?php
require 'auth.php';

$user = authenticate();

echo json_encode([
    "felhasznalonev" => $user->sub,
    "rangId" => $user->rangId
]);
