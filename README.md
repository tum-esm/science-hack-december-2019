# Science Hack 2019 Website

![](examples/selecting_process.gif)

![](examples/ODIAC_2013_to_2014.gif)

### Remarks

See the official website at **https://science-hack-2019.herokuapp.com/** (container in sleep mode, startup might take a while ~ 20s).

Be patient with the data fetching -> no preprocessing done (using the exact edgar/odiac nc files). <br/>
Since there is no preprocessing, the memory of the current (cost free) server is not big enough for large queries.

Select a date range and press `a`/`d` to jump backwards/forwards one time step.<br/>
Press `space` to run the "player" = Loop through the timesteps.

<br/>

### Tech Stack

* **Frontend: [React (JS)](https://reactjs.org/)**
* **Backend: [Flask (Python)](https://flask.palletsprojects.com/en/1.1.x/)**

<br/>

* Using the **[Heroku](https://www.heroku.com/)** deployment pipeline
* Hosted on **[AWS](https://aws.amazon.com/de/)**

<br/>

* Map & data rendering using [**DeckGL**](https://deck.gl/)
* File storage with **[Google Cloud Storage](https://cloud.google.com/products/storage)**

<br/>

* Design guideline by **[Google Material](https://material.io/)**
* React design components by **[Material UI](https://material-ui.com/)**

### Planned Tech Stack

* Precomputed data in different scales delivered over **[Mongo DB Atlas](https://www.mongodb.com/cloud/atlas) on GCP**
* Map Rendering using **[Mapbox](https://www.mapbox.com/)**
* Data Rendering using **[ThreeJS](https://threejs.org/)**



