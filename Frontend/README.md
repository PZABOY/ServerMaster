# Server Master

A full-stack project for managing servers: **Backend** with Node.js + Express + MongoDB (Mongoose) and **Frontend** with React + Vite + TypeScript + Redux Toolkit.

Clean, Apple-style UI (white, minimal, elegant, iOS-like toggles).

---

## Contents

* [Architecture](#architecture)
* [Prerequisites](#prerequisites)
* [Setup & Run](#setup--run)

  * [Backend](#backend)
  * [Frontend](#frontend)
* [Configuration](#configuration)
* [Data Model](#data-model)
* [API](#api)
* [Frontend Behavior](#frontend-behavior)
* [Seeding / Importing Data](#seeding--importing-data)
* [Project Structure](#project-structure)
* [Troubleshooting](#troubleshooting)
* [License / Author](#license--author)

---

## Architecture

**Backend**

* Node.js, Express
* MongoDB with Mongoose
* Endpoints:

  * `GET /servers/Api` — returns all servers with the company name (via `populate`)
  * `POST /status/server/api` — updates a server status (`active` | `inactive`)

**Frontend**

* React (Vite + TypeScript)
* Redux Toolkit + `react-redux`
* Axios
* Apple-style CSS (light, crisp, iOS switch)

---

## Prerequisites

* Node.js 18+ (LTS recommended)
* npm 9+ (or pnpm / yarn)
* MongoDB 5/6 (local or Atlas)

---

## Setup & Run

### Backend

```bash
cd Backend
npm install
```

Create a `.env` (see **Configuration**) and run:

```bash
npm run dev   # with nodemon
# or
npm start
```

Default: [http://localhost:4000](http://localhost:4000)

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

Default (Vite): [http://localhost:5173](http://localhost:5173)

> Make sure frontend URLs point to the backend (see **Configuration**).

---

## Configuration

### Backend (`Backend/.env`)

```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/server-master
```

### Frontend (`Frontend/src/Utils/AppConfig.ts`)

```ts
class AppConfig {
  public readonly serversUrl = "http://localhost:4000/servers/Api";       // GET
  public readonly serverStatusUrl = "http://localhost:4000/status/server/api"; // POST
}
export const appConfig = new AppConfig();
```

---

## Data Model

### Mongo (Mongoose)

**Company**

* `_id: ObjectId`
* `name: string`

**Server**

* `_id: ObjectId`
* `name: string`
* `ip: string`
* `companyHostingId: ObjectId` (`ref: "CompanyModel"`)
* `status: "active" | "inactive"`
* `createdAt: Date` (timestamps)

### Frontend (TypeScript)

```ts
// src/Models/CompanyModel.ts
export class CompanyModel {
  public _id?: string;
  public name?: string;
}

// src/Models/ServerModel.ts
export class ServerModel {
  public _id?: string;
  public name?: string;
  public ip?: string;
  public companyHostingId?: string | { _id: string; name: string }; // supports populated object
  public status?: "active" | "inactive";
  public createdAt?: Date | string;
}
```

---

## API

### `GET /servers/Api`

Returns an array of servers. Each item includes:

* `name`, `ip`, `status`, `createdAt`
* `companyHostingId` populated (object with `_id`, `name`) or plain string id

**200 OK Example**

```json
[
  {
    "_id": "66e0...",
    "name": "server-1",
    "ip": "10.0.0.1",
    "companyHostingId": { "_id": "66e0...", "name": "Amazon Web Services" },
    "status": "active",
    "createdAt": "2025-01-01T08:00:00.000Z"
  }
]
```

### `POST /status/server/api`

Updates the server status.

**Request Body**

```json
{ "_id": "66e0...", "status": "active" }
```

**Response**

* `200 OK` with the updated server document (preferably populated)
* On error: appropriate status with message

---

## Frontend Behavior

* **SPA**: main page shows all servers on load.
* **ServerList**:

  * Loads servers from backend (`serverService.getAllServers`).
  * Filters: “Active only”.
  * Sorting: “Newest first” (by `createdAt`).
* **ServerCard**:

  * Displays: name, IP, company (name or id), created time.
  * **iOS toggle** to change status:

    * Sends `POST /status/server/api` with the *new* status.
    * **UI updates only after** a successful `200 OK`.
    * On error, the visual state remains unchanged (stays in current status).
* **State**: Redux store holds the servers list; updates are dispatched after successful POST.

---

## Seeding / Importing Data

If you have seed files:

* `companies.mongoimport.json`
* `servers.mongoimport.json`

Import with:

```bash
mongoimport --db server-master --collection companies --file companies.mongoimport.json --jsonArray
mongoimport --db server-master --collection servers   --file servers.mongoimport.json   --jsonArray
```

> Use **Extended JSON** (`$oid`, `$date`) for `mongoimport`.
> If seeding via Node/Mongoose script, use **string** ids (e.g., `"66e0..."`) instead of `$oid`.

---

## Project Structure

```
Backend/
  src/
    3-models/
      company-model.ts
      server-model.ts
      client-errors.ts
    4-services/
      server-service.ts
    5-controllers/
      server-controller.ts
    app.ts
  .env
  package.json

Frontend/
  src/
    Components/
      LayoutArea/
        Header/
          Header.tsx
          Header.css
        Footer/
          Footer.tsx
          Footer.css
        Layout/
          Layout.tsx
          Layout.css
        Routing/
          Routing.tsx
          Routing.css
      ServerArea/
        ServerList/
          ServerList.tsx
          ServerList.css
        ServerCard/
          ServerCard.tsx
          ServerCard.css
    Models/
      CompanyModel.ts
      ServerModel.ts
    Redux/
      ServerSlice.ts
      Store.ts
    Services/
      ServerService.ts
    Utils/
      AppConfig.ts
      Notify.ts
      UseTitle.ts
  index.html
  package.json
  vite.config.ts
```

---

## Troubleshooting

* **`Schema hasn't been registered for model "CompanyModel"`**

  * Ensure the company model is imported before using populate:

    ```ts
    // server-model.ts
    import "./company-model";
    ```
  * `ref` must match the model name: `ref: "CompanyModel"`.

* **`BSONError: input must be a 24 character hex string...`**

  * For `mongoimport`, use Extended JSON (`"$oid"`, `"$date"`).
  * For Node/Mongoose scripts, use string ids (`"66e0..."`).

* **`Objects are not valid as a React child`**

  * Don’t render a populated object directly. Extract fields:

    ```ts
    const ch: any = server.companyHostingId;
    const companyName = ch && typeof ch === "object" ? ch.name : undefined;
    ```

* **`react-redux` not found**

  * Install: `npm i @reduxjs/toolkit react-redux`
  * Wrap app with `<Provider store={store}>` in `main.tsx`.

* **Icons not visible**

  * Use `react-icons`:

    ```bash
    npm i react-icons
    ```

    ```ts
    import { FaGithub } from "react-icons/fa";
    ```

* **CORS**

  * Enable `cors()` in the backend or set a Vite proxy.

---

## License / Author

Educational/demo use. All rights reserved.

**Author**: *Eliav Mendelsohn*
**Contact**: *[Eliavman@gmail.ocm](mailto:Eliavman@gmail.ocm)*
