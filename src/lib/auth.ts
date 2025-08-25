import { unauthorized } from './errors';

export function requireBasicAuth(authorizationHeader?: string) {
  if (!authorizationHeader?.startsWith('Basic ')) throw unauthorized('Missing Basic auth');
  const base64 = authorizationHeader.replace('Basic ', '');
  const decoded = Buffer.from(base64, 'base64').toString('utf8');
  const [user, pass] = decoded.split(':');
  if (user !== process.env.APP_ADMIN_USER || pass !== process.env.APP_ADMIN_APP_PASSWORD) {
    throw unauthorized('Invalid credentials');
  }
  return { user };
}
