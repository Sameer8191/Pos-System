export type ID = string;

export type Timestamp = Date;

export type BaseEntity = {
  id: ID;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

// export type Status = "active" | "inactive";

// export type UserRole = "admin" | "manager" | "cashier";