import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-modal-team',
  templateUrl: './modal-team.page.html',
  styleUrls: ['./modal-team.page.scss'],
})
export class ModalTeamPage implements OnInit {

  public title: string;
  public team: any;
  public months: any;
  public editFor: any;
  public editMode: boolean;
  public amount: number;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private firebaseService: FirebaseService,
    private messagesService: MessagesService,
  ) {
    this.editFor = {};
    this.editMode = false;
    this.amount = 0;
    this.team = this.navParams.data.ctx;
  }

  ngOnInit() {
    console.log(this.team);
    this.title = this.team.name.toUpperCase() + ' - División ' + this.team.division.name.toUpperCase();
  }

  close() {
    this.modalCtrl.dismiss();
  }

  edit(index) {
    this.editMode = true;
    this.editFor[index] = true;
  }

  cancelEdition(index) {
    this.editMode = false;
    delete this.editFor[index];
  }

  confirmEdition() {
    try {
      this.firebaseService.updateObject(`teams/${this.team.key}`, this.team);
      this.messagesService.showToast({ msg: `El equipo ${this.team.name} ha sido editado correctamente!` });
      this.close();
    } catch (err) {
      console.log(err);
      this.messagesService.showToast({ msg: 'Ha ocurrido un error. No se pudo editar el equipo.' });
    }
  }
}