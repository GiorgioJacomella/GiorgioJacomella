#chat history list
chat_history = []  # list to store chat messages

#function to safe chat in chathystory file
def text_saver(data_list, filename):
    with open(filename, 'w') as f:
        for item in data_list:
            f.write(str(item) + '\n')

#function to read chat history from chathystory file
def text_reader(filename):
    with open(filename, 'r') as f:
        data_list = [line.strip() for line in f]
    return data_list