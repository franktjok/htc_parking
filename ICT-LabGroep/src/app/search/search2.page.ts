import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as firebase from "firebase";

@Component({
  selector: 'app-search',
  templateUrl: './search2.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit{
public myProject = {};

  constructor(public navCtrl: NavController) { }

  ngOnInit(): void {
          //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
          //Add 'implements OnInit' to the class.
          if (!firebase.apps.length) {
          firebase.initializeApp({});
          }
        }

  createProject(ProductId: string, Description: string): void {
    const projectRef: firebase.database.Reference = firebase.database().ref(`/Products/`);
    projectRef.set({
        ProductId: ProductId,
        Description: Description
      });
  }
  updateProject(ProductId: string, Description: string): void {
    const projectRef: firebase.database.Reference = firebase.database().ref(`/Products/`);
    projectRef.update({
      ProductId,
      Description
    })
  }

  deleteProject(): void {
    const projectRef: firebase.database.Reference = firebase.database().ref(`/Products/`);
    projectRef.remove()
  }

  ionViewDidLoad() {
    const projectRef: firebase.database.Reference = firebase.database().ref(`/Products/`);
    projectRef.on('value', projectSnapshot => {
      this.myProject = projectSnapshot.val();
    });
  }
}
