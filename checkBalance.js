const balance = 1000.00;
const accountNumber = "1234567890";

function checkBalance(accountNumber) {
  if (accountNumber === "1234567890") {
    return balance;
  } else {
    return "Account not found";
  }
}

const currentBalance = checkBalance(accountNumber);
console.log(`Your current balance is: ${currentBalance}`);
