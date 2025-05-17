const buyAirtimeForm = document.getElementById('buy-airtime-form');
const phoneNumberInput = document.getElementById('phone-number');
const amountInput = document.getElementById('amount');
const networkProviderSelect = document.getElementById('network-provider');
const buyAirtimeButton = document.getElementById('buy-airtime-button');
const resultDiv = document.getElementById('result');

buyAirtimeButton.addEventListener('click', async (e) => {
  e.preventDefault();
  const phoneNumber = phoneNumberInput.value;
  const amount = amountInput.value;
  const networkProvider = networkProviderSelect.value;

  if (!phoneNumber || !amount || !networkProvider) {
    resultDiv.innerHTML = 'Please fill in all fields';
    return;
  }

  try {
    const response = await fetch('/buy-airtime', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumber,
        amount,
        networkProvider,
      }),
    });

    const result = await response.json();

    if (result.success) {
      resultDiv.innerHTML = 'Airtime purchased successfully!';
    } else {
      resultDiv.innerHTML = 'Error purchasing airtime';
    }
  } catch (error) {
    console.error(error);
    resultDiv.innerHTML = 'Error purchasing airtime';
  }
});