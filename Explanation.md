Please see detailed documentation below with regards to the application that has been built based on the Technical Assessment given to me. This includes the structure of the application with its functions:

**_Bullets are the folder name in my project_**
FRONTEND
• front - I use simple react framework for the UI(create-react-app)

        • src – this folder consist of different files for the UI

            • App.js – the main file of the UI that executes the request to “POST” to the URL(submitJob function executes by clicking the Submit button) and request a response from the API through jobId(fetchResult function executes by clicking the Get Result button).

• back - I use the node for the backend

        • server.js - this file executes the port to run when starting 'node server.js' command, it consist of expressjs for the routes to execute in the back and provide an API connection

        • .env - a file that handle the db properties and the api-key

            • config > db.js - this portion calls db properties from the .env file using the 'process.env...' with the use of sequelize for mysql2 db

            • models > job.models.js - consist of Datatypes that has been declared based on their usage

            • routes > job.routes - consist of post method(receives the data based on the url inputted from textfield) and get method for fetching of data based on the job id.

            • services > job.service.js - there were two services in this file the submitJob where it executes and process the inputted url and create it in new data through res.status(201).json({ jobId: newJob.id, status: newJob.status }) and the getJobById where it finds the selected url by their job id and send it to UI through res.status(200).json(job)

            • services > summarizer.service.js - this service handles the fetching of the web content by executing a response from url through get method using also the Cheerio package that converts the main body text of the url. It has also a service that summarize the text through an LLM API, I use the ChatGPT API for this.
