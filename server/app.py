from flask import Flask, request, jsonify, session, Blueprint

app = Flask(__name__)


@app.route('/hello/<string:name>')
def hello(name):
    return 'Hello, ' + name + '!'


@app.route('/page')
def page():
    return 'Page'


@app.route('/api/', methods=['POST'])
def api():
    content = request.get_json()
    print(content)
    return jsonify(content)
