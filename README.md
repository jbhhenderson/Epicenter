# Epicenter
An application for creating a collection of all your video games in one location, regardless of what platform they are available on.

## Description
Provides a one stop shop for your game library, tech and gaming related news, and a way to see what others think about any particular game.

### Game Library
Your landing page and collection of any games you have added to your collection
![Homepage](https://user-images.githubusercontent.com/63122460/229601244-e1f9ae59-2f13-4153-b90e-954a3956ebb9.png)

### Favorites
Shows only the games you have added as a favorite
![Favorites](https://user-images.githubusercontent.com/63122460/229601323-e30ac3fd-e066-4dfb-9bb9-7caa3c154a54.png)

### News
A live updating collection of articles relating to tech and gaming
![News](https://user-images.githubusercontent.com/63122460/229601445-851be105-51de-4063-8938-6a18173cb81e.png)

### Top Games
A list of up to 10 games with the most favorites on the platform organized from most favorited to least favorited
![Top Games](https://user-images.githubusercontent.com/63122460/229601576-8bfabe09-d228-4b12-beed-ad13dc18b79f.png)

### Game Info
A summary of the game's description and information along with a review and messaging system for users
![Game Info](https://user-images.githubusercontent.com/63122460/229601801-ddf937bf-9fa5-46b9-bf35-3e342ef06076.png)

### Add Game
A place for users to be recommended new games, or search for a specific game they want to add
![Add Game](https://user-images.githubusercontent.com/63122460/229601982-b6c7091e-c592-4e03-af88-8533bc56b2af.png)

## Installation
Necessary for running the application with styling and hosting a proxy for API access
* https://tailwindcss.com/docs/guides/create-react-app
* Link for CORS Anywhere

## Useful Links
* https://www.igdb.com/api
* https://heroicons.com
* https://dbdiagram.io/d/640756a0296d97641d861e8a
* https://www.figma.com/file/qai5fI1p0DAr1P5BBpjwhV/Epicenter?node-id=0%3A1&t=XGhJPltBZM4lJHHM-1

## Challenges
* Getting the proxy to allow access to the API provided
* Having the various buttons, reviews, messages, and review bars update as soon as changes were made without the need to refresh the page
* The page loading in all at once instead of bit by bit as calls to the foriegn API were made, thus causing some information to not be accessible if interacted with before it was ready
