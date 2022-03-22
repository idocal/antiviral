# antiviral

## Installation
```sh
$ git clone https://github.com/idocal/antiviral/
$ cd antiviral
$ npm install
```

## Run the server
```sh
$ npm start
```

## Test behavior
1. Go to: http://localhost:8080/url/{UNIQUE_URL}
2. Replace `{UNIQUE_URL}` with whatever unique URL you desire.
3. This should yield a `{'success': true}` response.
4. Now go with another browser, another device, or incognito to the same unique URL. You should receive a 400.
