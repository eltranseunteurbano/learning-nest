import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  title: string;

  @Column('float', { default: 0 })
  price: number;

  @Column('text', { unique: true })
  slug: string;

  @Column('integer', { default: 0 })
  stock: number;

  @Column('text', { nullable: true })
  description: string;

  @Column('text', { array: true })
  sizes: string[];

  @Column('text', { array: true, default: [] })
  tags: string[];

  // @Column('text')
  // title: string;

  @Column('text')
  gender: string;

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) this.slug = this.title;

    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
}
