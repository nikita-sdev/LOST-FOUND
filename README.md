# Smart Lost & Found Management System

A web-based platform to efficiently manage lost and found items on campus.  
This system helps users report items, search listings, and securely claim items through a verification process.

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

---

## Features

### Item Management
- Add lost or found items
- View all posted items
- Detailed item view page

### Search & Filter
- Filter items by type (Lost / Found)
- Search based on title, description, and location

### Claim & Verification System
- Users can claim items
- Claimers answer verification questions
- Owner reviews answers before approval

### Status Tracking
Each item has a status:
- `available`
- `under_verification`
- `returned`
- `rejected`

### Owner Dashboard
- View all posted items
- See claims on items
- Approve or reject claims

### Notification System
- Users get notified when:
  - Their claim is approved 
  - Their claim is rejected 

---

##  Tech Stack

### Frontend
- React.js
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB (Mongoose)

### Authentication
- JWT (JSON Web Tokens)

---

## How It Works

1. User posts a lost/found item  
2. Another user searches and finds a match  
3. User submits a claim with answers  
4. Owner verifies answers  
5. Owner:
   - Approves → item marked as returned  
   - Rejects → item becomes available again  
6. User gets notified of the decision  

---

## Future Improvements

- Smart matching system using keywords & similarity
- Add notification when claims on the owner 
  dashboard
- Improve verification
- Improved UI/UX

---

---

##  Team

- Nikita Sharma
- Arunangshu Raj Dey

---

