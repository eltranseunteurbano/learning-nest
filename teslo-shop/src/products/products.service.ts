import {
  BadRequestException,
  NotFoundException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { PaginationDto } from 'src/common/dto/pagination.dto';

import { Product } from './entities/product.entity';
import { validate as isUUID } from 'uuid';
@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);

      return product;
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async findAll(pagiationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = pagiationDto;
    try {
      return await this.productRepository.find({
        take: limit,
        skip: offset,
      });
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async findOne(termSearch: string) {
    let product: Product;

    if (isUUID(termSearch)) {
      product = await this.productRepository.findOneBy({ id: termSearch });
    } else {
      // product = await this.productRepository.findOneBy({ slug: termSearch });
      const qb = this.productRepository.createQueryBuilder('product');
      product = await qb
        .where(`slug=:slug or UPPER(title) =:title`, {
          title: termSearch.toUpperCase(),
          slug: termSearch.toLocaleLowerCase(),
        })
        .getOne();
    }

    if (!product)
      throw new NotFoundException(`Product with id ${termSearch} not found`);
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.preload({
      id,
      ...updateProductDto,
    });

    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    try {
      return await this.productRepository.save(product);
    } catch (error) {
      this.handleDBException(error);
    }
  }

  async remove(id: string) {
    const { affected } = await this.productRepository.delete(id);
    if (affected === 0)
      throw new NotFoundException(`Product with id ${id} not found`);
  }

  private handleDBException(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException();
  }
}
