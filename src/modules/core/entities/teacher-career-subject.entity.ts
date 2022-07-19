import { CareerEntity, GeneralScheduleEntity, SubjectEntity, TeacherEntity } from "@core/entities";
import { CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, Column } from "typeorm";

@Entity('teacher-career-subjects')
export class TeacherCareerSubjectEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {
        length: 255,
        comment: 'Nombre de teacher-career-subject',
        name: 'name',
    })
    name: string;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        comment: 'Fecha de creacion de teacher-career-subject',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        comment: 'Fecha de actualizacion de teacher-career-subject',
    })
    updatedAt: Date;

    @DeleteDateColumn({
        name: 'deleted_at',
        type: 'timestamptz',
        nullable: true,
        comment: 'Fecha de eliminacion de teacher-career-subject',
    })
    deletedAt: Date;

    @ManyToOne(() => TeacherEntity, { nullable: true })
    @JoinColumn({ name: 'teacher_id' })
    teacher: TeacherEntity;

    @ManyToOne(() => CareerEntity, { nullable: true })
    @JoinColumn({ name: 'career_id' })
    career: CareerEntity;

    @ManyToOne(() => SubjectEntity, { nullable: true })
    @JoinColumn({ name: 'subject_id' })
    subject: SubjectEntity;

    @OneToMany(() => GeneralScheduleEntity, (generalSchedules) => generalSchedules.teacherCareerSubject)
    generalSchedules: GeneralScheduleEntity[];
}
