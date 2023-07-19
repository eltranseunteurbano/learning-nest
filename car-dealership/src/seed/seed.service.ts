import { Injectable } from '@nestjs/common';
import { CARS_SEED } from './data/cars.seed';
import { BRANDS_SEED } from './data/brands.seed';
import { CarsService } from 'src/cars/cars.service';
import { BrandsService } from 'src/brands/brands.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly carService: CarsService,
    private readonly brandsService: BrandsService,
  ) {}

  populateDB() {
    this.carService.fillCarsWithSeed(CARS_SEED);
    this.brandsService.fillBrandsWithSeed(BRANDS_SEED);
    return 'Data injected successfully!';
  }
}
