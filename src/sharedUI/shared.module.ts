import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../app/material.module';
import { FormsModule } from '@angular/forms';
import { FlexModule } from '@angular/flex-layout';

@NgModule({
  declarations: [],
  imports: [CommonModule, MaterialModule, FormsModule,FlexModule],
  exports: [CommonModule, MaterialModule, FormsModule,FlexModule],
})
export class SharedModule {}
