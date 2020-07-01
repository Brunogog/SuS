import { Component } from '@angular/core';
import { Hospital } from './hospital.model';
import { AlertController } from '@ionic/angular';
import { HospitaisService } from './hospitais.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  hospital: Hospital[] = [{
    id: 1,
    nome: "Hospital João XXIII",
    endereco: "Av. Prof. Alfredo Balena, 400 - Centro, Belo Horizonte - MG",
    avaliacao: "4.5 estrelas"
  }, {
    id: 2,
    nome: "Hospital Lifecenter",
    endereco: "Av. do Contorno, 4747 - Funcionários, Belo Horizonte - MGG",
    avaliacao: "5 estrelas"
  }]

  arrayHospital: any = {} as Hospital;

  aux: any = {} as Hospital;

  constructor(
    private hospitaisService: HospitaisService,
    public alertController: AlertController,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.arrayHospital = this.hospital;
    console.log('array atual: ', this.arrayHospital);
  }

  async Search() {
    document.getElementById('Search').classList.toggle('none');
    if (document.getElementById('Add').classList.toggle('none') == true) {
      document.getElementById('Add').classList.toggle('none');
      if (document.getElementById('dado').classList.toggle('none') == true) {
        document.getElementById('dado').classList.toggle('none');
      }
    }

  }

  async Add() {
    document.getElementById('Add').classList.toggle('none');
    if (document.getElementById('Search').classList.toggle('none') == true) {
      document.getElementById('Search').classList.toggle('none');
      if (document.getElementById('dado').classList.toggle('none') == true) {
        document.getElementById('dado').classList.toggle('none');
      }
    }
  }

  async Edit() {
    document.getElementById('Edit').classList.toggle('none');
  }

  async Delete(id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Deletar?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.arrayHospital.forEach(x => {
              if (id == x.id) {
                this.arrayHospital.splice(x.id)
                return console.log('delete: ', this.arrayHospital);
              }
            })
          }
        }
      ]
    });
    await alert.present();
  }

  async details(value) {
    document.getElementById('dado').classList.toggle('none');
    this.arrayHospital.forEach(x => {
      if (value == x.id) {
        this.aux = x;
      }
    })
  }

  async atualizarDados() {
    const toast = await this.toastController.create({
      message: 'Atualizado!',
      duration: 2000
    });
    toast.present();
  }

  async onSubmit(form) {
    await this.hospitaisService.insert(form.value);
    let storagee: any = await this.hospitaisService.getHospital();
    storagee.forEach(element => {
      element.id = this.hospital.length + 1;
      this.arrayHospital.push(element);
    });
  }

}
