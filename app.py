from flask import Flask, render_template, request, redirect, url_for, jsonify
import pandas as pd
from pymongo import MongoClient
import pandas as pd
import requests
import json
import http.client
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


client = MongoClient(
    'mongodb+srv://sarthakgharat:5JVLoXUxTKcwU81o@cluster0.7t9vzps.mongodb.net/?retryWrites=true&w=majority')
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
    # movies = list(movies_collection.find({}))
    # for i in movies:
    #     i['_id'] = str(i['_id'])
    # print(movies)
    conn = http.client.HTTPSConnection("flixster.p.rapidapi.com")

    headers = {
        'X-RapidAPI-Key': "023ef40098msh7e20ffef9e148a6p1f0e47jsn89b0a771d7f7",
        'X-RapidAPI-Host': "flixster.p.rapidapi.com"
    }

    conn.request("GET", "/theaters/list?zipCode=90002&radius=50",
                 headers=headers)

    res = conn.getresponse()
    data = res.read()

    movies_data = data.decode("utf-8")

    # Now you can parse movies_data directly as JSON
    my_data = json.loads(movies_data)

    # Accessing the dictionary elements
    theaters = my_data["data"]["theaters"]

    movies = []

    for theater in theaters:
        id = theater["id"]
        name = theater["name"]
        tid = theater["tid"]
        latitude = theater["latitude"]
        longitude = theater["longitude"]
        lis = {}
        lis["id"] = id
        lis["name"] = name
        lis["tid"] = tid
        lis["latitude"] = latitude
        lis["longitude"] = longitude
        lis["seats"] = 100
        lis["price"] = 15
        movies.append(lis)

        print("Name:", name)
        print("Tid:", tid)
        print("Latitude:", latitude)
        print("Longitude:", longitude)
        print("-------------")

    return jsonify(movies)
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
