import {Entity, PrimaryGeneratedColumn, Column, PrimaryColumn} from "typeorm";
import { Donation } from "./Donation";

@Entity()
export class User {

    @PrimaryColumn({ unique: true })
    email: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column("simple-array", {default: null})
    donations: Donation[];
}
