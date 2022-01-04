import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonCatalogueRoutingModule } from './pokemon-catalogue-routing.module';
import { PokemonCatalogueComponent } from './pokemon-catalogue.component';


@NgModule({
  declarations: [
    PokemonCatalogueComponent
  ],
  imports: [
    CommonModule,
    PokemonCatalogueRoutingModule
  ]
})
export class PokemonCatalogueModule { }
