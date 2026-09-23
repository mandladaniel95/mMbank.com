<?php include 'db.php';
$conn->query("CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, fullname VARCHAR(100), email VARCHAR(100) UNIQUE, password VARCHAR(255), balance DECIMAL(10,2) DEFAULT 0, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)");
$conn->query("CREATE TABLE IF NOT EXISTS deposits (id INT AUTO_INCREMENT PRIMARY KEY, user_id INT, amount DECIMAL(10,2), method VARCHAR(20), status VARCHAR(20) DEFAULT 'pending', reference VARCHAR(100), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)");

if(isset($_POST['email'])){
  $f=$conn->real_escape_string($_POST['fullname']);
  $e=$conn->real_escape_string($_POST['email']);
  $p=password_hash($_POST['password'], PASSWORD_DEFAULT);
  if($conn->query("INSERT INTO users (fullname,email,password) VALUES ('$f','$e','$p')")){
    header("Location: login.php"); exit;
  } else {
    $err="Email already exists";
  }
}
?>
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="style.css">
<title>Register - mMbank</title>
</head>
<body>
<div class="deposit-panel">
<h2>Create mMbank Account</h2>
<p style="font-size:14px;color:#666">Start banking in 30 seconds</p>
<?php if(isset($err)) echo "<p style='color:red;background:#ffe0e0;padding:10px;border-radius:8px'>$err</p>"; ?>
<form method="POST">
<input type="text" name="fullname" placeholder="Full Name" required>
<input type="email" name="email" placeholder="Email address" required>
<input type="password" name="password" placeholder="Create password" required minlength="6">
<button type="submit">CREATE ACCOUNT</button>
</form>
<p style="text-align:center;margin-top:15px">Have account? <a href="login.php" style="color:#e30613;font-weight:bold">Login</a></p>
<p style="font-size:11px;color:#999;text-align:center;margin-top:20px">By registering you agree to FICA verification for withdrawals over R1000</p>
</div>
</body>
</html>