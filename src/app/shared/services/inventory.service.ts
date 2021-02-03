import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  itemsInventory: any = [
    {product: "Mesa", quantity: 10, price: 320, total: 3200,inventoryOutputs:10,date: "01/05/2021" },
    {product: "Sillón", quantity: 10, price: 320, total: 3200, inventoryOutputs:0,date: "03/12/2021" },
    {product: "Silla", quantity: 10, price: 320, total: 3200,inventoryOutputs:0, date: "22/03/2020" },
    {product: "Ropero", quantity: 10, price: 320, total: 3200,inventoryOutputs:0, date: "11/02/2021" },
    {product: "Mesa", quantity: 10, price: 320, total: 3200,inventoryOutputs:5, date: "23/01/2020" },
  ];
  private inventoryProducts = new BehaviorSubject<any>(this.itemsInventory);
  
  itemsProducts: any = [
    {name: "Mesa", description: "Una mesa ...", total:0,inventoryOutputs:0,},
    {name: "Sillón", description: "Una mesa ...",total:0,inventoryOutputs:0},
    {name: "Silla", description: "Una mesa ..." ,total:0,inventoryOutputs:0},
    {name: "Ropero", description: "Una mesa ...",total:0,inventoryOutputs:0},
    {name: "Mesa", description: "Una mesa ...",total:0,inventoryOutputs:0},
  ]
  private products = new BehaviorSubject<any>(this.itemsProducts);

  constructor() { }

  public customInventoryProducts$ = this.inventoryProducts.asObservable();
  public updateInventoryProducts(inventoryProducts: any): void {
    this.inventoryProducts.next(inventoryProducts);
  }

  public customProducts$ = this.products.asObservable();
  public updateProducts(products: any): void {
    this.products.next(products);
  }
  
}
