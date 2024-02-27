
def validate_credentials(username, password):
    """ Could add more cases here for invalid username or password """
    if username and password and len(password) > 6:
        return True 
    return False