import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatGridListModule} from '@angular/material/grid-list'
import {MatListModule} from '@angular/material/list'
import {MatButtonModule } from '@angular/material/button'
  
const materialModules = [  
    MatGridListModule,
    MatListModule,
    MatButtonModule
]
  
@NgModule({
    imports: [
        CommonModule,
        ...materialModules
    ],
    declarations: [
    ],
    exports: [
        ...materialModules,
    ]
})
export class SharedModule { }