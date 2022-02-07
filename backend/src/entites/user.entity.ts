import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import * as crypto from 'crypto';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  passwordHash: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'int', default: 0 })
  counter: number;

  public get resetRequested(): boolean {
    return this.counter > 5;
  }

  addPassword(password: string, salt: string): User {
    this.passwordHash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
      .toString('hex');
    return this;
  }

  verifyPassword(password: string, salt: string): boolean {
    const hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
      .toString('hex');
    const result = this.passwordHash === hash;

    if (result) {
      this.counter = 0;
    } else {
      this.counter++;
    }

    return result;
  }
}
