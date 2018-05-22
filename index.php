<!DOCTYPE html>

<html lang="en">

    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>5card</title>
        <link rel="stylesheet" href="css/style.css" />
    </head>
    
    <body>
        <script src="http://localhost:8098"></script>
        <?php echo file_get_contents( 'cards.svg' ); ?>

        <div id="app"></div>
        
        <script src="dist/bundle.js"></script>
    </body>
    
</html>