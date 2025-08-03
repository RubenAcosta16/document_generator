import { TemplatesGenerator } from "../TemplatesGenerator";
import { Variable } from "../types";
// import { TemplatesGenerator } from "../TemplatesGenerator";

export interface TemplateGeneratorUtilsRepository {
  extractVariablesFromDocx(contentBuffer: Buffer): Variable[];

  // createTemplate(file: Buffer): TemplatesGenerator;

  generateDocx(
    template: TemplatesGenerator,
    variables: { [key: string]: string }
  ): Promise<Buffer<ArrayBufferLike>>;

  generateId(): string;
}
