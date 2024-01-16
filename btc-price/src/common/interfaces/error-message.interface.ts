export interface ErrorMessageInterface {
  status: number;
  message: string;
  timestamp: string;
  serverMessage?: string | undefined;
}
