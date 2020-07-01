import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
   providedIn: 'root'
})
export class PacientesService {

   constructor(private storage: Storage) { }

   async insert(value) {
      console.log('valor: ', value);
      let pacientes = [];
      this.storage.get('paciente').then(async x => {
         if (x == null || x.length == 0 || x == undefined) {
            await this.storage.set('paciente', [value]);
         } else {
            this.storage.get('paciente').then(async x => {
               x.forEach(element => {
                  pacientes.push(element);
               });
               pacientes.push(value);
               await this.storage.set('paciente', pacientes);
            })
         }
      })
   }

   async getPaciente() {
      return await this.storage.get('paciente');
   }
}