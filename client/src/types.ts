export interface User {
  _id: string;
  name: string;
}

export interface Pdf {
  _id: string;
  user: User;
  file: string;
  createdAt: Date;
  updatedAt: Date;
  date: Date;
}

export interface GetPdfsParams {
  date?: string; // ISO date string like "2025-04-14"
  page?: number;
  limit?: number;
}

export interface DecodedToken {
  role?: string;
  [key: string]: unknown;
}
