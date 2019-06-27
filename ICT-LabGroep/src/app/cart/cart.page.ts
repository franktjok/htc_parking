import { Component, OnInit } from '@angular/core';
import { CrudService } from './../../services/crud.service'
import { UploadPage } from './../upload/upload2.page'
import { Events } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataService } from './../../services/data.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  selectedItems = [];
  items=[];
  total = 0;
  id:any;
  sub: any;
 firstname: string;
 lastname: string;


  constructor(public product: UploadPage,public events: Events, private route: Router,  private data: DataService) {
  //this.items = this.product.getCart();
  this.items = this.data.storage;
  //console.log(JSON.stringify(this.data.storage));
  console.log(this.items);


  }

  ngOnInit() {
  let items = this.product.getCart();

  //this.events.subscribe(this.product);
  //console.log(this.items);
  let selected = {};
      for (let obj of this.items) {
        if (selected[obj.id]) {
          selected[obj.id].count++;
        } else {
          selected[obj.id] = {...obj, count: 1};
        }
      }
      this.selectedItems = Object.keys(selected).map(key => selected[key])
      this.total = this.selectedItems.reduce((a, b) => a + (b.count * b.Price), 0);

    }
  }


