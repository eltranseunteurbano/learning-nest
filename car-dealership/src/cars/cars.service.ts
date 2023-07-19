import { Injectable } from '@nestjs/common';
import { Car } from './interfaces/car.interface';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: ,
      brand: 'Toyota',
      model: 'Yaris',
      year: 2019,
    },
    {
      id: 2,
      brand: 'Toyota',
      model: 'Corolla',
      year: 2019,
    },
    {
      id: 3,
      brand: 'Honda',
      model: 'Civic',
      year: 2019,
    },
    {
      id: 4,
      brand: 'Jeep',
      model: 'Wrangler',
      year: 2019,
    },
  ];

  public finAll() {
    return this.cars;
  }

  public findOneById(id: number) {
    return this.cars.find((car) => car.id === id);
  }

  public createCar(car: any) {
    const newCar = {
      id: this.cars.length + 1,
      ...car,
    };
    this.cars.push(newCar);
    return newCar;
  }

  public deleteCarById(id: number) {
    const carIndex = this.cars.findIndex((car) => car.id === id);
    if (carIndex === -1) return null;
    const deletedCars = this.cars.splice(carIndex, 1);
    return deletedCars[0];
  }
}
