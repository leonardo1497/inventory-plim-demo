import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { InventoryService } from 'src/app/shared/services/inventory.service';
import { ToastService } from 'src/app/shared/toasts/toast-service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  formProduct: FormGroup;
  activeModal: NgbActiveModal;
  model: NgbDateStruct;
  positionItem;
  update = false;
  tittleModal="";
  inventoryProducts: any =[];
  items: any = [];
  inventoryProduct: any = [];

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private inventoryService: InventoryService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.initInventory();
    this.inventoryService.updateProducts(this.items);
    this.formProduct = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    })

  }

  open(modal) {
    this.tittleModal =" Crear un nuevo producto";
    this.update = false
    this.formProduct.reset()
    this.formProduct.get('name').setValue("")
    this.model = null
    this.activeModal = this.modalService.open(modal, { size: 'xl' });
  }

  editProduct(modal, position){
    this.tittleModal =" Actualizar un producto";
    this.update = true
    this.positionItem = position
    let product = this.items[position]
    this.formProduct.get('name').setValue(product.name)
    this.formProduct.get('description').setValue(product.description)
    this.activeModal = this.modalService.open(modal, { size: 'xl' });
  }
  detailsInventory(modal,position){
    this.positionItem = position
    let product = this.items[position]
    this.inventoryProduct = this.inventoryByProduct(product.name);
    this.activeModal = this.modalService.open(modal, { size: 'xl' });
  }
  saveProductData(){
    this.items.push(this.formProduct.value)
    this.inventoryService.updateProducts(this.items);
    this.initInventory();
    this.showSuccess("Guardado exitoso");
    this.modalService.dismissAll()
  }

  updateProductData(){
    this.items.splice(this.positionItem,1 ,this.formProduct.value)
    this.inventoryService.updateProducts(this.items);
    this.showSuccess("Actualización exitosa");
    this.initInventory();
    this.modalService.dismissAll()
  }

  updateProductsBasedOnInventory(){
    this.items.forEach(element => {
      let quantity=0, total=0, inventoryOutputs = 0;
        this.inventoryProducts.forEach(element1 => {
          if(element1.product==element.name){
            quantity += element1.quantity;
            total += element1.total;
            inventoryOutputs += element1.inventoryOutputs;
          }
        });
      element.quantity = quantity;
      element.total = total;
      element.inventoryOutputs = inventoryOutputs;
    });
  }

  inventoryByProduct(nameProduct){
    let inventoryProduct :any = []
    this.inventoryProducts.forEach(element => {
      if(element.product==nameProduct){
        inventoryProduct.push(element);
      }
    });
    return inventoryProduct;
  }
  initInventory(){
    this.inventoryService.customProducts$.subscribe(products =>{this.items = products;});
    this.inventoryService.customInventoryProducts$.subscribe(inventoryProducts =>{this.inventoryProducts = inventoryProducts;})
    this.updateProductsBasedOnInventory();
    this.inventoryService.updateProducts(this.items);
  }
  close(){
    this.activeModal.close();
  }
  showSuccess(message) {
    console.log(message)
    this.toastService.show(message, { classname: 'alert-success text-white font-xl', delay: 5000, icon:'fas fa-check-circle' });
  }
}
