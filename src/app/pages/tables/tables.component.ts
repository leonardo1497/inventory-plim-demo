import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbDate,NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  formInventory: FormGroup;
  activeModal: NgbActiveModal;
  dateEdit: NgbDate;
  model: NgbDateStruct;
  positionItem;
  update = false;
  items: any = [
    {product: "Mesa", quantity: 10, price: 320, total: 3200, date: "01/05/2021" },
    {product: "Sillón", quantity: 10, price: 320, total: 3200, date: "03/12/2021" },
    {product: "Silla", quantity: 10, price: 320, total: 3200, date: "22/03/2020" },
    {product: "Ropero", quantity: 10, price: 320, total: 3200, date: "11/02/2021" },
    {product: "Mesa", quantity: 10, price: 320, total: 3200, date: "23/01/2020" },
  ];
  constructor(private modalService: NgbModal,
    private formBuilder: FormBuilder) { 
    }

  ngOnInit() {
    this.formInventory = this.formBuilder.group({
      product: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      total: ['', Validators.required],
      date: ['', Validators.required],
    })
  }

  open(modal) {
    this.update = false
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
    this.model = date
    this.activeModal = this.modalService.open(modal, { size: 'xl' });
  }
  

  saveInventoryData(){
    this.changeFormatDate()
    this.items.push(this.formInventory.value)
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
    this.modalService.dismissAll()
  }

}
