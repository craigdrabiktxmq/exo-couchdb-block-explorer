Exo CouchDB Block Exporer
===========================

This application is a simple block explorer for the CouchDB implementation of Exo blockchain transaction logging.  It's pretty low-rent at the moment, but it works as a basic testing and debugging tool.

How To Use
----------

Before using, open up Fauxton and enable CORS support.  Assuming you're running the [Exo Demo Project](https://github.com/craigdrabiktxmq/exo-demo) from Docker, you can point your browser at (http://localhost:5984/_utils) to launch Fauxton.  Click on the gear icon, then select CORS.  Enable CORS and either add localhost to the whitelist, or select "All Domains".

Launch the application.  Until I get a dockerfile in place, install angular CLI and run:
```
npm install
ng serve
``` 
Once the application finishes building, point your browser at (http://localhost:4200)


