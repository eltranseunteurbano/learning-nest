import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapter/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  private readonly axios: AxiosInstance = axios;

  async executeSeed() {
    await this.pokemonModel.deleteMany({});

    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=900',
    );

    const pokemons = data.results.map(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];
      return { name, no };
    });

    const pokemonsInserted = await this.pokemonModel.insertMany(pokemons);

    return pokemonsInserted;
  }
}
