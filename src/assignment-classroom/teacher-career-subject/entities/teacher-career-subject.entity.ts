import { Career } from "../../career/entities/career.entity";
import { Subject } from "../../subject/entities/subject.entity";
import { Teacher } from "../../teacher/entities/teacher.entity";
import { CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { GeneralSchedule } from "../../general-schedule/entities/general-schedule.entity";

@Entity()
export class TeacherCareerSubject {
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

    @ManyToOne(() => Teacher, (teacher) => teacher.teacherCareerSubjects)
    @JoinColumn({ name: 'teacher_id' })
    teacher: Teacher;

    @ManyToOne(() => Career, (career) => career.teacherCareerSubjects)
    @JoinColumn({ name: 'career_id' })
    career: Career;

    @ManyToOne(() => Subject, (subject) => subject.teacherCareerSubjects)
    @JoinColumn({ name: 'subject_id' })
    subject: Subject;

    @OneToMany(() => GeneralSchedule, (generalSchedules) => generalSchedules.teacherCareerSubject)
    generalSchedules: GeneralSchedule[];
}
