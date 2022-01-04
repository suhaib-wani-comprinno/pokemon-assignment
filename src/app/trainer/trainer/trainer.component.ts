import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { PokemonService } from 'src/app/pokemon-catalogue/pokemon.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.scss']
})
export class TrainerComponent implements OnInit {

  constructor(private authService: AuthService, private pokeService: PokemonService) { }

  User = '';
  Pokes: string[] = [];
  PokeNames: string[] = [];
  temp: any[] = [];
  var: any;
  ngOnInit(): void {
    this.User = this.authService.user;
    this.Pokes = this.authService.pokes;
    this.PokeNames = this.authService.pokeNames;
    for (let image of this.Pokes) {
      (this.pokeService.fetchPokeImages(image)
        .subscribe((res: any) => {
          this.temp.push(res);
        })
      );
    }
  }
}

// this.var = JSON.parse(sessionStorage.getItem('currentUser') as string);
//     this.Pokes.push(this.var.pokemon);
//     for (let images of this.Pokes) {
//       console.log(images);
//       for(let image of images){
//         this.pokeService.fetchPokeImages(image)
//         .subscribe((res: any) => {
//           this.temp.push(res);
//         })
//       }
//     }
