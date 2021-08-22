import {Entity,Column,PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinTable, BaseEntity, ManyToMany, OneToOne, JoinColumn} from "typeorm";
import Authority  from "./authority";
/*
--> for string by default datatype will be varchar (225)
--> for number the datatype will br int(11)
*/

@Entity('users')
export default class Users extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    login:string;

    @Column({select:false})
    password:string;

    @Column()
    firstName:string;

    @Column()
    lastName:string;

    @Column()
    email:string;

    @Column()
    activated:boolean;

    @Column()
    resetKey:number;

    @Column()
    langKey:string;

    @Column()
    createdBy:string;

    @Column()
    @CreateDateColumn()
    createdDate:Date;

    @Column({type:'timestamp', nullable:false, default:()=>'CURRENT_TIMESTAMP'})
    resetDate:string;

    @Column()
    lastModifiedBy:string;

    @Column()
    @UpdateDateColumn()
    lastModifiedDate:Date;

    @Column()
    authorityName:string;


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
