
/**
 *
 */
export default function (schema: Object): Object {
  return schema.define('User', {
    createdAt: { type: schema.Date, default: Date.now },
    email: { type: schema.String, null: false, unique: true },
    id: { type: schema.Number, null: false, unique: true },
    username: { type: schema.String, null: false, unique: true },
    updatedAt: { type: schema.Date }
  }, {
    primaryKeys: ['id']
  });
}
