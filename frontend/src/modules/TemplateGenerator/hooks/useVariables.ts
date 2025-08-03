// src/hooks/useVariables.ts
import { useState, useEffect, useCallback } from "react";
import { getTemplateVariables } from "../services/api";
import { Sizes, Variable } from "../types";

/**
 * @function useVariables
 * @description Hook personalizado para gestionar la lógica de las variables (detectar, añadir, eliminar, cambiar).
 * @param {string} templateId - El ID de la plantilla actualmente seleccionada.
 * @returns {object} Un objeto con el estado y las funciones relacionadas con las variables.
 */
export const useVariables = (templateId: string) => {
  // Inicializar con un campo manual vacío para permitir entrada manual si no hay plantilla
  const [variables, setVariables] = useState<Variable[]>([
    { uuid: crypto.randomUUID(), key: null, value: "", isManual: true },
  ]);

  // Función para obtener las variables de una plantilla específica
  const fetchAndSetVariables = useCallback(async (id: string) => {
    try {
      const detectedKeys = await getTemplateVariables(id);
      // Mapear variables detectadas a nuestro formato, excluyendo 'fecha' y asignando un UUID
      const detectedVars: Variable[] = detectedKeys
        .filter((v) => v.name !== "fecha") // Excluir 'fecha' de la detección automática para la UI
        .map((key) => ({ uuid: crypto.randomUUID(), key, value: "" }));

      // Reiniciar completamente las variables a las detectadas para la nueva plantilla
      setVariables(
        detectedVars.length > 0
          ? detectedVars
          : [
              {
                uuid: crypto.randomUUID(),
                key: null,
                value: "",
                isManual: true,
              },
            ]
      );
    } catch (error) {
      console.error(
        `Error al cargar variables para la plantilla ${id}:`,
        error
      );
      setVariables([
        { uuid: crypto.randomUUID(), key: null, value: "", isManual: true },
      ]); // Volver a un campo manual vacío en caso de error
    }
  }, []);

  // Efecto para cargar las variables cuando el ID de la plantilla cambia
  useEffect(() => {
    if (templateId) {
      fetchAndSetVariables(templateId);
    } else {
      // Si no hay plantilla seleccionada, resetear a un campo manual vacío
      setVariables([
        { uuid: crypto.randomUUID(), key: null, value: "", isManual: true },
      ]);
    }
  }, [templateId, fetchAndSetVariables]);

  /**
   * @function handleVariableChange
   * @description Actualiza el valor de una variable específica.
   * @param {string} uuidToUpdate - El UUID de la variable a actualizar.
   * @param {'key' | 'value'} field - El campo a actualizar ('key' o 'value').
   * @param {string} value - El nuevo valor.
   */
const handleVariableChange = useCallback(
  (uuidToUpdate: string, field: "key" | "value", value: string) => {
    setVariables((prevVariables) =>
      prevVariables.map((v) => {
        if (v.uuid !== uuidToUpdate) return v;

        if (field === "key") {
          return {
            ...v,
            key: { name: value, size: Sizes.S }, // asume tamaño S por defecto
          };
        }

        return {
          ...v,
          [field]: value,
        };
      })
    );
  },
  []
);


  /**
   * @function addVariableField
   * @description Añade un nuevo campo de variable manual.
   */
  const addVariableField = useCallback(() => {
    setVariables((prevVariables) => [
      ...prevVariables,
      { uuid: crypto.randomUUID(), key: null, value: "", isManual: true },
    ]);
  }, []);

  /**
   * @function removeVariableField
   * @description Elimina un campo de variable por su UUID.
   * @param {string} uuidToRemove - El UUID de la variable a eliminar.
   */
  const removeVariableField = useCallback((uuidToRemove: string) => {
    setVariables((prevVariables) => {
      const newVariables = prevVariables.filter((v) => v.uuid !== uuidToRemove);
      // Asegurar que siempre haya al menos un campo manual vacío si se eliminan todos
      return newVariables.length > 0
        ? newVariables
        : [{ uuid: crypto.randomUUID(), key: null, value: "", isManual: true }];
    });
  }, []);

  return {
    variables,
    setVariables, // Se exporta setVariables por si se necesita resetear desde fuera
    handleVariableChange,
    addVariableField,
    removeVariableField,
  };
};
