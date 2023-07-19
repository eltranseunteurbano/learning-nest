import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly carsService: CarsService) { }

  @Get()
  getAllCars() {
    return this.carsService.finAll();
  }

  @Get(':id')
  getCarById(@Param('id', ParseIntPipe) id: number) {
    const car = this.carsService.findOneById(id);
    if (!car) throw new NotFoundException(`Car with id ${id} not found`);
    return car;
  }

  @Post()
  createCar(@Body() body: any) {
    return body;
  }

  @Patch(':id')
  updateCar(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return body;
  }

  @Delete(':id')
  deleteCarById(@Param('id', ParseIntPipe) id: number) {
    const deletedCar = this.carsService.deleteCarById(id);
    if (!deletedCar) throw new NotFoundException(`Car with id ${id} not found`);
    return deletedCar;
  }
}
