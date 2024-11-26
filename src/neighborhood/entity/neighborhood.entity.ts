import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum NeighborhoodEnum {
  MARACANA = 'Maracanã',
  VILA_CAICARA = 'Caiçara',
  CANTO_DO_FORTE = 'Canto do Forte',
  AVIACAO = 'Aviação',
  BOQUEIRAO = 'Boqueirão',
  CAMPO_GRANDE = 'Campo Grande',
  CIDADE_OCIAN = 'Cidade Ocian',
  GUILHERMINA = 'Guilhermina',
  VILA_MIRIM = 'Vila Mirim',
  VILA_TUPI = 'Vila Tupi',
  MONGAGUA = 'Mongaguá',
  SOLEMAR = 'Solemar',
}

@Entity()
export class Neighborhood {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: NeighborhoodEnum,
    nullable: false,
  })
  name: NeighborhoodEnum;
}
