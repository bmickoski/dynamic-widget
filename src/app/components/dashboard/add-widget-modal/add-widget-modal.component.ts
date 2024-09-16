import { NgClass } from '@angular/common';
import { Component, output, signal } from '@angular/core';
import { AddWidgetModalAction } from './action.enum';
import { Subject } from 'rxjs';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-widget-modal',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './add-widget-modal.component.html',
  styleUrl: './add-widget-modal.component.scss',
})
export class AddWidgetModalComponent {
  isOpen: boolean = true;
  closed = output<any>();
  dismissed = output<any>();
  widgetForm = new FormGroup({
    widget: new FormControl('', { validators: [Validators.required] }),
    title: new FormControl('', { validators: [Validators.required] }),
    description: new FormControl(''),
  });

  openModal(): void {
    this.isOpen = true;
  }
  closeModal(): void {
    this.isOpen = false;
    this.closed.emit(this.widgetForm.value);
  }
  dismissModal(res: any): void {
    this.dismissed.emit(res);
  }
}
