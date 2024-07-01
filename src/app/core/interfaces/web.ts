export type ReturnAlertTypes = 'OK' | 'INFO' | 'ERROR';

export interface StandardResponse<T> {
  statusCode: ReturnAlertTypes;
  statusMessage: string;
  data: T;
}

export type AlertType = 'ALL' | 'INFO' | 'ERROR' | 'OK' | 'NONE';
