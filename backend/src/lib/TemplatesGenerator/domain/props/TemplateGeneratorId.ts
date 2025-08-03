import { TemplatesGeneratorError } from "../errors";

export class TemplateGeneratorId {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.isValid();
  }

  private isValid() {
    if (!this.value) {
      throw new TemplatesGeneratorError("TemplateGenerator id is not valid");
    }
  }
}
