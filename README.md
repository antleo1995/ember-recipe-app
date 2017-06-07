[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Development Docs

ERD: http://i.imgur.com/iWStkVn.jpg

Wireframe: http://i.imgur.com/QllSFuG.jpg

User Stories:
Complete:
As a developer, I would like to convert my currently working site over to an ember app and retain all of the functionality of my first site.

As a user, I would like to be able to see all recipes from other users.

To Do:
As a user, I would like to be able to favorite recipes.

As a user, I would like the ability to search recipes by name.

As a user, I would like to upload photos for my recipe.

## Development process

Starting with project 2, I decided to try and add some features and rebuild as an ember app.

Day 1:
Initially this seemed easier than I ultimately found it. Findig some struggles with getting each of the CRUD features working.
Create, delete, and read were easy. Struggling with update a bit. Stopping for some documentation and will try agian.

Stuck big time on update. Ended up working to convert the UI look and feel over from the original project. I didn't make it exact as I think the original site still needed work. But in its base state, the UI was mostly converted.

Day 2:
Struggled most of the first night trying to get update working. Based on feedback from C.Payne I refactored and got as far as the working edit route, but then found myself still not getting the data to bind. Ultimately, I was missing a model being passed
in at the very root of everything. From there it was action UP! and make the api call. This got me to the point of having a working recipe site with all the same features as it's previous iteration. Spent a bit trying to decide which feature to build out. Ultimately going with photo upload. Starting with just providing a url as a value manually. This should populate it's own table.

Setting up a 1:1 to make sure I am heading in the right direction to hopefully not lose too much time.
## Objectives

The goal of this site is to try to rebuild something into a fucntioning ember app. I reused the api from project 2 with the ember-auth exercise as my template. 

Aiming to add some features - in particular looking to try and implement AWS upload if time allows.

## Preparation

I had several ideas for capstone before I ultimately decided to re-use this site. I prepared by playing around with this exercise during the weekend before project week, and ultimately found mysel feeling comfortable enough with ember that I wanted to use it. I felt I had a good ground work with what we did in class and wanted to see how far I could take a full on rebuild.

I built out my features based on a few user stories as I knew the bulk of my work would be spent in a feature conversion from the original site into ember reusing a prebuilt api.

## Specific Hurdles


## [License](LICENSE)

1.  All content is licensed under a CC­BY­NC­SA 4.0 license.
1.  All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
