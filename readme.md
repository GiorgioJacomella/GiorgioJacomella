# Chat-Interface
## Basic Info
I used the Programming languege python with the tkinter library to build an interface for a chat,
also all the entered information will be saved in chathistory_file.txt.
this is just a begginner project so it doesnt work on servers with multiple users yet, it works more like a notebook than a chat at this moment.

## Chat ui
in the chat ui file i importet tkinter and defined all the tkinter objects, 
i imported the saved_chat.py to make it possible to recover and save entered information,
and i made the update function to make it possible to update the chathistory.

## Saved chats
With the functions writen in saved_chat.py wich are called in chatui.py its possible to read the chat history data from chathystory_file.txt and also to write new information into the file.

## Plans for optimisation
On my journey of learning programming i will try to optimize this small project by integrating the possibility of multiple users or also a real database instead of a txt file, but lets see where this will bring us.