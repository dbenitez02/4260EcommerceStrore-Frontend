import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service'; 
import { Product } from 'src/app/common/product'; 
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  // le property will be available in product-detail.component.html
  product: Product = new Product();

  // Le injection
  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => { this.getProductDetail(); });
  }

  // receive Product data from the service and assign it to the product property  
  getProductDetail() {
    // get the id value in string and convert it to a number 
    // “+” convert the string value to a number  
    // get()! tells the compiler that the returned value of the get() is not null 
    const currentProductId: number = +this.route.snapshot.paramMap.get('id')!; 

    // get product for current product id, getProduct() is defined in product service 
    this.productService.getProduct(currentProductId).subscribe( 
        data => { this.product = data; } 
      ); 
  } // End of getProductDetail()
  
} // End of ProductDetailComponent

