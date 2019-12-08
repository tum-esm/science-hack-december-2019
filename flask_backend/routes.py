from flask_backend import app

@app.route("/status", methods=["GET"])
def index():
    return {"Status": "Ok"}, 200

