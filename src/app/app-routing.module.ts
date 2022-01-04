import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guard/auth.guard';

const routes: Routes = [
  { path: 'trainer',
  loadChildren:() => import('./trainer/trainer.module').then( m => m.TrainerModule),
  canLoad : [AuthGuard]
},
  { path: 'pokemon-catalogue',
  loadChildren:() => import('./pokemon-catalogue/pokemon-catalogue.module').then( m => m.PokemonCatalogueModule),
  canLoad : [AuthGuard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
