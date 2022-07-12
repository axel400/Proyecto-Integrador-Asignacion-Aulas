import { Classroom } from "../../classroom/entities/classroom.entity";
import { CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Schedule } from "../../schedule/entities/schedule.entity";
import { TeacherCareerSubject } from "../../teacher-career-subject/entities/teacher-career-subject.entity";

@Entity()
export class GeneralSchedule {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({
        name: 'create_at',
        type: 'timestamptz',
    })
    createAt: Date;

    @UpdateDateColumn({
        name: 'update_at',
        type: 'timestamptz',
    })
    updateAt: Date;

    @DeleteDateColumn({
        name: 'delete_at',
        type: 'timestamptz',
    })
    deleteAt: Date;

    @ManyToOne(() => Classroom, (classroom) => classroom.generalSchedules)
    @JoinColumn({ name: 'classroom_id' })
    classroom: Classroom;

    @ManyToOne(() => Schedule, (schedule) => schedule.generalSchedules)
    @JoinColumn({ name: 'schedule_id' })
    schedule: Schedule;

    @ManyToOne(() => TeacherCareerSubject, (teacherCareerSubject) => teacherCareerSubject.generalSchedules)
    @JoinColumn({ name: 'teacherCareerSubject_id' })
    teacherCareerSubject: TeacherCareerSubject;
}
