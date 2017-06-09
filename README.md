[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Development Docs

ERD: http://i.imgur.com/iWStkVn.jpg

Wireframe: http://i.imgur.com/QllSFuG.jpg

User Stories:
Complete:
As a developer, I would like to convert my currently working site over to an ember app and retain all of the functionality of my first site.

As a user, I would like to be able to see all recipes from other users.

As a user, I would like to upload photos for my recipe.
---Based on URL input field for now---

To Do:
As a user, I would like to be able to favorite recipes.

As a user, I would like the ability to search recipes by name.



## Development process

Starting with project 2, I decided to try and add some features and rebuild as an ember app.

**Day 1:**
Initially this seemed easier than I ultimately found it. Findig some struggles with getting each of the CRUD features working.
Create, delete, and read were easy. Struggling with update a bit. Stopping for some documentation and will try agian.

Stuck big time on update. Ended up working to convert the UI look and feel over from the original project. I didn't make it exact as I think the original site still needed work. But in its base state, the UI was mostly converted.

**Day 2:**
Struggled most of the first night trying to get update working. Based on feedback from C.Payne I refactored and got as far as the working edit route, but then found myself still not getting the data to bind. Ultimately, I was missing a model being passed
in at the very root of everything. From there it was action UP! and make the api call. This got me to the point of having a working recipe site with all the same features as it's previous iteration. Spent a bit trying to decide which feature to build out. Ultimately going with photo upload. Starting with just providing a url as a value manually. This should populate it's own table.

Setting up a 1:1 to make sure I am heading in the right direction to hopefully not lose too much time.

**Day 3:**
Today was all about the back end - giggity...

I worked for most of the morning finishing the api code. This involved a controller, some routes, some tables and some praying.
Got things working pretty quickly, despite having to take down some table and re-migrate - dirty data did bad deeds. Then got stuck trying to get the front end to make a record to confirm I was pulling things over. I found some things missing in my code - namely I had to fix code issues in my api serializer. Used some help from Toni to figure out how to read what was going on and figured out how to make sure my serializer was pulling the id for each respective record.

I got all serializer working and found out that creating the record from the front end wasn't working. At first it was just missing data altogether, when I finally figured out where to put the model hook at, I was getting the wrong data. Figured out I needed to be on a different route - recipe, and things were finally working.

Now I just need to tie the forms together or give the upload image url its own route, and bug check bug check bug check.

**Day 4:**

Day 4 was a beast. Found so many bugs on night three. Turns out I had some issues with how my relationshiop was working.

Namely I needed to remove the async true from my ember models. Also, I had the serializer set to pull the id of the recipe instead
of the ID of the picture. Fixing this broke other things until I got some help from the entire consultant crew - turns out I needed an if statement to handle records without picture IDs to provide. Once I had this fixed pretty much al other bugs were gone.

I handled an issue with multiple photos being uploaded to a single recipe by hiding the input form once there was one. Overall very very proud of what I accomplished

## Objectives

The goal of this site is to try to rebuild something into a fucntioning ember app. I reused the api from project 2 with the ember-auth exercise as my template.

Aiming to add some features - in particular looking to try and implement AWS upload if time allows.

## Preparation

I had several ideas for capstone before I ultimately decided to re-use this site. I prepared by playing around with this exercise during the weekend before project week, and ultimately found mysel feeling comfortable enough with ember that I wanted to use it. I felt I had a good ground work with what we did in class and wanted to see how far I could take a full on rebuild.

I built out my features based on a few user stories as I knew the bulk of my work would be spent in a feature conversion from the original site into ember reusing a prebuilt api.

As a retrospective:

Ember requires tons and tons of planning to execute smoothly. I really should have focused on the page elements and what components and routes were needed before I ever touched the code. Lesson learned. 

## Specific Hurdles

Adding a feature proved very very difficult. I really should have planned more thoroughly. Ultimately, creating the relationship between the picture and its associate recipe wasn't that hard, just a lot more nuance than I first realized. Once I had it all figured out, it was still doing weird things - this was due to unbeknownst nuance. I feel I have a much much deeper understanding of not just ember but of the relationships needed to do these sorts of actions in the future.

##
Known issues:

Having a user upload more than one picture won't fail but the system only reads the first picture in the db. Need to handle this.
--handled by hiding input form. Will eventually have a feature to either update or remove the picture

Some forms don't clear. Tried everything I could think of in the 11th hour to get this to clear. Seems a refresh is the only way, and may ultimately be a chrome thing and not my code.

Couple typos in my greeting but nothing glaring. Will fix this if time allows.

## [License](LICENSE)

1.  All content is licensed under a CC­BY­NC­SA 4.0 license.
1.  All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
