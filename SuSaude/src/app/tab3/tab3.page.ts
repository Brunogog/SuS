import { Component } from '@angular/core';
import { Paciente } from './paciente.model';
import { AlertController } from '@ionic/angular';
import { PacientesService } from './paciente.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  paciente: Paciente[] = [{
    id: 1,
    nome: "Sergio",
    cpf: 1234,
    sexo: "M",
    idade: 25
  }, {
    id: 2,
    nome: "Jessica",
    cpf: 4567,
    sexo: "F",
    idade: 19
  }]

  arrayPaciente: any = {} as Paciente;

  aux: any = {} as Paciente;

  constructor(
    private pacientesService: PacientesService,
    public alertController: AlertController,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.arrayPaciente = this.paciente;
    console.log('array atual: ', this.arrayPaciente);
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
            this.arrayPaciente.forEach(x => {
              if (id == x.id) {
                this.arrayPaciente.splice(x.id)
                return console.log('delete: ', this.arrayPaciente);
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
    this.arrayPaciente.forEach(x => {
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
    await this.pacientesService.insert(form.value);
    let storagee: any = await this.pacientesService.getPaciente();
    storagee.forEach(element => {
      element.id = this.paciente.length + 1;
      this.arrayPaciente.push(element);
    });
  }
}
