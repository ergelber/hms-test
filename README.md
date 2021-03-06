# hms-test

To run the code, execute the following commands and go to localhost:3001

```
npm install
npm start
```

### Frontend
 
The code uses react, redux and react-router on the frontend. All frontend javascript code is in the src folder. The entry level component is index.js and defines the two routes. The Main and Admin components provide the top level component for each route, while AdminTable and Form are more generic/reusable. 
 
 ### Backend
 
The backend is a simple express app using Node.js. It contains three endpoints for adding, deleting and updating a participant. Since the data is not stored in a database, the backend contains a hardcoded array of two participants and all endpoints modify this array. 
 
 ### Frontend Improvements
 
 * If this app were to go into production, it would need to be refactored to remove hardcoded values, such as formProps. 
 * The validation and submit functions in Form.jsx should be refactored so that the form can be reused elsewhere in the application. 
 * The convertToJsx function in Admin.jsx could be cleaner but instead focused on removing the specific column implementation of the table to make it more modular.
 
 ### Backend improvements
 
* The server code should never store data. As such it is not a truly RESTful application. It should be hooked up with the database and contain some security layers and permissions. 
* The participant object would need additional properties, such as role, id, etc. 
* The PUT API uses an index to modify the correct participant, it would be better to use a primary key or some other unique value instead. 
* Port should not be hardcoded.
