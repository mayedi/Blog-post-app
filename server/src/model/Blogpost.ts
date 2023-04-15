import { Column, DataType, Model, Table } from "sequelize-typescript";


@Table({
    tableName: Blogpost.BLOGPOST_TABLE_NAME
})
export class Blogpost extends Model {
    public static BLOGPOST_TABLE_NAME = "blogpost" as string;
    public static BLOGPOST_ID = "id" as string;
    public static BLOGPOST_TITLE = "title" as string;
    public static BLOGPOST_BODY = "body" as string;
    public static BLOGPOST_TIMESTAMP = "timestamp" as string;

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: Blogpost.BLOGPOST_ID
    })
    id!:number

    @Column({
        type: DataType.STRING,
        field: Blogpost.BLOGPOST_TITLE
    })
    title!:string
    
    @Column({
        type: DataType.STRING,
        field: Blogpost.BLOGPOST_BODY
    })
    body!:string
    
    @Column({
        type: DataType.STRING,
        field: Blogpost.BLOGPOST_TIMESTAMP
    })
    timestamp!:string
    

}