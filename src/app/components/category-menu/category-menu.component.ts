import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.css']
})
export class CategoryMenuComponent implements OnInit {
  // define an array to contain ProductCategory objects 
  productCategories: ProductCategory[]; // available in component template file by {{ }} 

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.listProductCategories();
  }

  listProductCategories() { 
    // JSON.stringify() method converts a JavaScript object or value to a JSON string 
    this.productService.getProductCategories().subscribe( 
          data => { 
            console.log('Product Categories=' + JSON.stringify(data)); // write JSON data to console 
            this.productCategories = data; 
          } ); 
      }    // end of listProductCategories()

}
