// src/services/api.ts
import axios from "axios";
import { TemplateMetadata, VariableExtracted } from "../types"; // Importar interfaces
import { templatesUrl } from "../../../config";

// Base de configuración común para las peticiones
const axiosConfig = {
  withCredentials: true,
};

/**
 * @function getTemplates
 * @description Obtiene la lista de plantillas disponibles del backend.
 * @returns {Promise<TemplateMetadata[]>} Una promesa que resuelve con un array de metadatos de plantillas.
 */
export const getTemplates = async (): Promise<TemplateMetadata[]> => {
  const response = await axios.get<TemplateMetadata[]>(
    `${templatesUrl}/`,
    axiosConfig
  );
  return response.data;
};

/**
 * @function uploadTemplate
 * @description Sube un nuevo archivo de plantilla al backend.
 * @param {File} file - El archivo de plantilla a subir.
 * @returns {Promise<{ templateId: string; filename: string }>} Una promesa que resuelve con el ID y nombre del archivo de la plantilla subida.
 */
export const uploadTemplate = async (
  file: File
): Promise<{ templateId: string; filename: string }> => {
  const formData = new FormData();
  formData.append("templateFile", file);
  const response = await axios.post<{ templateId: string; filename: string }>(
    `${templatesUrl}/upload`,
    formData,
    {
      ...axiosConfig,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

/**
 * @function deleteTemplate
 * @description Elimina una plantilla del backend por su ID.
 * @param {string} templateId - El ID de la plantilla a eliminar.
 * @returns {Promise<void>} Una promesa que resuelve cuando la plantilla ha sido eliminada.
 */
export const deleteTemplate = async (templateId: string): Promise<void> => {
  await axios.delete(`${templatesUrl}/${templateId}`, axiosConfig);
};

/**
 * @function getTemplateVariables
 * @description Obtiene las variables detectadas en una plantilla específica.
 * @param {string} templateId - El ID de la plantilla.
 * @returns {Promise<string[]>} Una promesa que resuelve con un array de nombres de variables.
 */
export const getTemplateVariables = async (
  templateId: string
): Promise<VariableExtracted[]> => {
  const response = await axios.get<{ variables: VariableExtracted[] }>(
    `${templatesUrl}/${templateId}/variables`,
    axiosConfig
  );
  console.log(response.data.variables);
  return response.data.variables;
};

/**
 * @function generateDocument
 * @description Genera un documento a partir de una plantilla y datos proporcionados.
 * @param {string} templateId - El ID de la plantilla a usar.
 * @param {Record<string, string>} data - Un objeto con los pares clave-valor de las variables.
 * @returns {Promise<{ blob: Blob; filename: string }>} Una promesa que resuelve con el Blob del documento generado y su nombre de archivo.
 */
export const generateDocument = async (
  templateId: string,
  data: Record<string, string>
): Promise<{ blob: Blob; filename: string }> => {
  console.log(data);
  const response = await axios.post(
    `${templatesUrl}/generate`,
    {
      templateId,
      data,
    },
    {
      ...axiosConfig,
      responseType: "blob",
    }
  );

  const blob = new Blob([response.data], {
    type: response.headers["content-type"],
  });

  const contentDisposition = response.headers["content-disposition"];
  let filename = "generated-document.docx";
  if (contentDisposition) {
    const filenameMatch = contentDisposition.match(/filename="(.+)"/);
    if (filenameMatch && filenameMatch[1]) {
      filename = filenameMatch[1];
    }
  }
  return { blob, filename };
};
