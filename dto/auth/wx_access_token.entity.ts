import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WxAccessToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  access_token: string;

  @Column()
  expires_in: number;
}
