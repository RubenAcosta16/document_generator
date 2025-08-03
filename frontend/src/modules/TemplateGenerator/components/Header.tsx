// src/components/Header.tsx
import React from 'react';

/**
 * @function Header
 * @description Componente de encabezado para la aplicación.
 */
const Header: React.FC = () => {
    return (
        <header className="w-full max-w-4xl text-center py-8">
            <h1 className="text-4xl font-extrabold text-blue-700 mb-2">Generador de Documentos Word</h1>
            <p className="text-lg text-gray-600">Sube tus plantillas y genera documentos personalizados.</p>
        </header>
    );
};

export default Header;
