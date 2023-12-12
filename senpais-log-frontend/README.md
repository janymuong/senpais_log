# Senpai's Log: Frontend
> **Note**
> This directory features the frontend` part of the application.
> This is a **fulls-tack** web app frontend. Read through the frontedn documentation to install its dependencies.

## Set-Up

### Install Dependencies
> _Tip_: this frontend is designed to work with [Flask-based Backend](../backend/flaskr/__init__.py) so it does not load successfully if the backend is not working or not connected. You can **stand up the backend first**, and you can test with [```curl```](https://curl.se/) to ascertain the `API` functionality is correctly working.

1. **Installing Node and NPM**
   This project depends on Nodejs and Node Package Manager (NPM). [`https://nodejs.com/en/download`](https://nodejs.org/en/download/).

2. **Installing project dependencies**
   This project uses NPM to manage software dependencies. NPM Relies on the package.json file located in the `frontend` directory of this repository.

```bash
$ npm install
```

### Running Frontend in Dev Mode

The frontend app was built using `create-react-app`. In order to run the app in development mode use `npm start`. You can change the script in the `package.json` file.

```bash
# runs the app in the development mode.  
npm start
```

> Open [http://localhost:3000](http://localhost:3000) to view it in-browser.  
> The page will reload when you make changes. You may also see any lint errors in the console.

<p align="center">
  <img align="center" src="./public/public-facing.png" title="Tiles" height="320" width="640" style="padding-right:100px;" />
</p>
