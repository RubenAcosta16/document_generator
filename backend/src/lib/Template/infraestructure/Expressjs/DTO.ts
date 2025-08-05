export type ExtractVariablesDTO = {
  templateId: string;
};

export type DeleteDTO = {
  templateId: string;
};

export type GenerateDocxDTO = {
  templateId: string;
  data: { [key: string]: string };
};

export type GetAllDTO = {
  page?: number;
  limit?: number;
};
