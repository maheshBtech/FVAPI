import {Column,Entity,BaseEntity,PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn, OneToMany} from "typeorm";
import BusinessVerification from "./business_verification";
import ResidenceVerification from "./residence_verification";

@Entity()
export default class Cases extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    applicantName:string;

    @Column()
    bankName:string;

  
    @Column()
    product:string;

    @Column()
    referenceNumber:string;

    @Column()
    verificationType:string;

    @Column()
    phone:number;

    @Column()
    createdBy:string;

    @Column()
    lastModifiedBy:string;

    @Column()
    @CreateDateColumn()
    createdDate:Date;

    @Column()
    @UpdateDateColumn()
    lastModifiedDate:Date;

    @OneToMany(()=>BusinessVerification,(bv:BusinessVerification)=>bv.Case,{cascade:["insert","remove","update"]})
    businessVerification:BusinessVerification[]

    @OneToMany(()=>ResidenceVerification,(bv:ResidenceVerification)=>bv.Case,{cascade:["insert","remove","update"]})
    residenceVerification:ResidenceVerification[]


}