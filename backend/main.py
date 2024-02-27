from flask import Flask, request
from utils.login_utils import * 

app = Flask(__name__)

@app.route("/")
def home_page():
    return "<p>Hello, World!</p>"

@app.route("/chatbot")
def chat_bot_page():
    pass 

@app.route("/dashboard")
def user_dashboard_page():
    pass 

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.args.get('username', '')
        password = request.args.get('password', '')
        if validate_credentials(username, password):
            # login
            pass
    else:
        error = "invalid username or password"
    # render react pass in error

@app.route('/login', methods=['GET', 'POST'])
def register():
    pass
