
class Account {
  constructor(accountId, balance) {
    this.accountId = accountId;
    this.balance = balance;
  }

  // Get account balance
  getBalance() {
    return this.balance;
  }

  // Deposit funds
  deposit(amount) {
    if (amount > 0) {
      this.balance += amount;
      console.log(`Deposited ${amount}. New balance: ${this.balance}`);
    } else {
      console.log('Invalid deposit amount.');
    }
  }

  // Withdraw funds
  withdraw(amount) {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      console.log(`Withdrew ${amount}. New balance: ${this.balance}`);
    } else {
      console.log('Insufficient funds or invalid withdrawal amount.');
    }
  }

  // Update account information
  updateAccountInfo(newInfo) {
    // Update account information logic
    console.log('Account information updated successfully.');
  }
}

// Example usage
const account = new Account('12345', 1000.00);
console.log(`Initial balance: ${account.getBalance()}`);

account.deposit(500.00);
account.withdraw(200.00);
account.updateAccountInfo({ name: 'John Doe', email: 'john.doe@example.com' });


// Get account balance
fetch('/account/balance', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => response.json())
  .then((data) => console.log(`Account balance: ${data.balance}`))
  .catch((error) => console.error(error));

// Deposit funds
fetch('/account/deposit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ amount: 500.00 }),
})
  .then((response) => response.json())
  .then((data) => console.log(`Deposit successful: ${data.message}`))
  .catch((error) => console.error(error));

