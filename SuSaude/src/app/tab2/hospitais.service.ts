import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
   providedIn: 'root'
})
export class HospitaisService {

   constructor(private storage: Storage) { }

   async insert(value) {
      console.log('valor: ', value);
      let hospitais = [];
      this.storage.get('hospital').then(async x => {
         if (x == null || x.length == 0 || x == undefined) {
            await this.storage.set('hospital', [value]);
         } else {
            this.storage.get('hospital').then(async x => {
               x.forEach(element => {
                  hospitais.push(element);
               });
               hospitais.push(value);
               await this.storage.set('hospital', hospitais);
            })
         }
      })
   }

   async getHospital() {
      return await this.storage.get('hospital');
   }
}