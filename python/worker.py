#!/usr/bin/env python
import sys
import requests
import firebase_admin

from firebase_admin import db
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("./firebase_credentials.json")
firebase_admin.initialize_app(cred)
db = firestore.client()


def fetch_records_for_user(firebase_user_id):
    """
    Worker that saves everything needed for LLM querying
    so far only queries transactions
    """
    try:
        access_tokens_response = requests.get(f"http://localhost:8000/api/get_tokens_for_user?firebase_user_id={firebase_user_id}")
        if access_tokens_response.status_code != 200:
            print(f"Failed to fetch access tokens for user {firebase_user_id}")
            return
        access_tokens = access_tokens_response.json()
        transaction_history = {}
        for token_info in access_tokens:
            access_token = token_info['access_token']
            history_response = requests.get(f"http://localhost:8000/api/item_transactions?current_access_token={access_token}")
            
            if history_response.status_code == 200:
                transaction_history[access_token] = history_response.json()
            else:
                print(f"Failed to fetch transaction history for user {firebase_user_id}, access token {access_token}")

        doc_ref = db.collection('account_reports').document(firebase_user_id)
        doc_ref.set(transaction_history)

    except Exception as e:
        print("An error occurred:", e)

if __name__ == '__main__':
    if len(sys.argv) > 1:
        firebase_user_id = sys.argv[1]
        fetch_records_for_user(firebase_user_id)
    else:
        print("Usage: python worker_script.py <firebase_user_id>")
