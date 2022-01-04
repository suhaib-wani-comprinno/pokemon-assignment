import { Component, OnInit } from '@angular/core';
import { PokemonService } from './pokemon.service';

@Component({
  selector: 'app-pokemon-catalogue',
  templateUrl: './pokemon-catalogue.component.html',
  styleUrls: ['./pokemon-catalogue.component.scss']
})
export class PokemonCatalogueComponent implements OnInit {
  trainer = JSON.parse(sessionStorage.getItem("currentUser") as string)
  pokeNames: any[] = [];
  pokeImages: any[] = [];
  temp: any;

  chance = Math.floor( (Math.random() *10) + 1);

  maximumErrorMessage: string = 'Send a pokemon to Professor Oak before adding new pokemon';
  maxError: boolean = false;

  constructor(private getPokemons: PokemonService) { }

  ngOnInit(): void {
    this.generateNewPokemon();
  }

  generateNewPokemon() {
    this.pokeNames = [];
    this.pokeImages = [];
    this.getPokemons.fetchPokeNames().subscribe((res: any) => {
      for (let r of res) {
        this.pokeNames.push(r.name);
        this.getPokemons.fetchPokeImages(r.name).subscribe((ress: any) => {
          this.temp = ress;
          this.pokeImages.push(this.temp);
        })
      }
    });
  }

  catch(abc: string) {

    if (this.trainer.pokemon.length >= 6) {
      alert('Cannot add!');
      this.maxError = true;
      return
    }

    if (this.trainer.pokemon.includes(abc)) {
      alert('You already caught this pokemon')
      return
    }

    if (this.chance >= 5) {
      alert('Caught');
      this.generateNewPokemon();
      this.getPokemons.catchPokemon(abc).subscribe(res => {
        sessionStorage.setItem('currentUser', JSON.stringify(res));
      })
    } else {
      alert('Failed');
      this.generateNewPokemon();
    }
  }
}