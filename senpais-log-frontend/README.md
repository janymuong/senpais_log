# Senpai's Log - Frontend
 
> This directory features the frontend of the Senpai's LOG application - the public facing part of the **full-stack** web app, which is a REACT - **Single Page Application**. Read through its documentation to install dependencies.  


## Set-Up
> [!Tip]  
> The frontend is designed to work with a [Flask-based Backend](../backend/flaskr/__init__.py). It does not load successfully if the backend is not working or not connected. You can **stand up the backend first**, and you can test it with [```curl```](https://curl.se/) to ascertain the `API` is  working correctly.

#### **`Node` and `NPM`**:  
This project depends on **Nodejs** and **Node Package Manager (NPM)** [`https://nodejs.com/en/download`](https://nodejs.org/en/download/) to manage [React](https://react.dev/) and related dependencies.


#### **React-Toastify**
> __LIB INFO__: this is a [library](https://fkhadra.github.io/react-toastify/introduction) for sending interactive notifications for CRUD based functionality e.g. sending a msessage to notify on deletion/update etc. 


### **Installing project dependencies**:  
NPM relies on the `package.json` file located in the senpais-log-frontend directory, which lists out dependencies.

```bash
# DO in a terminal/shell;
$ npm install
```

## Run:
```bash
# terminal/shell; runs server in development mode
$ npm start
```


---
Open [http://localhost:3000](http://localhost:3000) to view the user interface the app in-browser.  
The page will reload when you make changes. You may also see any lint errors in the console.
<p align="center">
  <img align="center" src="./public/public-facing.png" height="320" width="480" style="padding-right:100px;" />
  <img align="center" src="./public/public-facing2.0.png" height="320" width="480" style="padding-right:100px;" />
</p>
