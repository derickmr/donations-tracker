import {Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, OneToMany} from "typeorm";
import { Donation } from "./Donation";

@Entity()
export class User {

    @PrimaryColumn({ unique: true })
    email: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    password: string;

    @OneToMany(() => Donation, donation => donation.user,
    {onUpdate: 'CASCADE', onDelete: 'CASCADE'})
    donations: Donation[];
}
