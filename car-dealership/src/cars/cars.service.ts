import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuidv4 } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuidv4(),
      brand: 'Toyota',
      model: 'Yaris',
      year: 2019,
    },
    {
      id: uuidv4(),
      brand: 'Toyota',
      model: 'Corolla',
      year: 2019,
    },
    {
      id: uuidv4(),
      brand: 'Honda',
      model: 'Civic',
      year: 2019,
    },
    {
      id: uuidv4(),
      brand: 'Jeep',
      model: 'Wrangler',
      year: 2019,
    },
  ];

  public finAll() {
    return this.cars;
  }

  public findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id ${id} not found`);

    return car;
  }

  public createOne(car: CreateCarDto) {
    const newCar: Car = {
      id: uuidv4(),
      year: 1990,
      ...car,
    };
    this.cars.push(newCar);
    return newCar;
  }

  public deleteById(id: string) {
    const currentCar = this.findOneById(id);
    this.cars = this.cars.filter((car) => car.id !== id);
    return currentCar;
  }

  public updateOne(id: string, updateCar: UpdateCarDto) {
    if (updateCar.id && updateCar.id !== id)
      throw new BadRequestException('Id in body and param do not match');

    const currentCar = this.findOneById(id);
    const updatedCar = { ...currentCar, ...updateCar };

    this.cars = this.cars.map((car) => {
      if (car.id === id) return updatedCar;
      return car;
    });

    return updatedCar;
  }
}
