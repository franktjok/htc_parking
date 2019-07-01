import { Component, OnInit } from '@angular/core';
import { Storage} from '@ionic/storage'
import { CrudService } from './../../services/crud.service'
import { DataService } from './../../services/data.service'
import { AlertController, PopoverController, NavController  } from '@ionic/angular';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, NavigationExtras } from '@angular/router';
import { Observable } from "rxjs/Observable";
import { Events } from '@ionic/angular';
import { CartPage } from './../cart/cart.page';

@Component({
  selector: 'app-upload',
  templateUrl: './upload2.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {

      products: any;
      image: string;
      time: string;
      price: string;
      description: string;
      specification: string;
      productnr: string;
      stock : string;
      isAdmin = false;
      cart = [];


  constructor(private crudService: CrudService, private fireStore: AngularFirestore, private popoverCtrl: PopoverController, private router: Router, public events:Events, public navCtrl: NavController, private data: DataService) {}

  ngOnInit() {
      // ophalen producten
      this.crudService.read_Products().subscribe(data => {

        this.products = data.map(e => {
          return {
            id: e.payload.doc.id,
            isEdit: false,
            ProductId: e.payload.doc.data()['ProductId'],
            Price: e.payload.doc.data()['Price'],
            Description: e.payload.doc.data()['Description'],
            Specification: e.payload.doc.data()['Specification'],
            Time: e.payload.doc.data()['Time'],
            Stock: e.payload.doc.data()['Stock'],
            Image: e.payload.doc.data()['Image'],
          };
        })
        console.log(this.products);

      });
    //  isAdmin
       firebase.auth().onAuthStateChanged(user => {
       if (user){
            firebase
                .firestore()
                .doc(`/userProfile/${user.uid}`)
                .get()
                .then(userProfileSnapshot => {
                    this.isAdmin = userProfileSnapshot.data().isAdmin;
                    });
        }
       });

       //this.cart = this.crudService.getCart();
    }



  async addProjects(ev: any) {
        const popover = await this.popoverCtrl.create({
            component: UploadPage,
            event: ev,
            animated: true,
            showBackdrop: true
        });
        return await popover.present();
    }

  getProducts(){
  return this.products;
  }

  getCart()
  {
  return this.cart;
  console.log(this.cart);
  }

  addProduct(item)
  {
    this.cart.push(item);
    console.log(item);
   console.log(this.cart);


  }

  addToCart(product)
  {
    console.log(product);
    this.addProduct(product);
    //this.events.publish(product);
    //this.navCtrl.navigateForward(product);

  }

  openCart() {
      this.data.storage = this.cart;
      console.log(this.data.storage);
      this.router.navigate(['cart']);

    }



  CreateRecord() {
      let record = {};
      record['ProductId'] = this.productnr;
      record['Price'] = this.price;
      record['Description'] = this.description;
      record['Specification'] = this.specification;
      record['Time'] = this.time;
      record['Stock'] = this.stock;
      record['Image'] = this.image;
      this.crudService.create_NewProduct(record).then(resp => {
        this.productnr = "";
        this.price = "";
        this.description = "";
        this.specification = "";
        this.time = "";
        this.stock = "";
        this.image = "";
        console.log(resp);
      })
        .catch(error => {
          console.log(error);
        });
    }

    RemoveRecord(rowID) {
      this.crudService.delete_Product(rowID);
    }

    EditRecord(record) {
      record.isEdit = true;
      record.EditProdId = record.ProductId;
      record.EditPrice = record.Price;
      record.EditDescription = record.Description;
      record.EditSpecification = record.Specification;
      record.EditTime = record.Time;
      record.EditStock = record.Stock;
      record.EditImage = record.Image;
    }

    UpdateRecord(recordRow) {
      let record = {};
      record['ProductId'] = recordRow.EditProdId;
      record['Price'] = recordRow.EditPrice;
      record['Description'] = recordRow.EditDescription;
      record['Specification'] = recordRow.EditSpecification;
      record['Time'] = recordRow.EditTime;
      record['Stock'] = recordRow.EditStock;
      record['Image'] = recordRow.EditImage;
      this.crudService.update_Product(recordRow.id, record);
      recordRow.isEdit = false;
    }


 }
