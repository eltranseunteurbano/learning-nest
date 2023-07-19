import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto, UpdateCarDto } from './dto';

@Controller('cars')
export class CarsController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly carsService: CarsService) { }

  @Get()
  getAllCars() {
    return this.carsService.finAll();
  }

  @Get(':id')
  getCarById(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.findOneById(id);
  }

  @Post()
  createCar(@Body() createCarDto: CreateCarDto) {
    return this.carsService.createOne(createCarDto);
  }

  @Patch(':id')
  updateCar(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCarDto: UpdateCarDto,
  ) {
    return this.carsService.updateOne(id, updateCarDto);
  }

  @Delete(':id')
  deleteCarById(@Param('id', ParseUUIDPipe) id: string) {
    const deletedCar = this.carsService.deleteById(id);
    if (!deletedCar) throw new NotFoundException(`Car with id ${id} not found`);
    return deletedCar;
  }
}
