from flask import Flask

app = Flask(__name__)

@app.route('/')
def main():
    return render_template('main.html')

#def hello_world():  # put application's code here
    #return 'Hello World!'


if __name__ == '__main__':
    app.run()
