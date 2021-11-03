import { Table, Column, Model, HasMany, BelongsToMany, Unique, Length, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript'
import Like from './Like';
import User from './User'

@Table({
    tableName: 'posts',
    timestamps: true,
    paranoid: true
})
export default class Post extends Model<Post> {
    @Column({
        primaryKey: true,
        autoIncrement: true
    })
    idx!: number;

    @ForeignKey(() => User)
    @Column
    useridx!: number;

    @Column({ allowNull: false, defaultValue: true })
    secret!: boolean;

    @Column({ allowNull: false, defaultValue: 0 })
    likenum!: number;

    @Column({ type: DataType.STRING(1024)})
    contents!: string;

    @Column({ type: DataType.STRING(1024)})
    picture1!: string;

    @Column({ type: DataType.STRING(1024)})
    picture2!: string;

    @Column({ type: DataType.STRING(1024)})
    picture3!: string;

    @BelongsTo(() => User, {foreignKey: 'useridx', targetKey: 'idx'})
    BTUseruseridx?: User

    @BelongsToMany(() => User, {through: () => Like, foreignKey: 'postidx'})
    BTMLikepostidx?: User[]
}