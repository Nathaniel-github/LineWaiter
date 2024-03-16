<h1 align="center">Line Waiter</h1>

  <p align="center">
    The Flask server and REACT frontend code for the LineWaiter app
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#welcome">Welcome</a></li>
    <li><a href="#setup">Setup</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#how-to-run">How To Run</a></li>
    <li><a href="#contributors">Contributors</a></li>
    <li><a href="#sources-and-citations">Sources and Citations</a></li>
  </ol>
</details>


<!-- WELCOME -->
## Welcome

Welcome to Line Waiter! With this web app, you can post a listing if you would like to pay someone to come wait in line for you (think those long food truck lines)! On the flip side, if you want to make some extra cash, come here for an easy, low-effort way to do so.

<!-- SETUP -->
## Setup

* First clone and unzip the repository
* Next open in your preferred IDE (we used Pycharm)
* Add the .env file with the database and email server passwords to LineWaiter (next to app.py)
* Open the terminal and run the following command
```sh
cd LineWaiter
```
* Install the necessary packages for Flask
```sh
pip install -r requirements.txt
```
* Go to the REACT directory
```sh
cd line-waiter
```
* Install the necessary packages for REACT
```sh
npm install
```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- FEATURES -->
## Features

* Email notifications of accepted listings/bids/service/ready
* Create/delete listings
* Bidding on listings
* Changing status (borders)
* Login/signup/logout
* Accept listings

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- HOW TO RUN -->
## How To Run

* Open another terminal or use another method to run app.py in the background
```sh
python3 app.py
```
* In the original terminal which is inside of LineWaiter/line-waiter run the REACT frontend
```sh
npm start
```
* If everything was ran correctly a browser page should automatically open

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTORS -->
## Contributors

* Selena : worked on fullstack; features: create listing, displaying listings, delete listing, accept/unaccept listing, logout, login/signup
* Brandon: worked on frontend; mostly on .css files and styling/scaling website, aligning search bar. creating backgrounds for web pages
* Pranav: worked on frontend, mostly on building functionality in webpages, built home page and listings class to display to users, also created login and signup page
* Nathaniel: worked on: sending emails, setting up google app integration for email sending, backend for everything to do with bidding, backend for readying a listing, all of db.py, setting up MongoDB and pymongo, and .env file loading
* Athena: worked on backend, mostly on Flask and MongoDB; features: create listing, unaccept listing, send email 

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- SOURCES AND CITATIONS -->
## Sources and Citations

* [Best README](https://github.com/othneildrew/Best-README-Template)
* [Page Template](https://www.youtube.com/watch?v=kghwFYOJiNg)
* [Initial Structure For Listing Class But Significantly Modified After](https://www.youtube.com/watch?v=lfm_Hu0hEms&t=197s)

<p align="right">(<a href="#top">back to top</a>)</p>
