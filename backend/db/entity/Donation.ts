import {Entity, PrimaryGeneratedColumn, Column, Double} from "typeorm";

@Entity()
export class Donation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('double')
    amount: Double;

    @Column()
    projectId: string;

}
