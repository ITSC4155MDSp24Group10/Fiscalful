from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import firestore, credentials

app = Flask(__name__)

cred = credentials.Certificate("./firebase_credentials.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

@app.route('/api/financial-advice', methods=['POST'])
def get_financial_advice():
    try:
        # Get firebase_user_id from the request headers
        firebase_user_id = request.headers.get('X-Firebase-User-Id')
        if not firebase_user_id:
            return jsonify({'error': 'Firebase user ID not provided'}), 400
        
        # Fetch transaction history from Firestore
        doc_ref = db.collection('account_reports').document(firebase_user_id)
        doc = doc_ref.get()
        if not doc.exists:
            return jsonify({'error': f'Transaction history not found for user {firebase_user_id}'}), 404
        
        transaction_history = doc.to_dict().get('transaction_history', {})
        return jsonify({'transaction_history': transaction_history}), 200

    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)

    