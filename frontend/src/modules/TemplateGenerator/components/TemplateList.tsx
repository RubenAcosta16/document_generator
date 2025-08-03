// src/components/TemplateList.tsx
import React from 'react';
import Messages from './Messages'; // Importar el componente Messages
import { TemplateMetadata } from '../types'; // Importar la interfaz

interface TemplateListProps {
    availableTemplates: TemplateMetadata[];
    selectedTemplateId: string;
    onSelectTemplate: (id: string) => void;
    onDeleteTemplate: (id: string, filename: string) => void;
    deleteMessage: string;
}

/**
 * @function TemplateList
 * @description Componente para mostrar la lista de plantillas disponibles con opciones de selección y eliminación.
 * @param {TemplateListProps} props - Propiedades del componente.
 * @param {TemplateMetadata[]} props.availableTemplates - Array de plantillas disponibles.
 * @param {string} props.selectedTemplateId - ID de la plantilla actualmente seleccionada.
 * @param {(id: string) => void} props.onSelectTemplate - Función para seleccionar una plantilla.
 * @param {(id: string, filename: string) => void} props.onDeleteTemplate - Función para eliminar una plantilla.
 * @param {string} props.deleteMessage - Mensaje de estado de la eliminación.
 */
const TemplateList: React.FC<TemplateListProps> = ({
    availableTemplates,
    selectedTemplateId,
    onSelectTemplate,
    onDeleteTemplate,
    deleteMessage,
}) => {
    return (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Plantillas Disponibles:</h3>
            {availableTemplates.length === 0 ? (
                <p className="text-gray-500">No hay plantillas disponibles. Sube una para empezar.</p>
            ) : (
                <ul className="space-y-2">
                    {availableTemplates.map((template) => (
                        <li
                            key={template.id}
                            className={`flex items-center justify-between p-3 rounded-md shadow-sm border cursor-pointer
                                        ${selectedTemplateId === template.id ? 'bg-blue-100 border-blue-400' : 'bg-white border-gray-100 hover:bg-gray-50'}`}
                            onClick={() => onSelectTemplate(template.id)}
                        >
                            <span className="text-gray-800 font-medium">{template.filename}</span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevenir que se seleccione la plantilla al hacer clic en eliminar
                                    onDeleteTemplate(template.id, template.filename);
                                }}
                                className="ml-4 p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 text-sm flex items-center space-x-1"
                                aria-label={`Eliminar plantilla ${template.filename}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 01-2 0v6a1 1 0 112 0V8z" clipRule="evenodd" />
                                </svg>
                                <span>Eliminar</span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            <Messages
                message={deleteMessage}
                type={deleteMessage.includes('Error') ? 'error' : 'success'}
            />
        </div>
    );
};

export default TemplateList;
