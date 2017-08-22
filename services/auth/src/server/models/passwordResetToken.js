import driver from 'server/db/neo4j';
import model from 'lib/seraph-adapter';

// Create the Facebook Account model
const PasswordResetToken: Object = model(driver, 'passwordResetToken');

/**
 *
 */
PasswordResetToken.schema = {
  expiresAt: { type: 'date', required: true },
  token: { type: 'string', required: true },
  username: { type: 'string', required: true },
};

PasswordResetToken.setUniqueKey('token');
PasswordResetToken.useTimestamps();

export default PasswordResetToken;
