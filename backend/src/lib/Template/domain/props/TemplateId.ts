import { TemplateError } from "../errors";

export class TemplateId {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.isValid();
  }

  private isValid() {
    if (!this.value) {
      throw new TemplateError("TemplateGenerator id is not valid");
    }
  }
}
