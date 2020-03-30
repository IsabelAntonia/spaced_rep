from flask import Flask
import sqlite3
from flask import request
from flask_restful import Api, Resource


app = Flask(__name__)

api = Api(app)

class testsToday (Resource):
    def get(self):
        connection = sqlite3.connect('quizDB')
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM quizes WHERE dueDate <= CURRENT_DATE AND status != 'inactive' ORDER BY dueDate")
        quizesForToday = cursor.fetchall()
        connection.close()
        return {'tests': quizesForToday}

class tests (Resource):
    def get(self):
        connection = sqlite3.connect('quizDB')
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM quizes WHERE dueDate > CURRENT_DATE OR status = 'inactive' ORDER BY dueDate")
        quizes = cursor.fetchall()
        connection.close()
        return {'tests': quizes}

class sendTest (Resource):
    def post(self):
        data = request.get_json()
        name = data['name']
        dueDate = data['dueDate']
        taggedEvent = data['taggedEvent']
        taggedEventDate = data['taggedEventDate']
        lastTaken = data['lastTaken']
        status = data['status']
        connection = sqlite3.connect('quizDB')
        cursor = connection.cursor()
        cursor.execute("INSERT INTO quizes (name, dueDate, taggedEvent, taggedEventDate, lastTaken, status) VALUES (?, ?, ?, ?, ?, ?)", (name, dueDate, taggedEvent, taggedEventDate, lastTaken, status))
        connection.commit()
        connection.close()

api.add_resource(testsToday, '/testsToday')
api.add_resource(tests, '/tests')
api.add_resource(sendTest, '/sendTest')
