import {Component} from '@angular/core';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  items: string[] = [];
  dragStartElement: Element;

  constructor(public toastCtrl: ToastController) {
    for (let i = 0; i < 5; i++) {
      this.items.push('Item no.' + i);
    }
  }

  onDragStart(event: DragEvent, item: string) {
    console.log('drag start:' + item);
    this.dragStartElement = event.target as Element;
    event.dataTransfer.setData('text', 'dragging ' + item);

    const dragImage = this.createDragImage('dragging ' + item);
    event.dataTransfer.setDragImage(dragImage, 0, 0);
  }

  onDragEnter(event: DragEvent, item: string): void {
    console.log('drag enter/over:' + item);
    event.preventDefault();
  }

  async onDrop(event: DragEvent): Promise<void> {
    const message = 'dropped data was: ' + event.dataTransfer.getData('text');
    console.log(message);
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'bottom'
    });
    await toast.present();
  }

  createDragImage(text: string): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');

    ctx.font = '17px Rubik_Light';
    // Place the text in the middle of the canvas
    ctx.fillText(text, canvas.width / 4, canvas.height / 2);
    return canvas;
  }
}
