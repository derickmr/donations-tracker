import {Entity, PrimaryGeneratedColumn, Column, Double, ManyToOne} from "typeorm";
import { User } from "./User";

@Entity()
export class Donation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('double')
    amount: Double;

    @Column()
    projectId: string;

    @ManyToOne(() => User, user => user.donations)
    user: User;
}
