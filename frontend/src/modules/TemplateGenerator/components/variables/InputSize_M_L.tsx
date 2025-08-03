import React from "react";
import { Sizes, Variable } from "../../types";

type props = {
  variable: Variable;
  handleVariableChange: (
    uuid: string,
    field: "key" | "value",
    value: string
  ) => void;
};
export default function InputSize_M_L({
  variable,
  handleVariableChange,
}: props) {
  return (
    <div className="flex flex-col justify-content-center items-center gap-2  w-[600px]">
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
      <textarea
        placeholder="Valor de la variable"
        value={variable.value}
        onChange={(e) =>
          handleVariableChange(variable.uuid, "value", e.target.value)
        }
        className={`w-full ${
          variable.key?.size == Sizes.M ? "h-32" : "h-64"
        } p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm resize-y`}
      />
    </div>
  );
}
