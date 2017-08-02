import schema from 'services/auth/db/neo4j';

/**
 *
 */
export default schema.define('PasswordResetToken', {
  createdAt: { type: schema.Date, default: Date.now },
  expiresAt: { type: schema.Date, null: false },
  token: { type: schema.String, null: false, unique: true },
  username: { type: schema.String, null: false, },
  updatedAt: { type: schema.Date }
}, {
  primaryKeys: ['token']
});
