import React from 'react'; 
import "./Cart.css"

function Cart ({ cart}) {
    return (
    <>
    <div className="cart bg-secondary text-white mb-5 mx-5 mt-2 py-3 px-3">
        <p className="text-center">Currently in cart:</p>
        <ul className="list-group">
        {cart.map((item) => (
            <li className="list-group-item" key={item.id}>
              {item.name} - {item.price} EUR
            </li>
          ))}
        </ul>
    </div>
    </>
    )
}
export default Cart;
