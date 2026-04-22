# Smart Lost & Found Management System

A full-stack web application designed to streamline the process of reporting, searching, and reclaiming lost items within a campus environment. The system ensures structured data management, secure claim verification, and an intuitive user experience.

---

## Problem Statement

Lost and found systems on campuses are often unorganized, making it difficult for users to recover their belongings.

---

## Objective

To build a platform where users can:
- Report lost or found items
- Search and filter items easily
- Claim items securely
- Verify ownership before returning items
- Track the status of items transparently

---

## Features

### Item Management
- Create listings for lost and found items
- Upload images for better identification
- View all items with detailed information
- Individual item detail page with complete metadata

### Search & Filter
- Filter items by type (Lost / Found)
- Search based on title, description, and location

### Claim & Verification System
- Users can claim items
- Claimers answer verification questions
- Owner reviews answers before approval
- Prevents false claims and ensures authenticity

### Status Tracking
Each item has a status:
- `available` - item is open for claims
- `under_verification` - claim is being reviewed
- `returned` - item successfully claimed and returned
- `rejected` - claim denied

### Owner Dashboard
- View all posted items
- See claims on items
- Accept or reject claims based on verification responses

### Authentication and Security
- User authentication using JWT
- Secure login and registration system
- Protected routes for authorized actions

### AI-Based Description (New Feature)
- Automatically generates item descriptions from uploaded images
- Uses AI to improve accuracy and reduce manual effort
- Helps users who may provide incomplete descriptions

### Image Handling
- Image upload handled via Multer
- Efficient storage and retrieval using Cloudinary

### Notification System
- Users get notified when:
  - Their claim is approved 
  - Their claim is rejected 

---

##  Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express.js

### Database
- MongoDB (Mongoose)

### Authentication
- JWT (JSON Web Tokens)

### File Handling and Media
- Multer (file upload middleware)
- Cloudinary (image storage)

### AI Integration
- Google Gemini API for image-based description generation

---

## How It Works

1. A user reports a lost or found item with details and image
2. The system stores item data and generates an optional AI description
3. Other users search or browse items
4. A user submits a claim with verification answers
5. The item owner reviews the claim
6. Owner decision:
     - Approve → item marked as returned
     - Reject → item becomes available again
7. Claimant is notified of the result
---

### Deployment
- Frontend deployed on Vercel
- Backend deployed on Render

Ensure environment variables are properly configured for:

- JWT secret
- Database connection
- Cloudinary credentials
- Gemini API key

## Future Improvements

- Smart matching system using keywords & similarity
- Location-based heatmap for lost items
- Enhanced notification system (real-time updates)
- Improved claim verification mechanism
- Role-based access control

---

### Conclusion

This system provides a structured, scalable, and secure approach to managing lost and found items. By combining modern web technologies with AI-assisted features, it improves efficiency, usability, and trust in the recovery process.
---