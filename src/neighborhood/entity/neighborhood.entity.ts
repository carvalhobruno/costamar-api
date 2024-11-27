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
  CIDADE_DA_CRIANCA = 'Cidade da Criança',
  FLORIDA = 'Flórida',
  REAL = 'Real',
  IMPERADOR = 'Imperador',
  MELVI = 'Melvi',
  SAMAMBAIA = 'Samambaia',
  PARQUE_DAS_AMERICAS = 'Parque das Américas',
  NOVA_MIRIM = 'Nova Mirim',
  MIRIM = 'Mirim',
  RIBEIROPOLIS = 'Ribeirópolis',
  OCIAN = 'Ocian',
  ANHANGUERA = 'Anhanguera',
  QUIETUDE = 'Quietude',
  TUPI = 'Tupi',
  TUPIRY = 'Tupiry',
  VILA_ANTARTICA = 'Vila Antártica',
  VILA_SONIA = 'Vila Sônia',
  GLORIA = 'Glória',
  TUDE_BASTOS = 'Tude Bastos',
  FORTE = 'Forte',
  JARDIM_REAL = 'Jardim Real',
  SAO_VICENTE = 'São Vicente',
}

export enum HouseDetailsEnum {
  TRIPLEX = 'Triplex',
  SOBRADO = 'Sobrado',
  TERREA = 'Térrea',
  SOBREPOSTA = 'Sobreposta',
}

export enum ApartmentDetailsEnum {
  TERREA = 'Térrea',
  TERREA_DE_FUNDO = 'Térrea de fundo',
  SOBREPOSTA = 'Sobreposta',
  SOBREPOSTA_DE_FUNDO = 'Sobreposta de fundo',
  SOBRADO = 'Sobrado',
  SOBRADO_DE_FUNDO = 'Sobrado de fundo',
  SACADA = 'Sacada',
  DUPLEX = 'Duplex',
}

export enum CondoDetailsEnum {
  APTO = 'Apartamento',
  TERREA = 'Térrea',
  COBERTURA = 'Cobertura',
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
