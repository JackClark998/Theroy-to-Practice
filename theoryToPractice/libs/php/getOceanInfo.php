<?php

	$executionStartTime = microtime(true) / 1000;

  $url = 'http://api.geonames.org/oceanJSON?lat=' . $_REQUEST["latitude"] . '&lng=' . $_REQUEST["longitude"] . '&username=JackAClark';
  
  $curlObj = curl_init();
  curl_setopt($curlObj, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($curlObj, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($curlObj, CURLOPT_URL,$url);
  $curlOutput = curl_exec($curlObj);
  curl_close($curlObj);

  $decodedOutput = json_decode($curlOutput, true);

  $finalOutput['status']['code'] = "200";
	$finalOutput['status']['name'] = "ok";
	$finalOutput['status']['description'] = "mission saved";
	$finalOutput['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
  $finalOutput['data'] = $decodedOutput['ocean'];
  
  header('Content-Type: application/json; charset=UTF-8');

  echo json_encode($finalOutput);

?>

