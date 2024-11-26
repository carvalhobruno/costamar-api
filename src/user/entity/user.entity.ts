import { Role } from 'src/auth/enums/role.enum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: [Role.RE_Agent], type: 'text', array: true })
  roles: Role[];

  @Column({ default: true })
  isActive: boolean;
}
