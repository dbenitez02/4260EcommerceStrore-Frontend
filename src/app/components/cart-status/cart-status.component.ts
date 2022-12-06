import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {
  // two properties of CartStatus component 
  totalPrice: number = 0.0; 
  totalQuantity: number = 0;

  //  Le injection
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.updateCartStatus();
  }

  updateCartStatus() { 
    // totalPrice in Cart Service is defined as Subject which is a type of Observable  
    // subscribe to the Cart Service totalPrice so that to update the local totalPrice 
    // data refers to the value in the Observable, i.e., the Cart Service totalPrice. 
      this.cartService.totalPrice.subscribe( data => this.totalPrice = data ); 
     
    // totalQuantity in Cart Service is defined as Subject which is a type of Observable  
    // subscribe to the Cart Service totalQuantity so that to update the local totalQuantity 
      this.cartService.totalQuantity.subscribe( data => this.totalQuantity = data ); 
  } // end of updateCartStatus() 

} //  End of CartStatusComponent
