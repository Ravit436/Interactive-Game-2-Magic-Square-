<?php

	$team = $_POST['team'];
	$mat = $_POST['solution'];

	$fileHandle = fopen("magicSquareAnswer", 'a');
	fwrite($fileHandle, "\t\tTeam : ".$team."\n\n");
	fwrite($fileHandle, "0\t|\t1\t2\t3\t4\n");
	fwrite($fileHandle, "________|__________________________________\n\n");
	fwrite($fileHandle, "1\t|\t".$mat[0][0]."\t".$mat[0][1]."\t".$mat[0][2]."\t".$mat[0][3]."\n");
	fwrite($fileHandle, "1\t|\t".$mat[1][0]."\t".$mat[1][1]."\t".$mat[1][2]."\t".$mat[1][3]."\n");
	fwrite($fileHandle, "1\t|\t".$mat[2][0]."\t".$mat[2][1]."\t".$mat[2][2]."\t".$mat[2][3]."\n");
	fwrite($fileHandle, "1\t|\t".$mat[3][0]."\t".$mat[3][1]."\t".$mat[3][2]."\t".$mat[3][3]."\n\n\n\n");
	fclose($fileHandle);

	echo "Team : ".$team;
?>