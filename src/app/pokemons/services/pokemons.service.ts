import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { SimplePokemon } from '../interfaces';
import { PokeAPIResponse } from '../interfaces/pokemon-api.response';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {
  private http = inject(HttpClient);

  public loadPage(page: number): Observable<SimplePokemon[]> {
    // 1 = 0

    if (page !== 0) {
      --page;
    }

    page = Math.max(0, page);

    return this.http
      .get<PokeAPIResponse>(
        `https://pokeapi.co/api/v2/pokemon?offset=${page * 20}0&limit=20`
      )
      .pipe(
        map((resp) => {
          const SimplePokemons: SimplePokemon[] = resp.results.map(
            (pokemon) => ({
              id: pokemon.url.split('/').at(-2) ?? '',
              name: pokemon.name
            })
          );

          return SimplePokemons;
        })

        // tap(console.log)
      );
  }
}
