export interface IParameters {
  param1: string;
  param2: string;
  period: boolean;
  minutes: number;
}

export interface IResultProps {
  response: ApiResponseSchema;
}

export interface ApiResponseSchema {
  success: boolean;
  data: string;
}

export interface IActionsProps {
  handleExecutioner: (parameters: IParameters) => void;
}
