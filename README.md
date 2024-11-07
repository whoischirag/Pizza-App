# Pizza App 
Welcome to the Pizza App! This is a robust backend service for managing pizza orders, user accounts, and pizza customization. The app allows users to create accounts, place orders, customize pizzas, and more. This guide will walk you through how to get the app up and running on your local machine.

### Steps to Run the App

#### 1. Clone the Repository
Start by cloning the project to your local machine:

`git clone git@github.com:yourusername/Pizza-App.git`

####  2. Install Prerequisites
Make sure you have the following installed on your system:

*Node.js (for the backend API)*  

 *Laravel (for the frontend app, running via  Laravel Mix)*  

You can download Node.js from here, and follow the installation guide for Laravel here.

#### 3. Install Dependencies
*Install Node.js Dependencies*  

Navigate to the root folder of the project and install the necessary npm dependencies:



`cd Pizza-App`  

`npm install`  

`Install Laravel Dependencies`  

#### 4. Start the API Server
Go back to the root project folder and start the Node.js backend server:


`cd ..`  

`npm start`  

You should see a message like:

*Server is up and running on port 3000.*  

#### 5. Run Both Servers

The Laravel server should now be running on a  port (usually 3000).  

The Node.js API server is running on port 3000.  

#### 6. Test the App
You can now test the App  by going to your local broweser and searching  `localhost:3000`




## Key Features

*User Authentication: Users can create accounts, log in securely, and manage their profiles.*  

*Order Management: Users can place orders, track them, and view their order history.*  

*Notifications: Email notifications are sent when orders are placed, updated, or completed.*
