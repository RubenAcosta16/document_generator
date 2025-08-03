// src/components/VariableForm.tsx
import React from "react";
import Messages from "../Messages"; // Importar el componente Messages
import { Sizes, Variable } from "../../types";
import InputSize_S from "./InputSize_S";
import InputSize_M_L from "./InputSize_M_L";

interface VariableFormProps {
  variables: Variable[];
  handleVariableChange: (
    uuid: string,
    field: "key" | "value",
    value: string
  ) => void;
  addVariableField: () => void;
  removeVariableField: (uuid: string) => void;
  onGenerateDocument: () => void;
  generationMessage: string;
  generationError: string;
  selectedTemplateId: string; // Para habilitar el botón de generar
}

/**
 * @function VariableForm
 * @description Componente para el formulario de entrada de variables y el botón de generación.
 * @param {VariableFormProps} props - Propiedades del componente.
 * @param {Variable[]} props.variables - Array de variables.
 * @param {(uuid: string, field: 'key' | 'value', value: string) => void} props.handleVariableChange - Función para cambiar una variable.
 * @param {() => void} props.addVariableField - Función para añadir un campo de variable.
 * @param {(uuid: string) => void} props.removeVariableField - Función para eliminar un campo de variable.
 * @param {() => void} props.onGenerateDocument - Función para generar el documento.
 * @param {string} props.generationMessage - Mensaje de éxito de la generación.
 * @param {string} props.generationError - Mensaje de error de la generación.
 * @param {string} props.selectedTemplateId - ID de la plantilla seleccionada (para habilitar/deshabilitar el botón).
 */
const VariableForm: React.FC<VariableFormProps> = ({
  variables,
  handleVariableChange,
  addVariableField,
  removeVariableField,
  onGenerateDocument,
  generationMessage,
  generationError,
  selectedTemplateId,
}) => {
  console.log(variables);
  return (
    <div className="space-y-3 flex flex-col gap-2">
      <h3 className="text-lg font-semibold text-gray-700">
        Variables:
      </h3>
      

      <div className="flex flex-col justify-content-center items-center gap-10">
        {variables.map((variable) => (
          <div key={variable.uuid} className="flex space-x-2 items-center">
            {(variable.key?.size == Sizes.S || variable.key == null) && (
              <InputSize_S
                variable={variable}
                handleVariableChange={handleVariableChange}
              ></InputSize_S>
            )}

            {(variable.key?.size == Sizes.L ||
              variable.key?.size == Sizes.M) && (
              <InputSize_M_L
                variable={variable}
                handleVariableChange={handleVariableChange}
              ></InputSize_M_L>
            )}

            {/* Permitir eliminar solo si es un campo manual o si hay más de un campo */}
            {(variable.isManual || variables.length > 1) && (
              <button
                onClick={() => removeVariableField(variable.uuid)}
                className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors duration-200"
                aria-label="Eliminar variable"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 01-2 0v6a1 1 0 112 0V8z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={addVariableField}
        className="w-[40%] mx-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-md flex items-center space-x-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
        <span>Añadir Variable Manualmente</span>
      </button>

      <button
        onClick={onGenerateDocument}
        disabled={
          !selectedTemplateId || variables.some((v) => v.key?.name === "")
        } // Deshabilitar si no hay plantilla o hay variables sin nombre
        className={`w-full px-6 py-3 font-bold rounded-lg transition-colors duration-200 shadow-lg text-lg
                    ${
                      !selectedTemplateId ||
                      variables.some((v) => v.key?.name === "")
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
      >
        Generar y Descargar Documento
      </button>

      <Messages message={generationMessage} type="success" />
      <Messages message={generationError} type="error" />
    </div>
  );
};

export default VariableForm;
