// src/hooks/useDocumentGenerator.ts
import { useState, useCallback } from "react";
import axios from "axios";
import { generateDocument } from "../services/api";
import { VariableExtracted } from "../types";

export const useDocumentGenerator = () => {
  const [generationMessage, setGenerationMessage] = useState<string>("");
  const [generationError, setGenerationError] = useState<string>("");

  const handleGenerate = useCallback(
    async (
      templateId: string,
      variables: { key: VariableExtracted; value: string }[]
    ) => {
      if (!templateId) {
        setGenerationMessage("");
        setGenerationError("Por favor, selecciona una plantilla.");
        return;
      }

      console.log(variables);

      const dataToSend: Record<string, string> = {};
      variables.forEach((v) => {
        if (v.key) dataToSend[v.key.name] = v.value;
      });

      console.log(variables);

      setGenerationMessage("Generando documento...");
      setGenerationError("");

      console.log("ENVIANDO AL BACKEND:", dataToSend);

      try {
        const { blob, filename } = await generateDocument(
          templateId,
          dataToSend
        );

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

        setGenerationMessage("Documento generado y descargado con éxito!");
      } catch (error) {
        console.error("Error al generar el documento:", error);
        setGenerationMessage("");

        if (axios.isAxiosError(error) && error.response) {
          try {
            const errorBlob = new Blob([error.response.data], {
              type: "application/json",
            });
            const reader = new FileReader();
            reader.onload = () => {
              try {
                const errorData = JSON.parse(reader.result as string);
                setGenerationError(
                  `Error: ${errorData.message || "Error desconocido."} ${
                    errorData.details ? JSON.stringify(errorData.details) : ""
                  }`
                );
              } catch {
                setGenerationError(
                  "No se pudo interpretar el mensaje de error del servidor."
                );
              }
            };
            reader.readAsText(errorBlob);
          } catch {
            setGenerationError(
              "Error desconocido al procesar el mensaje de error."
            );
          }
        } else {
          setGenerationError(
            `Error: ${error instanceof Error ? error.message : String(error)}`
          );
        }
      }
    },
    []
  );

  return {
    handleGenerate,
    generationMessage,
    generationError,
  };
};
