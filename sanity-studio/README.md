# Sanity Studio - Giorgio Jacomella

This is your local Sanity Studio for managing portfolio projects.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Access Studio
Open your browser and go to: **http://localhost:3333/studio**

## What You Can Do

- **Create Projects**: Add new portfolio projects with titles, descriptions, and images
- **Upload Images**: Drag and drop images with automatic optimization
- **Rich Text Editing**: Write detailed project descriptions
- **Publish Content**: Set publication dates and publish projects
- **Organize**: Use the built-in content management tools

## Project Schema

Each project includes:
- **Title**: Both English and German versions
- **Description**: Both English and German versions
- **Image**: High-quality image with hotspot support
- **Published At**: Publication date
- **Slug**: Auto-generated URL-friendly identifier
- **Order**: Custom ordering (optional)

## Connected to Your Portfolio

This studio is connected to your existing Sanity project:
- **Project ID**: `5uxgduir`
- **Dataset**: `production`
- **Portfolio**: Your React app at `client/` folder

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run deploy` - Deploy to Sanity hosting

## Troubleshooting

- **Port conflicts**: Sanity will automatically use the next available port
- **Not loading**: Make sure you're in the `sanity-studio/` folder
- **Connection issues**: Check your internet connection for Sanity API access

## Next Steps

1. Start the studio: `npm run dev`
2. Create your first project
3. Upload an image
4. Publish the project
5. Check your portfolio at `/projects` to see it displayed
