import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  NeighborhoodEnum,
  HouseDetailsEnum,
  CondoDetailsEnum,
  ApartmentDetailsEnum,
} from '../../neighborhood/entity/neighborhood.entity';

export enum PropertyConditionEnum {
  NOVO = 'Novo',
  USADO = 'Usado',
}

@Entity()
export class Property {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @ManyToOne(() => Neighborhood)
  // @JoinColumn({ name: 'neighborhood' })
  @Column({ type: 'enum', enum: NeighborhoodEnum })
  neighborhood?: NeighborhoodEnum;

  @Column()
  name: string;

  @Column({ nullable: true })
  details?: HouseDetailsEnum | CondoDetailsEnum | ApartmentDetailsEnum;

  @Column()
  address: string;

  @Column()
  condition: PropertyConditionEnum;

  @Column('float')
  area: number;

  @Column()
  dorms: number;

  @Column()
  owner: string;

  @Column()
  phone: string;

  @Column('float')
  price: number;

  @Column({ nullable: true })
  reportValue?: number;

  @Column()
  type: string;

  @Column({ nullable: true })
  condoPrice?: number;

  @Column({ nullable: true })
  carSpaces?: number;

  @Column({ nullable: true })
  aptoNumber?: number;

  @Column({ nullable: true })
  featuredImage?: string;

  @Column('text', { nullable: true, array: true })
  images?: string[];

  @CreateDateColumn({ nullable: true })
  reportWrittenAt: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
