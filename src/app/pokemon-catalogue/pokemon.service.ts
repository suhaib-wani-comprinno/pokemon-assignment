import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pluck } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  pokeApi = 'https://pokeapi.co/api/v2/pokemon';
  trainersApi = 'https://pokemon-noroff-api.herokuapp.com/trainers';
  apiKey = '1XXwWjA3fe1LvasnV3ilB82ffOTJwzd2Eh0Ngsbbq9sj95g3s9K0lBd5S4gtpaBY';

  randomNumber: number = 0;

  constructor(private http: HttpClient) {
  }

  private generateRandomNumber() {
    return this.randomNumber = Math.floor(Math.random() * 146);
  }

  fetchPokeNames() {
    return this.http.get(this.pokeApi, {
      params: {
        limit: 5,
        offset: this.generateRandomNumber()
      }
    }).pipe(
      pluck('results')
    )
  }

  fetchPokeImages(pokeName: string) {
    return this.http.get(`${this.pokeApi}/${pokeName}`)
      .pipe(
        pluck('sprites','front_default')
      )
  }

  catchPokemon(addPokemon:string){

    let currentUser = JSON.parse(sessionStorage.getItem('currentUser') as string);
    currentUser.pokemon.push(addPokemon);
    let { id = 0, username = '', pokemon=[]} = currentUser;
    return this.http.patch(`${this.trainersApi}/${currentUser.id}`, {
      id,
      username,
      pokemon      
    }, {
      headers: {
        'X-API-Key': this.apiKey
      }
    })
  }
}