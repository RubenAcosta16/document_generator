import { Template } from "../Template";
import { Variable } from "../types";
// import { Template } from "../Template";

export interface TemplateGeneratorUtilsRepository {
  extractVariablesFromDocx(contentBuffer: Buffer): Variable[];

  // createTemplate(file: Buffer): Template;

  generateDocx(
    template: Template,
    variables: { [key: string]: string }
  ): Promise<Buffer<ArrayBufferLike>>;

  generateId(): string;
}
