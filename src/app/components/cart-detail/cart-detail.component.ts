import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  // Le Injection
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
      this.listCartDetail();
  }
  listCartDetail() { 
    // get cart items from cart service, those cart items will be available in the template file 
    this.cartItems = this.cartService.cartItems; 
 
    // subscribe to the Cart Service totalPrice so that to update the local totalPrice 
    this.cartService.totalPrice.subscribe(data => this.totalPrice = data); 
 
    // subscribe to the Cart Service totalQuantity so that to update the local totalQuantity 
    this.cartService.totalQuantity.subscribe(data => this.totalQuantity = data); 
 
    // compute cart total price and total quantity 
    this.cartService.computeCartTotals(); 
  } // end of listCartDetail()

  // Increments quantity by 1
  increaseQuantity(theCartItem: CartItem) { 
    this.cartService.addToCart(theCartItem); 
  }

  // Decrements quantity by 1
  decreaseQuantity(theCartItem: CartItem) { 
    this.cartService.decreaseQuantity(theCartItem); 
  } 

  // remove item from cart
  remove(theCartItem: CartItem) { 
    this.cartService.remove(theCartItem); 
  } 

} // End of CartDetailComponent
