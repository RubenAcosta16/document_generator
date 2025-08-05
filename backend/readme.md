---
## Endpoints de la API

### Rutas de Autenticación (`/api/v1/auth`)

#### `POST /register`
* **Descripción:** Permite a un nuevo usuario registrarse en la aplicación.
* **Entrada:**
    ```json
    {
      "name": "string",
      "password": "string",
      "email": "string"
    }
    ```
* **Respuesta:** `status 200` (Sin cuerpo de respuesta).

#### `POST /login`
* **Descripción:** Autentica a un usuario y genera un token de sesión.
* **Entrada:**
    ```json
    {
      "password": "string",
      "email": "string"
    }
    ```
* **Respuesta:** `status 200`
    ```json
    {
      "token": "string"
    }
    ```

#### `GET /protected`
* **Descripción:** Ruta de ejemplo protegida. Requiere que el usuario haya iniciado sesión.
* **Entrada:** (Sin datos de entrada).
* **Respuesta:** `status 200`
    ```json
    {
      "id": "string",
      "name": "string",
      "email": "string"
    }
    ```

#### `POST /logout`
* **Descripción:** Cierra la sesión del usuario actual. Requiere que el usuario haya iniciado sesión.
* **Entrada:** (Sin datos de entrada).
* **Respuesta:** `status 200` (Sin cuerpo de respuesta).

---

### Rutas de Plantillas (`/api/v1/templates`)

#### `GET /`

\*Para usar con paginacion, ejemplo:
/api/v1/templates?page=2&limit=10

- **Descripción:** Obtiene la lista de todas las plantillas del usuario. Requiere que el usuario haya iniciado sesión.
- **Entrada:** (Sin datos de entrada).
- **Respuesta:** `status 200`
  ```json
  [
    {
      "id": "string",
      "filename": "string",
      "content": "string"
    }
  ]
  ```

#### `POST /upload`

- **Descripción:** Sube un archivo .docx para crear una nueva plantilla. Requiere que el usuario haya iniciado sesión.
- **Entrada:** `file` (el archivo .docx).
- **Respuesta:** `status 201`
  ```json
  {
    "templateId": "string",
    "filename": "string"
  }
  ```

#### `GET /:templateId/variables`

- **Descripción:** Obtiene todas las variables de una plantilla específica. Requiere que el usuario haya iniciado sesión.
- **Entrada:** `params`: `:templateId` (el ID de la plantilla).
- **Respuesta:** `status 200`
  ```json
  {
    "name": "string",
    "size": "Sizes" // 's', 'm', o 'l'
  }
  ```

#### `DELETE /:templateId`

- **Descripción:** Elimina una plantilla específica. Requiere que el usuario haya iniciado sesión.
- **Entrada:** `params`: `:templateId` (el ID de la plantilla).
- **Respuesta:** `status 204` (Sin cuerpo de respuesta).

#### `POST /generate`

- **Descripción:** Genera un documento .docx a partir de una plantilla y los datos proporcionados. Requiere que el usuario haya iniciado sesión.
- **Entrada:**
  ```json
  {
    "templateId": "string",
    "data": {
      "[key: string]": "string"
    }
  }
  ```
- **Respuesta:** `status 201` (El archivo .docx se descarga directamente en el cuerpo de la respuesta).
