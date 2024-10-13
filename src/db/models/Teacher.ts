import { Table, Column, Model, PrimaryKey, BelongsToMany } from 'sequelize-typescript'
import { Student } from './Student'
import { TeacherStudent } from './TeacherStudent'

@Table
export class Teacher extends Model<Teacher> {
  @PrimaryKey
  @Column
  email!: string

  @BelongsToMany(() => Student, () => TeacherStudent)
  students!: Student[]
}
