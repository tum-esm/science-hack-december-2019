from flask_backend import app
from flask import render_template

@app.route("/status", methods=["GET"])
def status():
    return {"Status": "Ok"}, 200

@app.route("/", methods=["GET"])
def frontend():
    return render_template("index.html")
