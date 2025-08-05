import { TemplateError } from "../errors";

export class TemplateFilename {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.isValid();
  }

  private isValid() {
    if (!this.value) {
      throw new TemplateError("TemplateGenerator filename is not valid");
    }
    // por ahora no se me ocurren validaciones adicionales
  }
}
