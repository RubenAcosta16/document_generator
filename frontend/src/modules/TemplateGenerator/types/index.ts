// src/types/index.ts

/**
 * @interface TemplateMetadata
 * @description Define la estructura de los metadatos de una plantilla de documento.
 * @property {string} id - Identificador único de la plantilla.
 * @property {string} filename - Nombre del archivo original de la plantilla.
 */
export interface TemplateMetadata {
  id: string;
  filename: string;
}

/**
 * @interface Variable
 * @description Define la estructura de una variable para el formulario de entrada.
 * @property {string} uuid - Identificador único para la clave de React (evita parpadeos).
 * @property {string} key - El nombre de la variable (ej. "nombre", "fecha").
 * @property {string} value - El valor que se asignará a la variable.
 * @property {boolean} [isManual] - Opcional. True si la variable fue añadida manualmente por el usuario.
 * Las variables auto-detectadas no tendrán esta propiedad o será false.
 */
export interface Variable {
  uuid: string;
  key: VariableExtracted | null;
  value: string;
  isManual?: boolean;
}

export enum Sizes {
  S = "s",
  M = "m",
  L = "l",
}

export type VariableExtracted = {
  name: string;
  size: Sizes;
};
