# To run
```
git clone https://github.com/juzerali/photoawe.git
cd photoawe
npm install
node app.js
```
Visit http://localhost:3000


# Bug
Flickr API returns malformed JSON quite a lot of times. Hence this implementation is very fragile and breaks a lot. TODO: Need to change response format to xml.