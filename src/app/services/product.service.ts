import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Product } from '../common/product'; 
import { Observable } from 'rxjs'; 
import { map } from 'rxjs/operators'; 
import { ProductCategory } from '../common/product-category';

// This @Injectable block is automatically generated.
@Injectable({
  providedIn: 'root'
})
export class ProductService {


  // URL to REST API endpoint from the prior Spring Boot backend project 
  private baseUrl = 'http://localhost:8080/api/products';
  
  // REST API endpoint for product category 
  private categoryURL = 'http://localhost:8080/api/product-category';

  // dependency injection:
  constructor(private httpClient: HttpClient) { }

    //getProduct() returns an Observable object containing a Product object. 
    getProduct(productId: number): Observable<Product> { 
    // build URL based on productId 
    const productURL = `${this.baseUrl}/${productId }`; 

    /* HttpClient get() returns an observable containing a Product in JSON form. JSON data 
    from REST can be converted directly to Product object, no need to define an interface to 
    unwrap because there are no _embedded and products attributes in the JSON data. */ 
    return this.httpClient.get<Product>(productURL); 
} 
    
    /**
    getProductList(categoryId: number): Observable<Product[]> { 

      // need to build URL based on categoryId. GetResponseProducts is response type 
      const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;
 
      return this.httpClient.get<GetResponseProducts>(searchUrl).pipe( 
          map(response => response._embedded.products) 
      ); 
    } // End of getProductList()

    */
    // This method, with two more parameters, gets products with pagination 
    getProductListPaginate( 
      thePage: number, 
      thePageSize: number, 
      theCategoryId: number): Observable<GetResponseProducts> { 
      // http://localhost:8080/api/products/search/findByCategoryId?id=1&page=0&size=10 
            const url = `${this.baseUrl}/search/findByCategoryId` 
            + `?id=${theCategoryId}&page=${thePage}&size=${thePageSize}`; 
      
            return this.httpClient.get<GetResponseProducts>(url); 
    } 

    // this method returns an Observable containing a Product array 
    searchProducts(theKeyword: string): Observable<Product[]> {
    
      // need to build URL based on the keyword 
      const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`; 
  
      /* HttpClient get() is an asynchronous method fetching data from the given URL and 
      returns GetResponseProducts as response type. 
      pipe() combines multiple RxJS operators to compose asynchronous operations. 
      map() transforms items emitted by an Observable by applying a function to each item. 
      This map() converts JSON results from Spring Data REST to an array of Product objects. So 
      after those methods, finally an Observable containing the Product array is returned. */ 
      return this.httpClient.get<GetResponseProducts>(searchUrl).pipe( 
          map(response => response._embedded.products)); 
    } //End of ProductService

    // This method returns an Observable containing a ProductCategory array 
    getProductCategories(): Observable<ProductCategory[]> { 
      return this.httpClient.get<GetResponseProductCategory>(this.categoryURL).pipe( 
          map(response => response._embedded.productCategory)); 
      }  // end of getProductCategories() 
  
} // End of ProductService

// Unwrap the JSON data for products to a Product arrray 
interface GetResponseProducts {  
  _embedded: { products: Product[];  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

// Unwrap the JSON data for product categories to ProductCategory array 
interface GetResponseProductCategory { _embedded: { productCategory: ProductCategory[]; } 
}  // end of GetResponseProductCategory


