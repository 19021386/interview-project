/* eslint-disable prettier/prettier */
import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    AutoIncrement
} from 'sequelize-typescript'

enum ROLE_TYPE {
    SUPER = "SUPER",
    ADMIN = "ADMIN",
    USER = "USER",
}

enum GENDER_TYPE {
    MALE = "MALE",
    FEMALE = "FEMALE",
    GAY = "GAY",
    LESBIAN = "LESBIAN",
    OTHER = "OTHER",
}

enum STATUS_TYPE {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    PENDING = "PENDING",
}

@Table({
    timestamps: true,
    tableName: 'Users',
    modelName: 'User'
})
class User extends Model {

    @AutoIncrement
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
    })
    declare id: number

    @Column({
        field: 'user_name',
        type: DataType.STRING
    })
    declare userName: string

    @Column({
        type: DataType.STRING
    })
    declare password: string

    @Column({
        type: DataType.STRING
    })
    declare email: string

    @Column({
        field: 'first_name',
        type: DataType.STRING
    })
    declare firstName: string

    @Column({
        field: 'last_name',
        type: DataType.STRING
    })
    declare lastName: string

    @Column({
        type: DataType.ENUM(...Object.values(ROLE_TYPE))
    })
    declare role: ROLE_TYPE

    @Column({
        type: DataType.STRING
    })
    declare phone: string

    @Column({
        type: DataType.STRING
    })
    declare address: string

    @Column({
        field: 'avatar_img',
        type: DataType.STRING
    })
    declare avatarImg: string

    @Column({
        type: DataType.ENUM(...Object.values(GENDER_TYPE))
    })
    declare gender: GENDER_TYPE

    @Column({
        type: DataType.ENUM(...Object.values(STATUS_TYPE))
    })
    declare status: STATUS_TYPE

    @Column({
        field: 'refresh_token',
        type: DataType.STRING
    })
    declare refreshToken: string

    @CreatedAt
    declare createdAt: Date;

    @UpdatedAt
    declare updatedAt: Date;
}

export default User;
