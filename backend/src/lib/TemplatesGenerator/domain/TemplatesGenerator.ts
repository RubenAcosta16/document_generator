import { UserId } from "../../User/domain/Props/UserId";
import { TemplateGeneratorFilename } from "./props/TemplateGeneratorFilename";
import { TemplateGeneratorId } from "./props/TemplateGeneratorId";

export class TemplatesGenerator {
  id: TemplateGeneratorId;
  filename: TemplateGeneratorFilename;
  content: Buffer;
  userId: UserId;

  constructor(
    id: TemplateGeneratorId,
    filename: TemplateGeneratorFilename,
    content: Buffer,
    userId: UserId
  ) {
    this.id = id;
    this.filename = filename;
    this.content = content;
    this.userId = userId;
  }

  public mapToPrimitives() {
    return {
      id: this.id.value,
      filename: this.filename.value,
      content: this.content.toString("base64"), // Convert Buffer to base64 string for
    };
  }
}
