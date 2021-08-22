
import {Column,Entity,PrimaryGeneratedColumn,BaseEntity, UpdateDateColumn, CreateDateColumn, OneToOne, JoinColumn, ManyToMany, JoinTable, ManyToOne} from "typeorm";
import Cases from "./cases";
import Users from "./users";

@Entity()
export default class BusinessVerification extends BaseEntity{
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
    personDesignation:string;

    @Column()
    otherpPersonDesignation:string;

    @Column()
    applicantQualification:string;

    @Column()
    otherApplicantQualification:string;

    @Column()
    applicantDesignation:string;

    @Column()
    otherApplicantDesignation:string;

    @Column()
    applicantIncome:number;

    @Column()
    joiningDate:string;

    @Column()
    empId:string;

    @Column()
    salaryCreditName:string;

    @Column()
    businessType:string;

    @Column()
    totalEmp:number;

    @Column()
    empObserved:string;

    @Column()
    signBoard:string;

    @Column()
    otherSignBoard:string;

    @Column()
    headOffice:string;

    @Column()
    branchCount:number;

    @Column()
    officeSetup:string;

    @Column()
    businessActivity:string; 

    @Column()
    neighbourFeedback:string;

    @Column()
    buildingType:string;

    @Column()
    otherBuildingType:string;

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
    employmentType:string;

    @Column("longtext")
    area:string;

    @Column('tinytext')
    rejectReason:string;

    @Column("tinytext")
    finalStatus:string;

    @Column()
    fieldCaseId:number;

    @ManyToOne(()=>Cases,(c:Cases)=>c.businessVerification,{onDelete:"CASCADE"})
    @JoinColumn({name:"fieldCaseId"})
    Case:Cases

    @ManyToMany(()=>Users,(user:Users)=>user.id)
    @JoinTable({
        name:"business_verification_user",
        joinColumn:{
            name:"businessVerificationId",
            referencedColumnName:"id"
        },
        inverseJoinColumn:{
            name:"userId",
            referencedColumnName:"id"
        }
    })
    users:Users[]
}