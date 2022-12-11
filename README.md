# Pizza Planet

Below you will find details on how to set up this repo for local testing. You will need to install the node modules as well
as one global module to get this running in a way that is easy to test.

## Basic requirements
- You must have `git`
- You must be able to run `node` 18+
- You must have the `gatsby-cli` installed


## Step 1: Clone the Repo

Run the following command to clone the repo:

```
git clone git@github.com:vastolf/pizza-planet.git
```

## Step 2: Ensure you are using Node 18

Like most node developers, I use `nvm` to manage my node version. If you don't have nvm, [install it](https://heynode.com/tutorial/install-nodejs-locally-nvm/)

```
nvm install 18
nvm use 18
```

## Step 3: Install the Gatsby CLI
This will allow you to more easily view the fully built site locally, and test the API endpoints. We could technically test via `gatsby develop` but this way we ensure the actual build is passing.

```
npm install -g gatsby-cli
```

## Step 4: Install Node Modules

Run the following commands to enter the project folder and install all the necessary node modules. **Note: If you are not using node 18 this will not work.**

```
cd pizza-planet
npm install
```

## Step 5: Set up .env variables
I've set up a template `.env` file that you can use to set the local environment variables. These env variables will be the MYSQL credentials necessary to connect to the Database.

Run the following commands:
```
cp .env.template .env.production
cp .env.template .env.development
```

Now open each .env file and either:
- Use the database credentials I sent in the email
- Set up your own empty MYSQL database + user and set the credentials in both `.env.production` and `.env.development`

## Step 6: Build & Serve the project

Run the following command to build the project into the `/public` directory; this could take up to a minute depending on your machine:

```
npm run build
```

Once the build is complete, you will need to serve it to view it locally. Run the following command:

```
gatsby serve
```

This will serve the files that were build into `/public`, as well as allow our API functions to be accessed.

## Step 7: View & manually test the site
You can now view the site at [http://localhost:9000](https://localhost:9000)

You should see:
- A table at the top of the page with all People listed
- A button next to each person's name to view the Pizzas they have consumed
- Upon clicking their View Pizzas button, you should see another table with the Toppings and Order Dates listed
- You should also see a small input/button to enter a Topping and add a new Pizza under this Person
- There should also be a small input/button below the People listing, where you can add new People
- There should be a Streaks listing below the People table
- There should be a Pizza Days section, where you can select a year and month to see the biggest Pizza Consumption days for a particular month
- Finally, a button called "Reset Database to Defaults" that allows you to wipe the database. It will then load the csv data (which I converted to a json file called `data.json` in the root directory).

You may manually test all sections of the site work by interacting with them via the browser.

## Step 8: Run unit tests

To run unit tests, keep the `gatsby serve` terminal instance open & running, and open an additional Terminal. **It is necessary that the site is still being served or the API endpoints cannot be tested.**

In the new terminal:

```
cd pizza-planet
npm test
```

This will run `jest` which we are using for our unit testing.


# Information regarding development choices

Here I will explain my reasoning for the various choices I made during development.

## Packages
- `axios` - easy to use, lightweight solution for making requests to CRUD endpoints in nodejs
- `gatsby` - This is a framework that supports TypeScript which I've used heavily in the past; it just makes it easier to have API endpoints integrated into the same project as the front-end rendering. NextJS also would've worked for this, but I went with Gatsby since the installation process is easier for testing.
- `mysql` - to make requests to the mysql database
- `normalize.css` - a small CSS library that I tend to always add to new projects, so I don't have to normalize css rules myself (removing padding/margin from the body, etc)
- `react/react-dom` - The obvious choice for most any SPA
- `typescript` - I prefer to use TypeScript whenever possible, as static typing tends to make for safer applications.
- `jest` - used for unit testing

All other packages in `package.json` are peer dependencies of other packages listed above, mostly type definitions

## CSV data import
I am not sure if it was a requirement to actually load the data from a CSV, but I assumed it was just important that the data got into the database somehow. Generally if I needed to do something like this, I'd use a package like `csvtojson`. This can very easily be implemented [following a guide such as this one](https://attacomsian.com/blog/nodejs-convert-csv-to-json).

If you need me to implement this, please let me know and I can do so.

## Final Notes
Just like to raise some points regarding the project:

- It does not have full Type coverage. I did it in the cases when it was easy / more worth it, but as this is not a real production application, I didn't want to sink too much time into ensuring it was 100% type safe.
- I chose to use some date formatting / reading patterns that I wouldn't generally use in a production application just to make sure it was done quickly. Generally I'd depend a lot less on strings when it comes to dates, but for simplicity's sake I've cut some corners here.
- The unit tests are also a bit lackluster, and would be much more robust if I knew the dataset was actually changing (or again, if this was an actual production level application)