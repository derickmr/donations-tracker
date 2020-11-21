import {Entity, PrimaryGeneratedColumn, Column, Double, ManyToOne} from "typeorm";
import { User } from "./User";

@Entity()
export class Donation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('double precision')
    amount: Double;

    @Column()
    projectId: string;

    @ManyToOne(() => User, user => user.donations)
    user: User;

    @Column({type: 'date'})
    date: Date;
}
