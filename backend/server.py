from flask import Flask, request, redirect, url_for, jsonify
from utils.login_utils import * 

app = Flask(__name__)


@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        username = data.get('username', '')
        password = data.get('password', '')
        if validate_credentials(username, password):
            return redirect(url_for('user_dashboard_page'))
        else:
            error = "Invalid username or password"
            return jsonify({'error': error}), 400
    else:
        error = 'Invalid request method. Route only accepts posts.'
        return jsonify({'error': error}), 405


@app.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        data = request.get_json()
        username = data.get('username', '')
        password = data.get('password', '')
        if validate_credentials(username, password):
            return redirect(url_for('login'))
        else:
            error = "Invalid username or password"
            return jsonify({'error': error}), 400
    else: 
        error = 'Invalid request method. Route only accepts posts.'
        return jsonify({'error': error}), 405