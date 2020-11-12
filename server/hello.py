from flask import Flask
import os
from flask import request
from flask_cors import CORS, cross_origin
import tempfile
from firebase import Firebase
import firebase_admin
from firebase_admin import credentials, initialize_app, storage, firestore

import numpy as np
import os
import time

import PIL.Image as Image
import matplotlib.pylab as plt

# import tensorflow as tf
# from tensorflow.keras import initializers

# Init firebase with your credentials
# cred = credentials.Certificate("fitio.json")
# firebase_admin.initialize_app(cred)

config = {
  "apiKey": "AIzaSyATvOaxPeOZI18PloqsSgo-qZQjF1DSdkI",
  "authDomain": "fitio-76ebe.firebaseapp.com",
  "databaseURL": "https://fitio-76ebe.firebaseio.com",
  "projectId": "fitio-76ebe",
  "storageBucket": "fitio-76ebe.appspot.com",
  "messagingSenderId": "826045204965",
  "appId": "1:826045204965:web:cce9ced275c738c96d470c",
  "measurementId": "G-S0YKTQ0XHW"
}

firebase = Firebase(config)
app = Flask(__name__)
CORS(app, expose_headers='Authorization')

## PRELOAD THE MODEL HERE
# i = tf.keras.layers.Input((224, 224, 3))
# core = tf.keras.applications.ResNet50V2(include_top=False, weights='imagenet')(i)
# flattened = tf.keras.layers.Flatten()(core)
# dense = tf.keras.layers.Dense(1000, activation=tf.nn.relu, kernel_initializer=initializers.RandomNormal(stddev=0.01))(flattened)
# model = tf.keras.Model(inputs=i, outputs=dense)

def calculate_vector(picture):
  img = Image.open(picture)
  img = img.resize((224, 224))
  img = img.convert('RGB')
  
  img =  np.expand_dims(np.array(img)/255.0, axis=0)
  out = model([img])
  out = np.reshape(out, (1000))
  return out

@app.route('/')
def hello_world():
  return 'Hello, World!'

@app.route('/upload', methods=['POST'])
def upload_firebase():
  print('sed')
  picture = request.files['file']
  data = request.form.get('id')
  print(picture)
  print(data)

  #calculate_vector(picture)

  temp = tempfile.NamedTemporaryFile(delete=False)
  picture.save(temp.name)

  db = firestore.client()
  doc_ref = db.collection(u'users')
  images = doc_ref.document(uid)



  # bucket = storage.bucket(BUCKET_NAME)
  # blob = bucket.blob(temp.name)
  # blob.upload_from_filename(temp.name)

  return 200

@app.route('/track')
def track():
  picture = request.files['picture']

  calculate_vector(picture)



