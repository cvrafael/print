<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['arquivo'])) {
        $arquivos = $_FILES['arquivo'];

        
        if ($arquivos['error'][0] === UPLOAD_ERR_NO_FILE) {
            echo 'Nenhum arquivo selecionado.';
            exit;
        }

        
        $arquivos_temp = [];
        foreach ($arquivos['tmp_name'] as $tmp_name) {
            $arquivos_temp[] = $tmp_name;
        }

        

        exit; 
    }
}
?>
