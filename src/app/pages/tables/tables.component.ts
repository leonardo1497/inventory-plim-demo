import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  activeModal: NgbActiveModal;
  items: any = [
    {product: "mesa", quantity: 10, price: 320, total: 3200, date: "00/00/0000" },
    {product: "mesa", quantity: 10, price: 320, total: 3200, date: "00/00/0000" },
    {product: "mesa", quantity: 10, price: 320, total: 3200, date: "00/00/0000" },
    {product: "mesa", quantity: 10, price: 320, total: 3200, date: "00/00/0000" },
    {product: "mesa", quantity: 10, price: 320, total: 3200, date: "00/00/0000" },
  ];
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  open(modal) {
    this.activeModal = this.modalService.open(modal, { size: 'xl' });
  }

}
