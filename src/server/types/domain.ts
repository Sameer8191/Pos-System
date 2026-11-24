export type ID = string;

export type Timestamp = Date;

export type BaseEntity = {
  id: ID;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
