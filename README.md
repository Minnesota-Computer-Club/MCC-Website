# Minnesota Computer Club Website
The Minnesota Computer Club (MCC) is a Discord-based community of students and teachers from all across Minnesota. This repository houses all of the code used to create and maintain the club's website: [https://mncomputerclub.com](https://mncomputerclub.com).

## Table of Contents
- [Built Using](#built-using)
- [Running Locally](#running-locally)
  - [Install Dependencies](#install-dependencies)
  - [Clone Repo](#clone-repo)
  - [Install npm Packages](#install-npm-packages)
  - [Run Project](#run-project)
  - [Other Commands to Know](#other-commands-to-know)
- [Contributing](#contributing)
- [References and Acknowledgements](#references-and-acknowledgements)

## Built Using
The Minnesota Computer Club website was built using:
- [Next.js](https://nextjs.org) (v13.0.0+)

## Running Locally
It is easy to get a copy of of MCC website running locally.

### Install Dependencies
In order to run the website locally, the following will need to be installed on your development environment:
- [npm](https://www.npmjs.com) (required)
  - npm is used to manage the packages needed by the MCC Website to run on top of Node.js
  - **Installation Instructions:** [https://docs.npmjs.com/downloading-and-installing-node-js-and-npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### Clone Repo
Navigate to the location on your development machine where you want to place this project's directory and clone the repository by running the following command:

    git clone https://github.com/Minnesota-Computer-Club/MCC-Website.git

### Install npm Packages
The MCC website requires several npm packages to be installed. Those packages can be installed by running:

    npm install

### Run Project
When you are ready to run the project locally, navigate to the directory with this repository's code on your local machine. 

Start the MCC website by running:

    npm run dev

This command is going to start a local development server for you to make changes locally.

### Other Commands to Know
There are several other commands defined in `package.json` that you should be familiar with:
- `npm run build`: This command can be run if you want to generate an optimized version of your application for production. Read more at [https://nextjs.org/docs/deployment](https://nextjs.org/docs/deployment).
- `npm run lint -- --fix`: This magically fixes all the problems you have with bad coding. Uses the [google style guide](https://google.github.io/styleguide/jsguide.html).

## Contributing
All contributions are welcome! 

First, open an issue to discuss what contributions you would like to make. 

Start by forking this repository and make all contributions in a `feature/` branch as a PR will be required before any changes are merged into the `main` branch.

## References and Acknowledgements
This project does use several SVGs from [https://heroicons.com/](https://heroicons.com/).