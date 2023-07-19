import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';

@Module({
  controllers: [CarsController],
  providers: [CarsService],
  exports: [CarsService],
})
// eslint-disable-next-line prettier/prettier
export class CarsModule { }
