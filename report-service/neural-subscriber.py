import sqlite3

class NeuralSubscriber:
    def __init__(self):
        self.conn = sqlite3.connect('reports.db', check_same_thread=False)

