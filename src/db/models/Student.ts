import { Table, Column, Model, PrimaryKey, BelongsToMany } from 'sequelize-typescript'
import { Teacher } from './Teacher'
import { TeacherStudent } from './TeacherStudent'

@Table
export class Student extends Model<Student> {
  @PrimaryKey
  @Column
  email!: string

  @Column({ defaultValue: false })
  suspended!: boolean

  @BelongsToMany(() => Teacher, () => TeacherStudent)
  teachers!: Teacher[]
}
