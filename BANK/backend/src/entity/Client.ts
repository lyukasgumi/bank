import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export class Client {
	@ObjectIdColumn()
	id: ObjectID;

	@Column()
	name: string;

	@Column()
	IDnum: string;

	@Column()
	phone: number;

	@Column()
	cID: number;

	@Column({
		type: "boolean",
		default: false,
	})
	deleted: boolean;

	@Column("jsonb", { array: true })
	Accounts: [];
}
