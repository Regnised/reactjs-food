import { useContext } from 'react';
import { CartContext } from '../store/shopping-cart-context';
import Spinner from 'react-bootstrap/Spinner';

export default function ProductList() {
  const { items: meals, addItemToCart, isLoading } = useContext(CartContext);

  console.log(meals);

  if (isLoading) {
    return (
      <div className="center">
        <Spinner className="center" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <ul id="meals">
      {meals &&
        meals.map((meal) => (
          <li key={meal.id} className="meal-item">
            <article>
              <img src={`http://localhost:3000/${meal.image}`} />
              <h3>{meal.name}</h3>
              <p className="meal-item-price">{meal.price}</p>
              <p className="meal-item-description">{meal.description}</p>
              <div className="meal-item-actions">
                <button
                  className="button"
                  onClick={() => addItemToCart(meal.id)}
                >
                  Add to cart
                </button>
              </div>
            </article>
          </li>
        ))}
    </ul>
  );
}
