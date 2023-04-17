import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "Track",
  tableName: "tracks",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    serverId: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    songId: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
  },
});
