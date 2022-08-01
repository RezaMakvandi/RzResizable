import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RzResizableDirective } from './rz-resizable.directive';



@NgModule({
  declarations: [
    RzResizableDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RzResizableDirective
  ]
})
export class RzResizableModule { }
