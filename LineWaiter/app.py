from flask import Flask, g, render_template, request

app = Flask(__name__)

@app.route('/')
def main():
    return render_template('main.html')

#def hello_world():  # put application's code here
    #return 'Hello World!'

@app.route('/ask/', methods=['POST', 'GET'])
def ask():
    if request.method == 'GET':
        return render_template('userInfo.html')
    else:
        try:
            return render_template('userInfo.html', name=request.form['name'], request=request.form['request'])
        except:
            return render_template('userInfo.html')

if __name__ == '__main__':
    app.run()
