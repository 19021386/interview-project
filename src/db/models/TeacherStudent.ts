import { Table, Column, Model, ForeignKey, PrimaryKey } from 'sequelize-typescript'
import { Teacher } from './Teacher'
import { Student } from './Student'

@Table({
  timestamps: true // This adds createdAt and updatedAt automatically
})
export class TeacherStudent extends Model<TeacherStudent> {
  @ForeignKey(() => Teacher)
  @PrimaryKey
  @Column
  teacherEmail!: string

  @ForeignKey(() => Student)
  @PrimaryKey
  @Column
  studentEmail!: string
}
