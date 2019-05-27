import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage  {

    data: any;

  constructor(private storage: Storage) {
        this.data = {};
            //Set description Value
            this.setValue("description", "SPEEDGATE XENTRY 2");
            //Set specification Value
            this.setValue("specification", "Deze Speedgate met twee motoren heeft een solide aandrijving aan de onderzijde en een geleidegoot onder of boven. Het vouwhek opent met circa 1 meter per seconde en is TÜV-gecertificeerd. We passen deze Speedgate toe bij onder andere appartementencomplexen en bedrijventerreinen.");
            //Set articlenumber Value
            this.setValue("productnr", 8908904);

            let sampleObj = [
              {
                image:"../assets/images/img1.jpg",
                time:"3-5",
                price: "129.99",
                description: "SPEEDGATE XENTRY 2",
                specification: "Deze Speedgate met twee motoren heeft een solide aandrijving aan de onderzijde en een geleidegoot onder of boven. Het vouwhek opent met circa 1 meter per seconde en is TÜV-gecertificeerd. We passen deze Speedgate toe bij onder andere appartementencomplexen en bedrijventerreinen.",
                productnr: "257.255.3201",
                stock: "Ja"
              }, {
                image:'assets/images/img2.jpg',
                time:"3-5",
                price: "239.99",
                description: "Xentry Speedgate High Security",
                specification: "Steeds meer gebouwen moeten om uiteenlopende redenen beveiligd worden. In de Xentry 3 High Security is daarvoor zowel (digitale) bewaking als fysieke beveiliging volgens de laatste stand der techniek gecombineerd.",
                productnr: "1-868-497-5043 x73289",
                stock: "Ja"
              }, {
                image:'assets/images/img3.jpg',
                time:"onbekend",
                price: "499.99",
                description: "Speedgate Xentry Mobile",
                specification: "Bouwplaatsen, evenementen, veel van deze “tijdelijke locaties” zijn een verzamelplaats van waardevol materieel, materiaal en mensen. Drukke plaatsen die onoverzichtelijk zijn, vragen om een goed georganiseerde en beveiligde toegang. Alleen een slagboom of een hek, dat handmatig open en dicht wordt gedaan, is niet meer afdoende en arbeidsintensief in gebruik. Een mobiele Speedgate biedt een oplossing die veiligheid en automatisering combineert. 24 uur per dag.",
                productnr: "1-814-823-5520 x68656",
                stock: "Nee"
              }
            ];

            //Set Object Value
            this.setValue("offices", sampleObj);
  }

        // set a key/value
          setValue(key: string, value: any) {
            this.storage.set(key, value).then((response) => {
              console.log('set' + key + ' ', response);

              //get Value Saved in key
              this.getValue(key);

            }).catch((error) => {
              console.log('set error for ' + key + ' ', error);
            });
          }

        // get a key/value pair
          getValue(key: string) {
            this.storage.get(key).then((val) => {
              console.log('get ' + key + ' ', val);
              this.data[key] = "";
              this.data[key] = val;
            }).catch((error) => {
              console.log('get error for ' + key + '', error);
            });
          }

        // Remove a key/value pair
          removeKey(key: string) {
            this.storage.remove(key).then(() => {
              console.log('removed ' + key);
              this.data[key] = "";
            }).catch((error) => {
              console.log('removed error for ' + key + '', error);
            });
          }

        //Get Current Storage Engine Used
          driverUsed() {
            console.log("Driver Used: " + this.storage.driver);
          }


         // Traverse key/value pairs
           traverseKeys() {
             this.storage.forEach((value: any, key: string, iterationNumber: Number) => {
               console.log("key " + key);
               console.log("iterationNumber " + iterationNumber);
               console.log("value " + value);
             });
           }


        // Traverse key/value pairs
          listKeys() {
            this.storage.keys().then((k) => {
              console.table(k)
            });
          }

        // Total Keys Stored
          getKeyLength() {
            this.storage.length().then((keysLength: Number) => {
              console.log("Total Keys " + keysLength);
            });
          }

 }
