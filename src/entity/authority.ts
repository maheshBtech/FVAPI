import {Entity,PrimaryColumn} from "typeorm";

@Entity()
export default class Authority{
    @PrimaryColumn()
    name:string;
}