<?php header('Content-Type: text/html; charset=Windows-1252'); ?>
<html>
<head>
<link rel="stylesheet" href="home.css">    
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

<script src="home.js"></script>
<script>
</script>
</head>
<body>
<script>

</script>

Title Keywords:<br>
<div id="TitleKeywords">
<?php echo ($_POST['TitleKeywords']);  ?>
</div>
<br><br>
Essay:<br>
<div id="essay">
<?php echo ($_POST['Essay']); ?>
</div>


<hr>
<h3>Feedback</h3>
<p id="demo"></p> 
<p id="demo1"></p>   
<p id="demo2"></p>  
<p id="demo4"></p>
<p id="demo7"></p>
<p id="demo8"></p>
<p id="demo9"></p>
<p id="demo10"></p>
<p id="demo10"></p>
<p id="demo13"></p>
<p id="demo14"></p>
<p id="demo15"></p>

<h3>Other Info</h3>
<p id="demo3"></p>
<p id="demo5"></p>
<p id="demo6"></p>
<p id="demo11"></p>
<p id="misc"></p>
<p id="misc1"></p>

</body>
    
</html>
