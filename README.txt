Instructions on install and use:

If you havent already please unzip the folder with the code

Install Node JS if you do not have it
https://nodejs.org/en

Install MySQL if you do not have it
https://dev.mysql.com/downloads/installer/
you may need to search for a valid download in community downloads

Install MySQL Workbench if you do not have it
https://dev.mysql.com/downloads/workbench/
select applicable OS

How to set up workbench.
Follow the installation steps and set your password to 'rootpwd'. This step is crucial
Your username should automatically be root.
Create a new database, call it whatever you like.
Head over to administration > data import/restore > select import from self-contained file> navigate the to sql file provided and import it.
this will import exisiting tables and information to help you run the site.
Head to administration > Users and privleges. select the user 'root'. make sure that root has ALL administrative roles, if it does not tick all and apply.
head to schema privleges and make sure that there is an entry. if there is not, click add entry > ok > select all privleges and apply. Restart your workbench. 
Your root account should now have full access to the database functions 

Open your IDE or terminal.
In the terminal
navigate to your folder where the code is:
cd path/to/code
mkdir path/to/code
after you are in the correct folder run this in the terminal:
npm install express axios cheerio fs path mysql2 ejs multer passport passport-local express-session sharp string-similarity uuid image-hash natural bcryptjs connect-flash

after running this you should be able to run the code fine
type in node app.js in the terminal to start the program.
in the terminal you should see the information of the DB, again make sure that the password is rootpwd.
in your browser type in localhost:3000 to access the website


FOLDER STRUCTURE:
ecomcode
	>config
		database.js
		passport.js
	>controllers
		userControllers.js
	>public
		>uploads
			[4 images]
		syles.css
	>routes
		auth.js
		cart.js
		itemService.js
		pages.js
		scraper.js
		users.js
	>uploads
		[60 images, may change when you run the code and add items]
	>views
		about.ejs
		account.ejs
		cart.ejs
		category.ejs
		contact.ejs
		dashboard.ejs
		dashboardlistings.ejs
		dashboardusers.ejs
		edititem.ejs
		edituser.ejs
		footer.ejs
		header.ejs
		index.ejs
		item.ejs
		login.ejs
		orders.ejs
		searchresults.ejs
		sellitem.ejs
		service.ejs
		term.ejs
		useredititem.ejs
	.env (may be hidden)
	app.js
	classifier.json
	classifierSetup.js
	dump.sql
	README.txt
