from flask import Flask, request, redirect, url_for, jsonify
import firebase_admin
from firebase_admin import credentials, auth

app = Flask(__name__)

firebase_admin.initialize_app(credentials.Certificate("./firebase_credentials.json"))

@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        email = data.get('email', '')
        password = data.get('password', '')
        try:
            user = auth.get_user_by_email(email)
            user = auth.get_user_by_email_and_password(email, password)
            return redirect(url_for('user_dashboard_page'))
        except auth.AuthError as e:
            error = "Invalid username or password"
            return jsonify({'error': str(e)}), 400
    else:
        error = 'Invalid request method. Route only accepts posts.'
        return jsonify({'error': error}), 405


@app.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        data = request.get_json()
        email = data.get('email', '')
        password = data.get('password', '')
        try:
            user = auth.create_user(email=email, password=password)
            return redirect(url_for('login'))
        except auth.AuthError as e:
            error = "Error creating user: {}".format(str(e))
            return jsonify({'error': error}), 400
    else:
        error = 'Invalid request method. Route only accepts posts.'
        return jsonify({'error': error}), 405


if __name__ == '__main__':
    app.run(debug=True)
