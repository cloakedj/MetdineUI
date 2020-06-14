# MetdineUI
<b>This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.20.</b>

> <b>Note: </b> The current code of the project is within the <b><u>metdinedeployment</u></b> branch of the repository.
> To clone this branch use the following git code : 
> ```git
> git clone --branch --b metdinedeployment <remote_repo>
> ```

## Setting Up Angular

Before doing anything the developer has to download [Nodejs](https://nodejs.org/en/download/).
After node js has been downloaded and installed, the developer needs to follow these steps : 
1. Go to cmd/terminal depending on the os and run : 
**`npm i -g @angular/cli`**. This command will install the angular-cli globally so that it can be accessed from any directory. 
2. Go to project directory or the cloned project, open cmd in current directory and run **`npm i`** to install node modules for the project.

The app is now set up and the development can be started. 

The project can be run locally by navigating to the project directory and running <b>`ng serve`</b>. This will start the development server which can be accessed at <b>`https://localhost:4200`</b>. The app will automatically reload if you change any of the source files.


## Project Breakdown
The Project has been divided into multiple parts as per their respective code that are present inside the <strong>`/src/app`</strong> folder as follows:
- <b>Components</b> - The folder is divided into several sub folders based on the parent it belongs to as: 
	- <b>User Side</b> : The components that belong to the buyer side of the app. 
	- <b>Seller Side</b> : The components that belong to the seller side of the app.
	- <b> Company Data</b> : Contains various components about company information like privacy policy, about us etc.
	- <b> Geolocation</b> : The map component used within the app.  
	- <b>Confirm Email</b> : The template for confirm email component.
- <b>Directives</b> : The directives used within the app.
- <b>Entities</b> : The class structure for various entities used within the app.
- <b>Pipes</b> : The pipes used within the app.
- <b>Services</b> : Contains various services used within the app.

> <b>Note: </b>The file api.service.ts present inside <b>`/src/app/services/api-service`</b> contains the api code that is responsible for communication with the backend server.

# Deployment Details
The project needs to be built for production before development.


## Project build 
Run <b>`ng build`</b> to build the project. The build artifacts will be stored in the <b>`dist/`</b> directory. Use the <b>`--prod`</b> flag for a production build.
On running **`ng build --prod`** angular will generate a compressed and minified version of the code that will be present in the **`dist/`** directory of the app. These components consist of a number of script files that can be then copied and replaced with the script files present in the backend django part.  
Copy the files genrated in dist in folder MetdineUI and paste them in the backend at metdine/static_files/ and contnue with deployment procedure for the backend.

## Tests

### Unit tests
Run **`ng test`** to execute the unit tests via [Karma](https://karma-runner.github.io/).

### e2e testing
Run  **`ng e2e`**  to execute the end-to-end tests via  [Protractor](http://www.protractortest.org/).
