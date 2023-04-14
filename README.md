This application is analog of the Trello task scheduler.

![Image alt](https://github.com/MisterDROG/todollo/tree/master/src/images/DemonstrationGif.gif)

The main goal when writing was to make an application that supports the basic functions of the prototype and copying the style for an easy transition from Trello. From a code point of view, the goal was for the code to be up-to-date with modern front-end development techniques. At the moment, I myself use this application for compiling my to-do list board.

The operation of the application is based on the following system:
- Two databases are stored on the server: with all tasks and with all branches.
- Each task is assigned a branch value and the order in which it is located in a particular branch. This is duplicated through Redux into the application state.
- Also, the third unsynced state of the application describes the current status of the main application settings, it is stored locally.

Main features supported:
- Adding task branches
- Deleting task branches
- Adding tasks
- Deleting tasks
- Marking the completion of a task
- Drag and drop tasks
- Preloaders for loading the application, adding elements, deleting elements
- Show runtime errors
- Adaptability for vertical screens

Technologies used in writing:
- HTML5
- SCSS
- Typescript
- React (Hooks)
- React-Redux
- Thunks
- Redux Toolkit
- Redux Query
- Firebase database

Additionally written:
- Middleware for logging the store (similar to Redux DevTools)
- Custom Hook for managing the form input field
- API is written separately according to the SOLID principle
- Organized the structure of folders and elements (the main ideas are taken from the BEM methodology) for the convenience of further development of the application

What is planned to improve the application:
- Add drag and drop feature for branches
- Creation of authorization so that other people can use the application
- Refactoring the logic of rearranging cards to a simpler version and encapsulation of logic parts into separate modules according to SOLID principles.

Created by Igor Drogaisev.