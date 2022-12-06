import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service'; 
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  // new properties for pagination 
  thePageNumber: number = 1; // page number in ng-bootstrap is 1 based: starting from 1 not 0  
  thePageSize: number = 10; 
  theTotalElements: number = 0;

  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    // paramMap returns an Observable and it will give data only if we subscribe to it.
    this.route.paramMap.subscribe(() => { this.listProducts(); });
  }

  listProducts() { 
    // retrieve the value of a router parameter, named keyword, 
    // in doSearch(value: String), this.router.navigateByUrl(`/search/${value}`); 
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) { // route has a parameter named keyword indicating for search 
      this.handleSearchProducts(); 
    } 
    else {  // not search 
          this.handleListProducts(); 
    } 
  }

  // use keyword to search via REST API, and set values to the Product array, products 
  handleSearchProducts() { 
    // in app.module.ts, {path: 'search/:keyword', component: ProductListComponent}, 
    // in doSearch(value: String), this.router.navigateByUrl(`/search/${value}`); 
    // get()! tells the compiler that the returned value of the get() is not null 
    const term: string = this.route.snapshot.paramMap.get('keyword')!; 
    // now search for the products using the search term 
    this.productService.searchProducts(term).subscribe( 
          data => { this.products = data; } 
    ); 
  } // end of handleSearchProducts()

  handleListProducts() { 
    // check if the route parameter named "id" is available 
    // snapshot is state of route at this given moment 
    // paramMap is a map of all route parameters 
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id'); 
     
    if (hasCategoryId) { 
          // get the id value 
          // "+" convert the string value to a number  
          // get()! tells the compiler that the returned value of the get() is not null          
          this.currentCategoryId =+ this.route.snapshot.paramMap.get('id')!; 
    } 
    else { 
          // not category id available ... default to category id 1 
          this.currentCategoryId = 1; 
    }

    // Check if we have a different category than previous 
    // Note: Angular will reuse a component if it is currently being viewed 
    // if we have a different category id than previous, set thePageNumber back to 1 
    if (this.previousCategoryId != this.currentCategoryId) { 
      this.thePageNumber = 1; 
    } 

    this.previousCategoryId = this.currentCategoryId; 
    
    // get products for the given category id 
    this.productService.getProductListPaginate( 
    this.thePageNumber - 1, 
    this.thePageSize, 
    this.currentCategoryId).subscribe(this.processResult());       
    /* 
    this.productService.getProductList(this.currentCategoryId).subscribe( 
      data => { 
        this.products = data; 
      } 
    ); 
    */ 


  /* Use category id to get products via REST API and set values to the Product array.
  getProductList() (in product.service.ts) returns an observable containing a Product array.  
  We must subscribe to the Observable to return a subscriber. If subscription is successful, 
  the value (i.e., data) received from the Observable is assigned to products because of 
  this.products = data; */ 
  //this.productService.getProductList(this.currentCategoryId).subscribe( data => { this.products = data; } )  

  } // end of handleListProduct()

  addToCart(theProduct: Product) { 
    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`); 
    const theCartItem = new CartItem(theProduct); // create a CartItem object 
    this.cartService.addToCart(theCartItem); // add the CartItem object to cart
    } // End of addToCart()

  private processResult() { 
    return (data: any) => { 
      this.products = data._embedded.products; 
      this.thePageNumber = data.page.number + 1; 
      this.thePageSize = data.page.size; 
      this.theTotalElements = data.page.totalElements; 
    }; 
}
 
} // end of ProductListComponent


