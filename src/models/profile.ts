import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    birthday: number;

    @Column()
    photo: string;

    @Column()
    quote: string;
}