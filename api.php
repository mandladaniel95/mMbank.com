<?php include 'db.php';
if(isset($_GET['approve'])){
  $ref=$conn->real_escape_string($_GET['approve']);
  $conn->query("UPDATE deposits SET status='approved' WHERE reference='$ref'");
  $d=$conn->query("SELECT * FROM deposits WHERE reference='$ref'")->fetch_assoc();
  if($d){ $conn->query("UPDATE users SET balance = balance + {$d['amount']} WHERE id={$d['user_id']}"); }
  header("Location: index.php"); exit;
}