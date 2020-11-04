import {Entity, PrimaryGeneratedColumn, Column, Double} from "typeorm";

@Entity()
export class Donation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: Double;

    @Column()
    projectId: string;

}
