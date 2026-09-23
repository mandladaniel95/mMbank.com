<?php include 'db.php';
$payload=file_get_contents('php://input');
$event=json_decode($payload,true);
if(($event['event']??'')=='charge.success'){
  $ref=$event['data']['reference'];
  $conn->query("UPDATE deposits SET status='approved' WHERE reference='$ref'");
}
http_response_code(200);