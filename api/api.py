from flask import Flask
import sqlite3
from flask import request
from flask_restful import Api, Resource


app = Flask(__name__)

api = Api(app)

class updateQuiz (Resource):
    def put(self):
        data = request.get_json()
        name = data['name']
        dueDate = data['dueDate']
        lastTaken = data['lastTaken']
        connection = sqlite3.connect('quizDB')
        cursor = connection.cursor()
        cursor.execute("UPDATE quizes SET dueDate = ?, lastTaken = ? WHERE name = ?",(dueDate,lastTaken,name,))
        connection.commit()
        cursor.close()
        connection.close()

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
        cursor.close()
        connection.close()
        return {'tests': quizes}

class postQuiz (Resource):
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
        cursor.close()
        connection.close()

class deleteQuiz (Resource):
    def delete(self,name):
        connection = sqlite3.connect('quizDB')
        cursor = connection.cursor()
        query = "DELETE from quizes WHERE name = ?"
        cursor.execute(query, (name,))
        connection.commit()
        cursor.close()
        connection.close()

api.add_resource(testsToday, '/testsToday')
api.add_resource(tests, '/tests')
api.add_resource(postQuiz, '/postQuiz')
api.add_resource(updateQuiz, '/updateQuiz')
api.add_resource(deleteQuiz, '/deleteQuiz/<string:name>')
