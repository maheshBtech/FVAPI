import{BaseEntity, Column,Entity,PrimaryGeneratedColumn,PrimaryColumn} from "typeorm";

@Entity()
export default class DataConfig extends BaseEntity{
 
    @PrimaryColumn({nullable:false,default:"sample area"})
    area:string;
}