import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { v4 as uuidv4 } from "uuid";

import { TemplateGeneratorUtilsRepository } from "../domain/repository/TemplateGeneratorUtilsRepository";
import { Template } from "../domain/Template";
import { Sizes, Variable } from "../domain/types";

export class UtilsRepositoryTemplateGenerator
  implements TemplateGeneratorUtilsRepository
{
  generateId(): string {
    return uuidv4();
  }

/**
 * The function `extractVariablesFromDocx` parses a DOCX file to extract variables and their sizes.
 * @param {Buffer} contentBuffer - The `extractVariablesFromDocx` function takes a `Buffer` object
 * named `contentBuffer` as a parameter. This buffer contains the content of a DOCX file. The function
 * reads the content of the DOCX file, extracts variables enclosed in curly braces `{}` along with
 * optional size information,
 * @returns The function `extractVariablesFromDocx` is returning an array of unique `Variable` objects
 * extracted from the content of a DOCX file. Each `Variable` object has a `name` property representing
 * the variable name and a `size` property representing the variable size. If there is an error during
 * the extraction process, an empty array is returned.
 */
  extractVariablesFromDocx(contentBuffer: Buffer): Variable[] {
    try {
      const zip = new PizZip(contentBuffer);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      const docXml = doc.getZip().files["word/document.xml"].asText();
      const plainText = docXml.replace(/<[^>]+>/g, "");

      const regex = /{([^{}]+)}/g;
      const matches = [...plainText.matchAll(regex)];

      const variables: Variable[] = matches.map((match) => {
        const content = match[1].trim();
        const [rawName, rawSize] = content.split(",");

        const name = rawName.trim();
        const sizeStr = rawSize?.trim().toLowerCase();

        // Validar size, usar Sizes.M por defecto si no es válido
        const size =
          sizeStr === Sizes.M
            ? Sizes.M
            : sizeStr === Sizes.L
            ? Sizes.L
            : Sizes.S;

        return { name, size };
      });

      // Eliminar duplicados por nombre (con tamaño del primero que aparece)
      const seen = new Set<string>();
      const uniqueVariables: Variable[] = [];
      for (const variable of variables) {
        if (!seen.has(variable.name)) {
          seen.add(variable.name);
          uniqueVariables.push(variable);
        }
      }

      return uniqueVariables;
    } catch (error) {
      console.error("Error extrayendo variables del DOCX:", error);
      return [];
    }
  }

  async generateDocx(
    template: Template,
    data: { [key: string]: string }
  ): Promise<Buffer> {
    console.log("dataaaa abajo");
    console.log(data);
    const filledData = this.autoFillFecha(template.content, data);

    console.log("filledData");
    console.log(filledData);

    const doc = this.renderTemplate(template.content, filledData);

    return this.generateBuffer(doc);
  }

  private autoFillFecha(
    templateContent: Buffer,
    data: { [key: string]: string }
  ): { [key: string]: string } {
    const variables = this.extractVariablesFromDocx(templateContent);
    const filledData = { ...data };

    const hasFecha = variables.some((v) => v.name === "fecha");

    if (hasFecha && !filledData.fecha) {
      const today = new Date();
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      filledData.fecha = today.toLocaleDateString("es-ES", options);
    }

    return filledData;
  }

  private renderTemplate(
    templateContent: Buffer,
    data: { [key: string]: string }
  ): Docxtemplater {
    const zip = new PizZip(templateContent);
    let xml = zip.files["word/document.xml"].asText();

    // Paso 1: Unir <w:t> partidos (esencial para que el regex funcione)
    xml = this.mergeBrokenVariables(xml);

    // Paso 2: Reemplazar {variable,size} por {{variable}} — solo si está bien formado
    xml = xml.replace(
      /{([^{}]+?)\s*,\s*[smlSML]\s*}/g,
      (_, name) => `{${name.trim()}}`
    );

    console.log(
      "XML modificado para Docxtemplater (antes de crear Docxtemplater):"
    );
    console.log(xml);

    // Paso 3: Guardar XML modificado en el zip
    zip.file("word/document.xml", xml);

    // Paso 4: Crear Docxtemplater con XML limpio
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.setData(data);
    doc.render(); // lo lanzas aquí, o después en tu código

    return doc;
  }

  private generateBuffer(doc: Docxtemplater): Buffer {
    return doc.getZip().generate({
      type: "nodebuffer",
      compression: "DEFLATE",
    });
  }

  private mergeBrokenVariables(xml: string): string {
    return xml.replace(
      /((<w:r\b[^>]*>\s*<w:t\b[^>]*>[^<]*<\/w:t>\s*<\/w:r>\s*){2,})/g,
      (match) => {
        // Extraer todos los textos dentro de esta secuencia de w:t
        const texts = [...match.matchAll(/<w:t[^>]*>([^<]*)<\/w:t>/g)].map(
          (m) => m[1]
        );
        const combined = texts.join("");

        if (combined.includes("{") && combined.includes("}")) {
          // Si contiene variable, unificamos todo en un solo <w:t>
          const cleaned = combined.replace(/\s+/g, " "); // opcional: limpiar espacios
          return `<w:r><w:t>${cleaned}</w:t></w:r>`;
        }

        return match; // si no es una variable, no tocamos nada
      }
    );
  }
}
