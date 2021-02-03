import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbDate,NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { InventoryService } from 'src/app/shared/services/inventory.service';
import { ToastService } from 'src/app/shared/toasts/toast-service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  formInventory: FormGroup;
  formOutput: FormGroup
  activeModal: NgbActiveModal;
  dateEdit: NgbDate;
  model: NgbDateStruct;
  positionItem;
  update = false;
  items: any = [];
  products: any = [];
  stockProduct=0;
  constructor(private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private inventoryService: InventoryService,
    private toastService: ToastService) { 
    }

  ngOnInit() {
    this.inventoryService.customInventoryProducts$.subscribe(inventory =>{this.items = inventory})
    this.inventoryService.customProducts$.subscribe(product =>{this.products = product})
    this.formInventory = this.formBuilder.group({
      product: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      total: ['', Validators.required],
      date: ['', Validators.required],
      inventoryOutputs: [0]
    })
    this.formOutput = this.formBuilder.group({
      output:[0,Validators.required]
    })
  }

  open(modal) {
    this.update = false
    this.formInventory.reset()
    this.formInventory.get('product').setValue("")
    this.model = null
    this.activeModal = this.modalService.open(modal, { size: 'xl' });
  }

  editInventory(modal, position){
    this.update = true
    this.positionItem = position
    let inventoryProduct = this.items[position]
    let dateArray = inventoryProduct.date.split("/")
    let date = new  NgbDate(Number(dateArray[2]),Number(dateArray[1]), Number(dateArray[0]))
    this.formInventory.get('product').setValue(inventoryProduct.product)
    this.formInventory.get('quantity').setValue(inventoryProduct.quantity)
    this.formInventory.get('total').setValue(inventoryProduct.total)
    this.formInventory.get('price').setValue(inventoryProduct.price)
    this.formInventory.get('date').setValue(date)
    this.formInventory.get('inventoryOutputs').setValue(inventoryProduct.inventoryOutputs)
    this.model = date
    this.activeModal = this.modalService.open(modal, { size: 'xl' });
  }

  editOutput(modal, position){
    this.formOutput.reset()
    let inventoryProduct = this.items[position]
    this.stockProduct = inventoryProduct.quantity - inventoryProduct.inventoryOutputs
    this.positionItem = position
    this.formInventory.get('product').setValue(inventoryProduct.product)
    this.formInventory.get('quantity').setValue(inventoryProduct.quantity)
    this.formInventory.get('total').setValue(inventoryProduct.total)
    this.formInventory.get('price').setValue(inventoryProduct.price)
    this.formInventory.get('date').setValue(inventoryProduct.date)
    this.formInventory.get('inventoryOutputs').setValue(inventoryProduct.inventoryOutputs)
    this.activeModal = this.modalService.open(modal);
  }

  updateOutput(){
    var output = this.formOutput.get('output').value

    if(output  < 1 || output > this.stockProduct){
      this.showDanger("La cantidad deseada está fuera de los rangos del producto")
    }else{
      this.formInventory.get('inventoryOutputs').setValue(this.formInventory.get('inventoryOutputs').value + output)
      this.items.splice(this.positionItem,1 ,this.formInventory.value)
      this.inventoryService.updateInventoryProducts(this.items)
      this.showSuccess("Salida de producto exitosa");
      this.modalService.dismissAll()
    }
  }
  

  saveInventoryData(){
    this.changeFormatDate()
    this.items.push(this.formInventory.value)
    this.inventoryService.updateInventoryProducts(this.items)
    this.showSuccess("Guardado exitoso");
    this.modalService.dismissAll()
  }

  changeFormatDate(){
    let month = this.formInventory.value.date.month
    let day = this.formInventory.value.date.day
    if(month < 10){
      month = "0"+month
    }

    if(day < 10){
      day = "0"+day
    }
    this.formInventory.value.date = day+"/"+month+"/"+this.formInventory.value.date.year
  }

  updateInventoryData(){
    this.changeFormatDate()
    this.items.splice(this.positionItem,1 ,this.formInventory.value)
    this.inventoryService.updateInventoryProducts(this.items)
    this.showSuccess("Actualización exitosa");
    this.modalService.dismissAll()
  }

  showSuccess(message) {
    console.log(message)
    this.toastService.show(message, { classname: 'alert-success text-white font-xl', delay: 5000, icon:'fas fa-check-circle' });
  }

  showDanger(message) {
    this.toastService.show(message, { classname: 'alert-danger text-white font-xl', delay: 7000 ,icon: 'fas fa-exclamation-circle'});
  }

}
