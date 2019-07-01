import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as firebase from "firebase";
import { AngularFirestore } from '@angular/fire/firestore';
import { CrudService } from './../../services/crud.service';
import { Product } from './../product';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search-new.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit{
public myProject = {};
productCollection;
 products: any;
 productId: string[];
 product:string[];
 article:string[];
 searchTerm: string ;
 filterItems:any;
 items:any;

 optionsArray : Array<{id: string; isEdit: boolean; ProductId: any; Price: any; Description: any; Specification: any; Time: any; Stock: any; Image: any; }> = [];
    public tools : Product[] = [
    new Product (1, "Top or Bottom Guided Bi-Folding Speedgate", "100"),
    new Product (2, "Supertrackless Bi-Folding Speedgate","100"),
    new Product (3, "Top or Bottom Driven Bi-Folding Speedgate", "100")
    ];
    tool: Product = this.tools[0];


  constructor(private crudService: CrudService, private firestore: AngularFirestore, private route: ActivatedRoute) {
    this.productCollection = firestore.collection<any>('Products/')
    this.generateProducts();
     }

  ngOnInit(): void {
          //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
          //Add 'implements OnInit' to the class.
          if (!firebase.apps.length) {
          firebase.initializeApp({});
          }

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

                  console.log(data);
                    this.optionsArray = data.map(e => {
                                      return{
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

                     console.log( this.optionsArray);

                });


           this.route.params.subscribe(params => {
                 this.tools.forEach((p: Product) => {
                   if (p.id == params.id) {
                     this.tool = p;
                   }
                 });
               });


        }

        generateProducts()
        {
                      this.product = [
                               'Top or Bottom Guided Bi-Folding Speedgate',
                               'Supertrackless Bi-Folding Speedgate',
                               'Top or Bottom Driven Bi-Folding Speedgate',
                               'Attack Tested',
                             ];

             console.log(this.product);

        }






        getProducts(ev:any)
        {
        this.generateProducts();
        let serVal = ev.target.value;
        if (serVal && serVal.trim() != '') {
              this.product = this.product.filter((prod) => {
                return (prod.toLowerCase().indexOf(serVal.toLowerCase()) > -1);
              })
              }
        }








}
