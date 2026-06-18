                          ##  Architecture-ns.md  ##

                        Service: movieService

What does this service do?
**The movie service contains the business logic used by the movie application. It is responsible for creating 
new movie objects and removing movies from the movie list. By keeping this logic in a service, the application can 
reuse the same functions whenever movie-related actions are needed.**

How did you decide what logic to include in this service?
**I placed movie creation and movie removal logic in the service because these actions are business operations. 
The component should only display information and respond to user actions. Separating business logic from presentation logic makes the code easier to maintain and follow.**

Where is this service used in the project and how?
**The service is used in the MyMovies component. When a user adds a movie, the component calls the createMovie() function. When a user clicks the Remove button, 
the component calls removeMovieById() to update the movie list.**

                        Repository: movieRepository

What does this repository do?
**The repository provides access to movie data through the getAllMovies() method. It acts as a layer between the application's data 
source and the components that use the data.**

How did you decide what logic to include in this repository
**Data access responsibilities belong in the repository layer. Instead of having components directly read data files, the repository 
handles retrieving movie information. This keeps data access separate from business and presentation logic.**

Where is this repository used in the project and how?
**The repository is used in MyMovies.tsx. The component calls getAllMovies() to retrieve movie information. If the data source changes
 in the future, only the repository will need to be updated.**

                          Test Data: movieData

What does this data file do?
**The movieData file contains test movie records used by the application. It stores movie information such as title, genre, status, and image URL
 The file currently contains multiple movie objects used for testing and development.**

How did you decide what logic to include in this file?
**Test data was placed in a separate file to keep sample data organized and easy to manage. This approach also prepares the project for future
 database integration because the data can later be replaced without changing the component structure.**

Where is this data used in the project and how?
**The movieRepository imports movieData and returns it through the getAllMovies() method. The MyMovies component accesses the movie information through
 the repository, which helps maintain a clean architecture and proper separation of concerns.**