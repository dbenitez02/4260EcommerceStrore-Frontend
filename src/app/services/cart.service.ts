import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'; 
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  // Le array for containing all items in a shoppign cart
  cartItems: CartItem[] = [];

  // Subject is a type of Observable that allows values to be multicasted to many Observers/subscribers.
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem) { 
    // check if we already have the item in our cart 
    let alreadyExistsInCart: boolean = false; 
    let existingCartItem: CartItem = undefined;
    if (this.cartItems.length > 0) { 
      // find the item in the cart based on item id 
      for (let ci of this.cartItems) { 
        if (ci.id === theCartItem.id) { 
          existingCartItem = ci; 
          break; 
        } 
      } 
      // check if we found it 
      alreadyExistsInCart = (existingCartItem != undefined) 
    }
    if (alreadyExistsInCart) { 
      // if the item is already in the cartItems array, just increase the quantity by 1  
      existingCartItem.quantity++; 
    } 
    else { 
      // if the item is not in cart, add the item to the cartItems array 
      this.cartItems.push(theCartItem); 
    }
      // compute cart total quantity and total price 
      this.computeCartTotals(); 
  } // end of addToCart()

  computeCartTotals() { 
    let tmpTotalPrice: number = 0; 
    let tmpTotalQuantity: number = 0; 
 
    for (let currentCartItem of this.cartItems) { 
      tmpTotalPrice += currentCartItem.quantity * currentCartItem.unitPrice; 
      tmpTotalQuantity += currentCartItem.quantity; 
    } // end of for 
 
    /* To feed a new value to observers/subscribers, just call next(theValue) method, the value will be 
    multicasted to the Observers registered to listen to the Subject and all observers/subscribers will 
    receive the new data. */ 
    this.totalPrice.next(tmpTotalPrice); 
    this.totalQuantity.next(tmpTotalQuantity); 
  } // end of computeCartTotals() 

  /**
   * 
   * @param theCartItem 
   */
  decreaseQuantity(theCartItem: CartItem) { 
    theCartItem.quantity--; 
    if (theCartItem.quantity == 0) { 
      this.remove(theCartItem); // remove item if quantity is 0 
    } 
    else {  
      this.computeCartTotals(); // update total price & total quantity  
    } 
  } //  End of decreaseQuantity()

  /**
   * Removes item from cart
   * @param theCartItem 
   */
  remove(theCartItem: CartItem) { 
    const index = this.cartItems.indexOf(theCartItem); // find index of the item in array 
 
    if (index > -1) { 
      this.cartItems.splice(index, 1); // remove item from array at the given index 
    } 
    this.computeCartTotals(); // update total price & total quantity 
  } //  End of remove()

} // End of CartService
