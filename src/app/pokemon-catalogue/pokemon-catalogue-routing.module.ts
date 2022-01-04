import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonCatalogueComponent } from './pokemon-catalogue.component';

const routes: Routes = [
  { path : '', component : PokemonCatalogueComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonCatalogueRoutingModule { }
