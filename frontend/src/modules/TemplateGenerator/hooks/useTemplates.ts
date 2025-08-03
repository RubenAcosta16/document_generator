// src/hooks/useTemplates.ts
import { useState, useEffect, useCallback, useRef } from "react";
import { getTemplates, uploadTemplate, deleteTemplate } from "../services/api";
import { TemplateMetadata } from "../types";

/**
 * @function useTemplates
 * @description Hook personalizado para gestionar la lógica de las plantillas (cargar, subir, eliminar).
 * @param {string} templateIdToSelectAfterUpload - Opcional. El ID de la plantilla a seleccionar automáticamente después de una subida exitosa.
 * @param {Function} onTemplateSelected - Callback que se llama cuando una plantilla es seleccionada (incluyendo después de una subida).
 * @returns {object} Un objeto con el estado y las funciones relacionadas con las plantillas.
 */
export const useTemplates = (
  onTemplateSelected: (id: string) => void
) => {
  const [availableTemplates, setAvailableTemplates] = useState<
    TemplateMetadata[]
  >([]);
  const [uploadMessage, setUploadMessage] = useState<string>("");
  const [deleteMessage, setDeleteMessage] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Función para cargar las plantillas disponibles desde el backend
  const fetchTemplates = useCallback(async () => {
    try {
      const data = await getTemplates();
      setAvailableTemplates(data);
    } catch (error) {
      console.error("Error al cargar las plantillas disponibles:", error);
      // Considerar mostrar un mensaje de error al usuario
    }
  }, []);

  // Efecto para cargar las plantillas al montar el componente
  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  /**
   * @function handleUpload
   * @description Maneja la subida de un archivo de plantilla.
   * @param {React.ChangeEvent<HTMLInputElement>} event - El evento de cambio del input de archivo.
   */
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setUploadMessage("Por favor, selecciona un archivo.");
      return;
    }

    setUploadMessage("Subiendo plantilla...");
    setDeleteMessage(""); // Limpiar otros mensajes

    try {
      const response = await uploadTemplate(file);
      setUploadMessage(
        `Plantilla '${response.filename}' subida con éxito. ID: ${response.templateId}`
      );
      await fetchTemplates(); 
      onTemplateSelected(response.templateId); 

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error al subir la plantilla:", error);
      setUploadMessage(
        "Error al subir la plantilla. Consulta la consola para más detalles."
      );
    }
  };

  /**
   * @function handleDelete
   * @description Maneja la eliminación de una plantilla.
   * @param {string} templateId - El ID de la plantilla a eliminar.
   * @param {string} filename - El nombre del archivo de la plantilla (para confirmación y mensajes).
   * @param {string} currentSelectedTemplateId - El ID de la plantilla actualmente seleccionada en el UI.
   * @param {Function} onTemplateDeselected - Callback para deseleccionar la plantilla si es la eliminada.
   */
  const handleDelete = async (
    templateId: string,
    filename: string,
    currentSelectedTemplateId: string,
    onTemplateDeselected: () => void
  ) => {
    if (
      !window.confirm(
        `¿Estás seguro de que quieres eliminar la plantilla "${filename}"? Esta acción es irreversible.`
      )
    ) {
      return;
    }

    setDeleteMessage(`Eliminando plantilla '${filename}'...`);
    setUploadMessage(""); // Limpiar otros mensajes

    try {
      await deleteTemplate(templateId);
      setDeleteMessage(`Plantilla '${filename}' eliminada con éxito.`);
      await fetchTemplates(); // Volver a cargar la lista de plantillas

      // Si la plantilla eliminada era la seleccionada, deseleccionarla
      if (currentSelectedTemplateId === templateId) {
        onTemplateDeselected();
      }

      // Resetear el input de archivo por si se quiere resubir el mismo
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error al eliminar la plantilla:", error);
      setDeleteMessage(
        `Error al eliminar la plantilla '${filename}'. Consulta la consola.`
      );
    }
  };

  return {
    availableTemplates,
    uploadMessage,
    deleteMessage,
    fileInputRef,
    handleUpload,
    handleDelete,
    fetchTemplates, // Export fetchTemplates in case it needs to be called externally
  };
};
