import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum ConfigItemType {
    Boolean = 'boolean',
    Number = 'number',
    String = 'string',
    Object = 'object',
}

@Entity({
    name: 'config',
})
export class ConfigItemEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    feature: string;

    @Column()
    path: string;

    @Column({
        type: 'enum',
        enum: ConfigItemType,
    })
    type: ConfigItemType;

    @Column({
        type: 'text',
    })
    value: string;
}
