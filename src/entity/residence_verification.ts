
import {OneToOne,JoinColumn,Column,Entity,PrimaryGeneratedColumn,BaseEntity,ManyToOne, UpdateDateColumn, CreateDateColumn,ManyToMany,JoinTable} from "typeorm";
import Users from "./users";
import Cases from "../entity/cases"
@Entity()
export default class ResidenceVerification extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    address:string;

    @Column()
    since:string;

    @Column({type:"bool"})
    addressMatch:boolean;

    @Column()
    personName:string;

    @Column()
    relationship:string;

    @Column()
    applicantDob:string;

    @Column({type:'bool'})
    owned:boolean;

    @Column()
    totalMembers:number;

    @Column()
    earningMembers:number;

    @Column()
    workDetails:string;

    @Column()
    housingType:string;

    @Column()
    floorCount:number;

    @Column()
    neighbourFeedback:string;

    @Column()
    locality:string;

    @Column()
    landMark:string;

    @Column()
    remarks:string;

   

    @Column()
    createdBy:string;

    @Column()
    @CreateDateColumn()
    createdDate:Date;

    @Column()
    lastModifiedBy:string;

    @Column()
    @UpdateDateColumn()
    lastModifiedDate:Date;

    @Column()
    caseStatus:string;

    @Column()
    residenceType:string;

    @Column("longtext")
    area:string;

    @Column('tinytext')
    rejectReason:string;

    @Column("tinytext")
    finalStatus:string;

    @Column()
    fieldCaseId:number;

    @ManyToOne(()=>Cases,(c:Cases)=>c.residenceVerification,{onDelete:"CASCADE"})
    @JoinColumn({name:"fieldCaseId"})
    Case:Cases

    @ManyToMany(()=>Users,(user:Users)=>user.id)
    @JoinTable({
        name:"residence_verification_user",
        joinColumn:{
            name:"residenceVerificationId",
            referencedColumnName:"id"
        },
        inverseJoinColumn:{
            name:"userId",
            referencedColumnName:"id"
        }
    })
    users:Users[]
}