from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS

# configure app 
app = Flask(__name__)
CORS(app)

# configure mongo
app.config['MONGO_DBNAME'] = 'series'
app.config['MONGO_URI'] = 'mongodb://db:27017/series'

mongo = PyMongo(app)

@app.route('/series', methods=['GET'])
def get_all():    
    output = []
    series = mongo.db.series.find()

    for q in series:
        output.append({'name' : q['name'], 'coverImage': q['coverImage'], 'genre': q['genre'], 'numberOfSeasons': q['numberOfSeasons']})

    return jsonify({'result' : output})

@app.route('/series/<name>', methods=['GET']) 
def get_one(name):
    serie = mongo.db.series.find_one({'name': name})    
    return jsonify({'serie': {'name': serie['name'], 'lastSeason': serie['lastSeason']}})

@app.route('/series', methods=['POST'])
def insert():
    name = request.json['name']
    last_season = request.json['lastSeason']

    mongo.db.series.insert({'name': name, 'lastSeason': last_season})

    return jsonify({'result': 'serie inserted with success'})

@app.route('/series', methods=['PUT'])
def update():
    
    name = request.json['name']
    new_name = request.json['newName']
    mongo.db.series.update_one({'name': name},  
                               {'$set':{'name': new_name}})

    return jsonify({'result': 'updated with success'})

@app.route('/series', methods=['DELETE'])
def delete():    
    name = request.json['name']
    mongo.db.series.delete_one({'name': name})
    return jsonify({'result': 'deleted with success'})

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')