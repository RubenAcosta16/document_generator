// src/components/Messages.tsx
import React from 'react';

interface MessagesProps {
    message: string;
    type: 'success' | 'error' | 'info';
}

/**
 * @function Messages
 * @description Componente para mostrar mensajes de estado (éxito, error, información).
 * @param {MessagesProps} props - Propiedades del componente.
 * @param {string} props.message - El mensaje a mostrar.
 * @param {'success' | 'error' | 'info'} props.type - El tipo de mensaje para aplicar estilos.
 */
const Messages: React.FC<MessagesProps> = ({ message, type }) => {
    if (!message) return null;

    let bgColor = '';
    let textColor = '';
    let borderColor = '';

    switch (type) {
        case 'success':
            bgColor = 'bg-green-50';
            textColor = 'text-green-600';
            borderColor = 'border-green-200';
            break;
        case 'error':
            bgColor = 'bg-red-50';
            textColor = 'text-red-600';
            borderColor = 'border-red-200';
            break;
        case 'info':
            bgColor = 'bg-blue-50';
            textColor = 'text-blue-600';
            borderColor = 'border-blue-200';
            break;
        default:
            bgColor = 'bg-gray-50';
            textColor = 'text-gray-600';
            borderColor = 'border-gray-200';
    }

    return (
        <p className={`text-sm mt-2 p-3 rounded-md border ${bgColor} ${textColor} ${borderColor}`}>
            {message}
        </p>
    );
};

export default Messages;
