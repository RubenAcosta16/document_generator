import { TemplatesGeneratorError } from "../errors";

export class TemplateGeneratorFilename {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.isValid();
  }

  private isValid() {
    if (!this.value) {
      throw new TemplatesGeneratorError("TemplateGenerator filename is not valid");
    }
    // por ahora no se me ocurren validaciones adicionales
  }
}
