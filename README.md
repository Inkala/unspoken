# Unspoken

## Description

An app to share thoughts and feelings and support others. People can create their profile, post their messages, react to other people's posts and leave comments on them.

## User Stories

-  **Signup:** As a user I want to sign up in the platform so that I can start posting and reacting to messages
-  **Login:** As a user I want to login to the platform so that I can access my profile and use the app
-  **Logout:** As a user I want to logout from the platform so no one else can use it as me
-  **See messages** As a user I want to see user's messages when I enter the app so I can see what other people are sharing
-  **Post a message** As a user I want to post messages so I can share my thoughts on the platform
-  **Receive message suggestion** As a user I want to see a text explaining what kind of content to share so I have an idea on how to start expressing my thoughts
-  **Add category to messages** As a user I want to add a category to my message so people can better understand my feelings
-  **I understand button** As a user I want to see an "I understand" button so I can show my empathy and understanding to other users
-  **Like button** As a user I want to see a "Like" button so I can show my appreciation to other users
-  **Comment on messages** As a user I want to leave comments on messages so I can give and receive support and advice to/from other people
-  **Notifications** As a user I want to see notifications so I know when someone reacted to something I shared
-  **Edit my messages** As a user I want to edit my messages so I can correct any typos or improve my writing
-  **Delete my messages** As a user I want to delete my messages so they are no longer visible
-  **404 page:** As a user I want to see a 404 page so I know I'm trying to reach a page that does not exist

## Backlog

-  **Publish message as anonymous** As a user I want to post my messages as anonymous so I can avoid being related to something I said
-  **See character count** As a user I want to see how many characters I have used and what is the maximum so I can better create my message
-  **Save messages** As a user I want to save my messages so I can come back and finish them later
-  **Share messages** As a user I want to be able to share existing messages so I can show I think the same but someone else wrote it.
-  **Report messages** As a user I want to be able to report messages so admins are aware of inappropriate or discriminatory content.
-  **Download messages** As a user I want to download messages so I have them saved in my device
-  **Create collections** As a user I want to create collections so I can organize my messages
-  **Activate/deactivate notifications** As a user I want to activate and deactivate notifications for a specific message

## Routes

- / - Homepage
- /signup - Signup form
- /login - Login form
- /messages/new - Create new message
- /messages/:id/edit - Edit message
- /messages/:id/delete - Delete message
- /profile - My profile
- 404 / Not Found

## Pages

- Home Page / Messages (public)
- Sign in Page (not logged in)
- Login Page (not logged in)
- My profile / my messages (private)
- New Message (private)
- Edit Message (private)
- 404 Page (public)

## Containers

**App:**
- Contains the router, the nav and the main body

**Body:**
- Placeholder to load all other pages

## Components

**Message Card**
- Input: Message, user owner
  - Output: Markup for message. Action buttons
**New message**
- Output: Text area. Action buttons
**Header**
- Input: Authenticated user
- Output: Home. Profile and notification buttons || Login, Signup
**Nav**
- Input: Authenticated user
- Output: Nav Content
**Button**
- Input: Text, action
- Output: Sends to route
**Loading**

## Services

**Auth Service**
- auth.login(user)
- auth.signup(user)
- auth.logout()
- auth.me()
- auth.getUser()

**Message Service**
- getAllMessages()
- createMessage(data)
- getOneMessage(id)
- editMessage(id, data)   
- deleteMessage(id)

**Like Service**
- getMyLikes()
- likeMessage(messageId)
- unlikeMessage(messageId)

**Reaction Service** (I understand)
- getMyReactions()
- addReaction(reactionId)
- removeReaction(reactionId)

**Comments Service**
- getAllComments()
- addNewComment(messageId, data)
- removeComment(messageId)

## Links

### Trello/Kanban

[Board](https://trello.com/b/FhxamE2J/unspoken)

### Git

[Backend repository](https://github.com/Inkala/unspoken-backend)

### Slides

[Presentation Link](https://docs.google.com/presentation/d/1ci1hBlUSyiAYseFC8s4EmhNqdYIiw-JOhGZgslgccU0/)
