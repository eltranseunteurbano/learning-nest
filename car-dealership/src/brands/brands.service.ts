import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [];

  create({ name }: CreateBrandDto) {
    const brand: Brand = {
      id: uuidv4(),
      name,
      createdAt: new Date().getTime(),
    };

    this.brands.push(brand);

    return brand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find((brand) => brand.id === id);
    if (!brand) throw new NotFoundException(`Brand with id ${id} not found`);
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    const brand = this.findOne(id);
    const newBrand = {
      ...brand,
      ...updateBrandDto,
      updatedAt: new Date().getTime(),
    };
    this.brands = this.brands.map((brand) =>
      brand.id === id ? newBrand : brand,
    );
    return newBrand;
  }

  remove(id: string) {
    const brand = this.findOne(id);
    this.brands = this.brands.filter((brand) => brand.id !== id);
    return brand;
  }

  fillBrandsWithSeed(brands: Brand[]) {
    this.brands = brands;
  }
}
