import tkinter as tk
import saved_chat

root = tk.Tk()
root.geometry("500x500")

#update chat history
def update_chat_history():
    saved_chat.chat_history = saved_chat.text_reader('chathistory_file.txt') #recover chat history in label
    message = chat_input_box.get() #save input in message variable
    saved_chat.chat_history.append(message)  # add message to chat history
    show_chat_history.config(text="\n".join(saved_chat.chat_history))  # update label with all messages in chat history
    saved_chat.text_saver(saved_chat.chat_history, 'chathistory_file.txt') #safe new chats in chathistory

#textlabel abrufen
show_chat_history = tk.Label(root, text="", font=('Arial', 14), anchor='nw', justify='left')
show_chat_history.pack(side=tk.TOP, fill=tk.BOTH, expand=True)

#input box
chat_input_box = tk.Entry(root, font=('Arial', 14))
chat_input_box.pack(fill=tk.BOTH, side=tk.LEFT, expand=True)

#enter button
enter_button = tk.Button(root, text="Enter", font=('Arial', 14), command=update_chat_history)
enter_button.pack(fill=tk.BOTH, side=tk.RIGHT)

root.mainloop()