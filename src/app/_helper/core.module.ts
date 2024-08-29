import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreService } from './core.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    CoreService
  ],
})
export class CoreModule { }
