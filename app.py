from flask import Flask, render_template, request, redirect, url_for
import pandas as pd
from pymongo import MongoClient
import pandas as pd


app = Flask(__name__)


client = MongoClient('mongodb+srv://sarthakgharat:5JVLoXUxTKcwU81o@cluster0.7t9vzps.mongodb.net/?retryWrites=true&w=majority')
db = client['movie_booking']  # Change 'movie_booking' to your database name
movies_collection = db['movies']  # Change 'movies' to your collection name

# Function to import data from CSV to MongoDB
def import_data_from_csv(csv_file, collection):
    data = pd.read_csv(csv_file)
    records = data.to_dict(orient='records')
    collection.insert_many(records)

# Import data from CSV to MongoDB (run this once)
import_data_from_csv('movies.csv', movies_collection)

bookings = {}


@app.route('/')
def index():
    movies = list(movies_collection.find({}))
    for i in movies:
        i['_id'] = str(i['_id'])
    print(movies)
    return render_template('index.html', movies=movies)


@app.route('/book/<int:movie_id>', methods=['POST'])
def book(movie_id):
    num_tickets = int(request.form['num_tickets'])
    movie = next((m for m in movies if m['id'] == movie_id), None)
    if movie and movie['seats'] >= num_tickets:
        movie['seats'] -= num_tickets
        if movie_id in bookings:
            bookings[movie_id] += num_tickets
        else:
            bookings[movie_id] = num_tickets
        return redirect(url_for('index'))
    else:
        return "Not enough seats available."


@app.route('/bookings')
def booking_details():
    return render_template('bookings.html', bookings=bookings)


if __name__ == '__main__':
    app.run(debug=True)
