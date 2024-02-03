from flask import Flask, g, render_template, request, url_for, redirect

app = Flask(__name__)

@app.route('/')
def main():
    return render_template('main.html')

#def hello_world():  # put application's code here
    #return 'Hello World!'

@app.route('/ask/', methods=['POST', 'GET'])
def ask():
    if request.method == 'GET':
        return render_template('mainListings.html')
    else:
        try:
            return render_template('mainListings.html', name=request.form['name'], request=request.form['request'])
        except:
            return render_template('mainListings.html')

@app.route('/yourlistings/')
def your_listings():
    return render_template('yourListings.html')

@app.route('/myListings/', methods=['POST', 'GET'])
def main():
    if request.method == 'GET':
        return render_template('yourListings.html')
    return render_template('yourListings.html')


if __name__ == '__main__':
    app.run()
