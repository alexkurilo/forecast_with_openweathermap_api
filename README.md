React.js application allows users to view a five-day forecast in the selected location.
Users can view weather details for specific days within forecast like maximum expected temperatures,
humidity levels, etc.

The application architecture is designed around stateful container components with various degrees of nesting. 
Stateless functional components are placed within these container components.
React Router handles routing within the application. JSON data are received from the OpenWeather API.

This project is a one-page application and created with npm create-react-app.

The project uses the following libraries:
 - react-redux;
 - firebase - to store and use the data required for the Weather API (file size ~29Mbyte);
 - react-router-dom - for routing and creating links;
 - redux-thunk;
 - redux-devtools-extension - is required in development as a state verification tool;
 - react-chartjs-2 - to create a graph of the temperature dependence;
 - animate.css - to create animated transitions;
 - Weather API (https://openweathermap.org/api);

How to run:
  Clone the repository
  Run npm install from inside the repository
  Run npm start. Your default browser will automatically opens with the app. You can also access it from http://localhost:3000/