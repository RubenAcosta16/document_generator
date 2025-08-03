// src/components/TemplateUpload.tsx
import React from "react";
import Messages from "./Messages"; // Importar el componente Messages

interface TemplateUploadProps {
  uploadMessage: string;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // uploadedTemplateId: string | null;
}

/**
 * @function TemplateUpload
 * @description Componente para la subida de archivos de plantilla.
 * @param {TemplateUploadProps} props - Propiedades del componente.
 * @param {string} props.uploadMessage - Mensaje de estado de la subida.
 * @param {React.RefObject<HTMLInputElement>} props.fileInputRef - Ref para el input de archivo.
 * @param {(event: React.ChangeEvent<HTMLInputElement>) => void} props.onFileUpload - Función para manejar la subida.
 * @param {string | null} props.uploadedTemplateId - ID de la última plantilla subida (si existe).
 */
const TemplateUpload: React.FC<TemplateUploadProps> = ({
  uploadMessage,
  fileInputRef,
  onFileUpload,
}) => {
  return (
    <section className="border-b pb-8 border-gray-200">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">
        1. Subir Plantilla de Documento (.docx)
      </h2>
      <div className="text-sm text-gray-500 mb-2">
        <p>
          Nomenclatura variables a introducir {"nombre_variable,algun_tamaño"}
        </p>
        <p>Los tamaños son: s, m, l</p>
        <p>Ejemplo {"introduccion,m"}</p>
        <p>
          <span className="font-semibold text-blue-600">Nota:</span> La variable
          {"{fecha}"} será auto-llenada por el servidor si no la proporcionas.
        </p>
      </div>
      <div className="flex flex-col items-start space-y-4">
        <label
          htmlFor="template-upload"
          className="block text-gray-700 text-sm font-medium"
        >
          Selecciona tu archivo Word:
        </label>
        <input
          type="file"
          id="template-upload"
          accept=".docx"
          onChange={onFileUpload}
          ref={fileInputRef}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        <Messages
          message={uploadMessage}
          type={uploadMessage.includes("Error") ? "error" : "success"}
        />
        {/* {uploadedTemplateId && (
                    <p className="text-sm text-gray-700 mt-2 p-2 bg-blue-50 rounded-md border border-blue-200">
                        <span className="font-semibold">ID de la plantilla subida:</span> <code className="bg-blue-100 p-1 rounded text-blue-800">{uploadedTemplateId}</code>
                    </p>
                )} */}
      </div>
    </section>
  );
};

export default TemplateUpload;
