import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TrainerType } from '../Trainer-Interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  isLoggedIn : boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  trainersApi = 'https://pokemon-noroff-api.herokuapp.com/trainers';
  apiKey = '1XXwWjA3fe1LvasnV3ilB82ffOTJwzd2Eh0Ngsbbq9sj95g3s9K0lBd5S4gtpaBY';


  user: string = '';
  pokes: any[] = [];
  pokeNames : any[] = [];
  trainer !: TrainerType;

  getUser(username: string) {
    return this.http.get<TrainerType>(this.trainersApi, {
      params: {
        username
      }
    }).subscribe((res: any) => {
      if (res.length) {
        this.isLoggedIn = true;
        this.router.navigateByUrl('/trainer')
        this.user = res[0].username;
        for (let r of res[0].pokemon) {
          this.pokes.push(r);
          this.pokeNames.push(r);
        }
        this.trainer = res[0];
        sessionStorage.setItem('currentUser', JSON.stringify(this.trainer));
        sessionStorage.setItem('loggedIn', 'true');
      } else {
        alert('User not found');
        sessionStorage.setItem('currentUser', '');
        sessionStorage.setItem('loggedIn', 'false');
      }
      return this.trainer = {
        username : this.user,
        pokemon : this.pokes
      }
    });
  }

  logoutUser(){
    sessionStorage.removeItem('currentUser');
    sessionStorage.setItem('loggedIn', 'false');
  }

  createUser(userInput: string) {
    return this.http.post<TrainerType>(this.trainersApi, {
      username: userInput,
      pokemon: []
    }, {
      headers: {
        'X-API-Key': this.apiKey
      }
    })
  }
}