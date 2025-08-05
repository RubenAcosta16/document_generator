# Creador de Documentos con Plantillas {.docx}

Esta aplicación está diseñada para simplificar la creación de documentos en formato **.docx** a través de plantillas personalizables.

---

## ¿Cómo funciona?

En lugar de modificar documentos existentes o crear formatos desde cero, esta herramienta te permite diseñar una plantilla con **variables**.

1.  **Crea tu plantilla:** Simplemente toma un documento .docx con el formato que deseas y define tus variables.
2.  **Define tus variables:** Usa la sintaxis `{nombre_variable}`. Por ejemplo, si necesitas un campo para un nombre, solo escribe `{nombre}` en tu documento.
3.  **Genera el documento:** Al cargar la plantilla en la aplicación, se detectarán automáticamente las variables y se crearán los campos de entrada correspondientes. Solo ingresa los valores y genera un documento listo al instante,rándote tiempo.

### Características adicionales de las variables:

Las variables también pueden incluir un tamaño para una mejor organización de la plantilla y los datos:

* `{nombre,s}`: Tamaño pequeño
* `{nombre,m}`: Tamaño mediano
* `{nombre,l}`: Tamaño grande

Además, la aplicación permite a los usuarios **crear una cuenta** y **gestionar sus propias plantillas**.

---

## El Desarrollo del Proyecto

Esta aplicación es un proyecto personal con el objetivo de practicar y aplicar conocimientos de desarrollo de software. Mi enfoque principal ha sido el **backend**, aunque también he trabajado en el frontend para tener un proyecto completo.

### Tecnologías y Arquitectura

* **Backend:** Desarrollado con **Node.js** y **TypeScript**. He implementado una **arquitectura hexagonal**, lo cual me ha permitido organizar mejor el código y facilita la adaptabilidad. Por ejemplo, si en el futuro decido cambiar la base de datos (actualmente es un *array* en memoria) a una como **MongoDB**, solo necesitaría crear una nueva clase que implemente la interfaz correspondiente, sin tener que modificar el resto de la aplicación. Para los *endpoints* utilicé **Express.js**.
* **Frontend:** Construido con **React**. Por ahora, mi prioridad ha sido la funcionalidad del backend, por lo que el diseño y la arquitectura del frontend aún están en desarrollo, aunque he buscado mantener una separación de componentes limpia y organizada.

### Estado Actual

Actualmente, el proyecto está en curso debido a otros compromisos. Aún falta implementar tests y documentación completa en toda la aplicación, pero estoy priorizando el desarrollo del backend.

* **Tests:** Aún no he implementado pruebas en todos los módulos, pero es una tarea pendiente.
* **Documentación:** La documentación de los *endpoints* del backend se encuentra en el archivo `README.md` de la carpeta `backend`.

## Ejecucion

Prmero debes usar las variables de entorno, las cuales encontraras un ejemplo en los archivos: .env.example en las carpetas backend y frontend, estas reemplazalas por las tuyas y crea un nuevo archivo .env

Para esto se debe ejectuar los proyectos backend y frontend, asi que abre 2 terminales:

### Backend

* Escribe cd backend
* Luego pnpm run dev

### Frontend

* Escribe cd frotend
* Luego pnpm run dev
