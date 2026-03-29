<h2>User guide:</h2>

Install the relevant packages from the package.json with `npm install`

Change the `.envTemplate` file to a `.env` file and add in credentials that you can use to log in to the MemoryLite platform (these should be created separately, directly throught the interface at https://apps.zappdev.io/MemoryLite_906_isabellamftr/HomePage)

Enter `npx nightwatch` to run all available tests

Or enter  `npx nightwatch ./MemoryLite/<testFileName>.js` to run a specific test file
