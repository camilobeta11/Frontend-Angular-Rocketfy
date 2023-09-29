import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ModalDeleteComponent } from './modal-delete/modal-delete.component';

@NgModule({
  declarations: [
    ModalDeleteComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ModalDeleteComponent,

  ]
})
export class ComponentsModule { }
