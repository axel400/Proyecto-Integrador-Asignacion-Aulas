import { ClassroomEntity, ScheduleEntity, TeacherCareerSubjectEntity } from "@core/entities";
import { CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, Column } from "typeorm";

@Entity('generalSchedules')
export class GeneralScheduleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {
        length: 255,
        comment: 'Nombre del horario general',
        name: 'name',
    })
    name: string;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        comment: 'Fecha de creacion del horario general',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        comment: 'Fecha de actualizacion del horario general',
    })
    updatedAt: Date;

    @DeleteDateColumn({
        name: 'deleted_at',
        type: 'timestamptz',
        nullable: true,
        comment: 'Fecha de eliminacion del horario general',
    })
    deletedAt: Date;

    @ManyToOne(() => ClassroomEntity, { nullable: true })
    @JoinColumn({ name: 'classroom_id' })
    classroom: ClassroomEntity;

    @ManyToOne(() => ScheduleEntity, { nullable: true })
    @JoinColumn({ name: 'schedule_id' })
    schedule: ScheduleEntity;

    @ManyToOne(() => TeacherCareerSubjectEntity, { nullable: true })
    @JoinColumn({ name: 'teacherCareerSubject_id' })
    teacherCareerSubject: TeacherCareerSubjectEntity;
}
