import {Entity,Column,PrimaryGeneratedColumn,OneToOne, JoinColumn, BaseEntity,ManyToMany,JoinTable} from "typeorm";
import Users from "./users";
import Authority from "./authority";

@Entity()
export default class UserInformation extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    phoneNumber:number;

    @Column('longtext')
    areas:string;

    @Column()
    status:boolean

    @Column()
    userId:number;

    @Column()
    userLogin:string

    @OneToOne(()=>Users,(user:Users)=>user.id,{onUpdate:"CASCADE",onDelete:"CASCADE"})
    @JoinColumn({name:"userId"})
    userDTO:Users;

    // @ManyToMany(()=>Authority,(authority:Authority)=>authority.name)
    // @JoinTable({
    //     name:"user_authority",
    //     joinColumn:{
    //         name:"userId",
    //         referencedColumnName:"id"
    //     },
    //     inverseJoinColumn:{
    //         name:"authorityName",
    //         referencedColumnName:"name"
    //     }
    // })
    // authority:Authority[]
    
}