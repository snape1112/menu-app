import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatGridListModule} from '@angular/material/grid-list'
  
const materialModules = [  
    MatGridListModule
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