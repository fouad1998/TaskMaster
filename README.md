# Task Master

League task manager, an RPG application helps users to manage their tasks and projects in competitive way.

## Running the application

1. Clone the repository
2. Change directory to the front project `cd front`
3. Run `yarn install` to install the dependencies
4. Run `yarn dev` to start the application
5. Change directory to the back project `cd back`
6. Run `pip install -r requirements.txt` to install the dependencies
7. Run `python manage.py runserver` to start the application
8. Open your browser and navigate to `http://localhost:5173`
9. Enjoy the application

## Run Back in Docker

1. Change directory to the back project `cd back`
2. Run `docker build . --tag tasks_master` to build the image
3. Run `docker run -p 8000:8000 tasks_master` to start the container

## Run Front in chrome extension

1. Change directory to the front project `cd front`
2. Run `yarn build` to build the project
3. Open chrome and navigate to `chrome://extensions/`
4. Enable developer mode
5. Click on `Load unpacked`
6. Select the `build` folder in the front project
7. Enjoy the extension
