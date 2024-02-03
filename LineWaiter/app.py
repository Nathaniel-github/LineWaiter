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
def my_listings():
    if request.method == 'GET':
        return render_template('yourListings.html')
    else:
        try: 
            return render_template('yourListings.html', where=request.form['where'], when=request.form['when'], 
                                  length=request.form['length'], price=request.form['price'])
        except:
            return render_template('yourListings.html')
    return render_template('yourListings.html')

class Listing:
    def __init__(self, title, additional_info):
        self.title = title
        self.additional_info = additional_info

@app.route('/')
def listings():
    # Create a list of Listing instances
    listings = [
        Listing("Listing Title 1", "Additional information about Listing 1."),
        Listing("Listing Title 2", "Additional information about Listing 2."),
        Listing("List 3", "Additional information about List 3.")
    ]

    return render_template('mainListings.html', listings=listings)

if __name__ == '__main__':
    app.run()
