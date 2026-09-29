# ImageSpace

> A simple full-stack image sharing application with captions.

ImageSpace lets users upload an image with an optional caption and view their recent posts in a responsive gallery. Images are stored with ImageKit, post metadata is stored in MongoDB, and the React frontend communicates with the Express API.

## Preview

The application includes:

- A responsive image upload form
- Optional captions for every image
- Upload progress and error states
- An empty state for new collections
- A responsive gallery of recent posts
- A Vite development proxy for seamless frontend-to-backend requests

## Tech stack

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- Multer for multipart image uploads
- ImageKit for image storage

### Frontend

- React
- Vite
- React Router
- CSS with a responsive layout

## Project structure

```text
.
├── Backend/
│   ├── src/
│   │   ├── db/
│   │   ├── models/
│   │   └── services/
│   └── server.js
├── Frontend/
│   └── project1/
│       ├── src/
│       └── vite.config.js
└── .gitignore
```

## Requirements

- Node.js 18 or newer
- A MongoDB connection string
- An ImageKit account and private key

## Getting started

### 1. Clone the repository

```bash
git clone https://github.com/tsanjeev07/first-backend-project.git
cd first-backend-project
```

### 2. Configure the backend

Create `Backend/.env`:

```env
MONGO_DB_URI=your_mongodb_connection_string
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

Install dependencies and start the API:

```bash
cd Backend
npm install
node server.js
```

The backend runs on `http://localhost:3000`.

### 3. Start the frontend

Open a second terminal:

```bash
cd Frontend/project1
npm install
npm run dev
```

Open the Vite URL shown in the terminal, usually `http://localhost:5173`.

The frontend is configured to proxy `/posts` and `/create-post` requests to the backend on port `3000`.

## API endpoints

### `GET /posts`

Returns all uploaded posts.

### `POST /create-post`

Creates a post using multipart form data:

| Field | Type | Required |
| --- | --- | --- |
| `image` | File | Yes |
| `caption` | String | No |

Example response:

```json
{
  "message": "Image Uploaded",
  "post": {
    "image": "https://ik.imagekit.io/...",
    "caption": "A day outside"
  }
}
```

## Available frontend commands

Run these from `Frontend/project1`:

```bash
npm run dev      # Start the development server
npm run build    # Create a production build
npm run lint     # Check the frontend code
npm run preview  # Preview the production build
```

## Authorship

- **Backend:** Created by Sanjeev Tiwari.
- **Frontend:** Designed and implemented by Copilot, based on the backend API created by Sanjeev Tiwari.

## License

This project is currently private and does not include a public license.
