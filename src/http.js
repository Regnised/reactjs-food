export async function fetchMeals() {
  const response = await fetch('http://localhost:3000/meals');
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Fetching meals error!');
  }

  return resData;
}

export async function createOrder({ customer, items }) {
  const response = await fetch('http://localhost:3000/orders', {
    body: JSON.stringify({
      order: {
        items,
        customer,
      },
    }),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Creating order error!');
  }

  return resData.message;
}
