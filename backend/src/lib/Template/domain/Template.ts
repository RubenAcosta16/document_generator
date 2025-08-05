import { UserId } from "../../User/domain/Props/UserId";
import { TemplateFilename } from "./props/TemplateFilename";
import { TemplateId } from "./props/TemplateId";

export class Template {
  id: TemplateId;
  filename: TemplateFilename;
  content: Buffer;
  userId: UserId;

  constructor(
    id: TemplateId,
    filename: TemplateFilename,
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
