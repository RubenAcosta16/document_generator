import React from "react";
import { Variable } from "../../types";

type props = {
  variable: Variable;
  handleVariableChange: (
    uuid: string,
    field: "key" | "value",
    value: string
  ) => void;
};
export default function InputSize_S({ variable, handleVariableChange }: props) {
  return (
    <div className="flex flex-row gap-2">
      <input
        type="text"
        placeholder="Nombre de la variable (ej. nombre)"
        value={variable.key?.name || ""}
        onChange={(e) =>
          handleVariableChange(variable.uuid, "key", e.target.value)
        }
        className="w-1/2 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
        readOnly={!variable.isManual} // La clave es de solo lectura si no es un campo manual
      />

      <input
        type="text"
        placeholder="Valor de la variable"
        value={variable.value}
        onChange={(e) =>
          handleVariableChange(variable.uuid, "value", e.target.value)
        }
        className="w-64 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
      />
    </div>
  );
}
