// src/App.tsx
// import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import React, { useState } from "react";
import Header from "../components/Header";
import TemplateUpload from "../components/TemplateUpload";
import TemplateList from "../components/TemplateList";
import VariableForm from "../components/variables/VariableForm";
// import Messages from './components/Messages'; // Para mensajes globales si es necesario

import { useTemplates } from "../hooks/useTemplates";
import { useVariables } from "../hooks/useVariables";
import { useAuth } from "../../Auth/hooks/useAuth";
import { useDocumentGenerator } from "../hooks/useDocumentGenerator";

const Templates: React.FC = () => {
  const navigate = useNavigate();

  useAuth({
    elseFn: () => navigate("/login"),
  });

  const [templateIdToGenerate, setTemplateIdToGenerate] = useState<string>("");

  const {
    availableTemplates,
    uploadMessage,
    deleteMessage,
    fileInputRef,
    handleUpload,
    handleDelete,
  } = useTemplates(setTemplateIdToGenerate);

  const {
    variables,
    handleVariableChange,
    addVariableField,
    removeVariableField,
  } = useVariables(templateIdToGenerate);
  const { handleGenerate, generationMessage, generationError } =
    useDocumentGenerator();

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans text-gray-800 flex flex-col items-center">
      <Link to="/">Home page</Link>
      <Header />

      <main className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-8 space-y-10">
        <TemplateUpload
          uploadMessage={uploadMessage}
          fileInputRef={fileInputRef}
          onFileUpload={handleUpload}
        />

        <section>
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            2. Generar Documento desde Plantilla
          </h2>
          <div className="space-y-6">
            <TemplateList
              availableTemplates={availableTemplates}
              selectedTemplateId={templateIdToGenerate}
              onSelectTemplate={setTemplateIdToGenerate}
              onDeleteTemplate={(id, filename) =>
                handleDelete(id, filename, templateIdToGenerate, () =>
                  setTemplateIdToGenerate("")
                )
              }
              deleteMessage={deleteMessage}
            />

            <VariableForm
              variables={variables}
              handleVariableChange={handleVariableChange}
              addVariableField={addVariableField}
              removeVariableField={removeVariableField}
              onGenerateDocument={() =>
                handleGenerate(templateIdToGenerate, variables)
              }
              generationMessage={generationMessage}
              generationError={generationError}
              selectedTemplateId={templateIdToGenerate}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Templates;
