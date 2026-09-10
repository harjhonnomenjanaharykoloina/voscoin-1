export enum Role {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  AGENT = 'AGENT',
}

export interface JwtPayload {
  sub: string; // userId
  email: string;
  workspaceId: string;
  role: Role;
  iat?: number;
  exp?: number;
}

export interface AuthenticatedUser {
  userId: string;
  email: string;
  workspaceId: string;
  role: Role;
}
