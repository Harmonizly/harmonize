
/**
 *
 */
export default function (schema: Object): Object {
  return schema.define('User', {
    createdAt: { type: schema.Date, default: Date.now },
    email: { type: schema.String, null: false, unique: true },
    lastPasswordUpdate: { type: schema.Date },
    password: { type: schema.String, null: false },
    username: { type: schema.String, null: false, unique: true },
    updatedAt: { type: schema.Date }
  }, {
    primaryKeys: ['username']
  });
}
