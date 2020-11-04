import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { Donation } from "./Donation";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    donations: Array<Donation>

}
