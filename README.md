## Cloning
Just git clone `git clone git@github.com:ITSC4155MDSp24Group10/Fiscalful.git` **IF cloning on windows, instead of a normal git clone using `git clone -c core.symlinks=true git@github.com:ITSC4155MDSp24Group10/Fiscalful.git` and ensure that the terminal/whatever you are using to clone is ran as an admin

## Running instructions
The project can be ran using docker or running the backend and frontend individually. For the sake of grading I recommend running each individually since Docker gave us all a few issues and also requires some tweaking to get working depending on if you are on mac or windows.

to run individualy starting at the root project directory run
`cd/frontend`
`npm i`
`npm start`

for the backend start by going back to the root directory
`cd/python`
`pip install -r requirements.txt`
`flask --app server.py run --port=8000`
