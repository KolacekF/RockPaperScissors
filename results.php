<?php
$start=$_GET["start"];
$end=$_GET["end"];
$lenght=$_GET["lenght"];
$myfile = fopen("results.txt", "a") or die("Unable to open file!");
fwrite($myfile, date("d.m.Y___H:i:s"));
fwrite($myfile, date("___"));
fwrite($myfile, $start);
fwrite($myfile, date("___"));
fwrite($myfile, $end);
fwrite($myfile, date("___"));
fwrite($myfile, $lenght);
fwrite($myfile, date("___"));
fwrite($myfile, date("\n"));
fclose($myfile);
echo "uspech";
?>