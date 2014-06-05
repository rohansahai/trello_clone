# Trellino!

This is a clone of www.trello.com. A project management site in which one can create boards, lists, and cards to organize they're projects/todos/activities. The ultimate goal of this app was to build out a fully functioning application that utilizes backbone.js to the fullest degree! This is a single page application... everytime you drag and drop a card or list around the changes are saved to the database via backbone ajax requests ;)

### A bit more description

The back end of this application is a simple rails API, and the front end MVC is all in backbone. There are essentially 3 main layers: Boards, Lists, and Cards. Each board has many lists which has many cards. The API is set up so that when fetching a board collection via backbone we also get back (via nested JSON hashes) the associated lists and associated cards. 

The front end is backbone so boards, lists, and cards are each models with respective views. There are also board collections, list collections (within each board), and card collections (within each list). Each board view has many list subviews within it which has many card subviews within that! wooof!

To run this clone the project and run
    
    rails s
    
from you're terminal. 

Todo 
- Push this to heroku
- Take away users so people don't have to sign up to see functionality
    
