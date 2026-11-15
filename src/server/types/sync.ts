import { ID, Timestamp } from "./domain";

export type SyncStatus = "pending" | "syncing" | "synced" | "failed";

export type SyncEntity = {
  syncStatus: SyncStatus;
  lastSyncedAt?: Timestamp;
};

export type SyncMetadata = {
  lastAttemptAt?: Timestamp;
  retryCount: number;
  errorMessage?: string;
};

export type SyncableEntity = SyncEntity & SyncMetadata;

export type SyncOperation = "create" | "update" | "delete";

export type SyncQueueItem = {
  id: ID;
  entityType: string;
  entityId: ID;
  createdAt: Timestamp;
  operation: SyncOperation;
};

export type SyncResult = {
  success: boolean;
  entityId: ID;
  operation: SyncOperation;
  message?: string;
};

export type SyncSummary = {
  total: number;
  successful: number;
  failed: number;
  pending: number;
};
