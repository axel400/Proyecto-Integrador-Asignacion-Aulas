import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateSubjectDto,
  UpdateSubjectDto,
} from 'src/assignment-classroom/subject/dtos/subject.dto';
import { Subject } from 'src/assignment-classroom/subject/entities/subject.entity';

@Injectable()
export class SubjectService {
  private countIdSubject = 1;

  private subject: Subject[] = [
    {
      id: 1,
      name: 'Desarrollo',
      description: 'Desarrollo',
    },
  ];
  /** Buscar todo */
  findAll(): Subject[] {
    return this.subject;
  }

  /**Buscar por id */

  findOne(id: number) {
    return this.subject.find((item) => item.id);
  }
  /**Create */
  getId(id: number): Subject {
    return this.subject.find((item: Subject) => item.id == id);
  }

  create(payload: CreateSubjectDto) {
    this.countIdSubject = this.countIdSubject + 1;
    const newSubject = {
      id: this.countIdSubject,
      ...payload,
    };
    this.subject.push(newSubject);
    return newSubject;
  }

  /**UPDATE */

  update(id: number, payload: UpdateSubjectDto) {
    const subject = this.findOne(id);
    if (subject) {
      const index = this.subject.findIndex((item) => item.id === id);
      this.subject[index] = {
        ...subject,
        ...payload,
      };
      return this.subject[index];
    }
    return null;
  }

  // update(id: number, body: any) {
  //     let product: Subject = {
  //       id,
  //       name: body.name,

  //     }
  //     this.subject = this.subject.map( (item: Subject) => {
  //       console.log(item, id, item.id == id);
  //       return item.id == id ? product : item;
  //     });
  //   }
  /**DELETE  */

  delete(id: number) {
    const indexSubject = this.subject.findIndex((item) => item.id === id); //
    if (indexSubject === -1) {
      throw new NotFoundException(`Materia ${id} no encontrado`);
    }

    this.subject.splice(indexSubject, 1);
    return true;
  }
}
