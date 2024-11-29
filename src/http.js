export async function fetchMeals() {
  const response = await fetch('http://localhost:3000/meals');
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Fetching meals error!');
  }

  return resData;
}
