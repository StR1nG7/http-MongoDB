const http = require('http');
const mongoose = require('mongoose');
const UserControllers = require('./controllers');
const { toJSON, onReceivedBody, parseURL } = require('./utils');

const db = 'mongodb+srv://StR1nG7:123654@cluster0.f8cgzaz.mongodb.net/server?retryWrites=true&w=majority';

mongoose
    .set('strictQuery', true)
    .connect(db)
    .then(() => console.log('Connected to DB'))
    .catch(err => console.log(err));

const server = http.createServer((req, res) => {
    const { route, id } = parseURL(req);

    if (route === 'users') {
        switch (req.method) {
            case 'GET':
            default:
                UserControllers.getUsers()
                    .then(users => {
                        res.writeHead(200, { "Content-Type": "application/json" });
                        res.end(toJSON(users)); 
                    })
                    .catch(err => {
                        console.log(err);
                        res.end(toJSON(err)); 
                    });
                break;
            case 'POST':
                onReceivedBody(req, body => {
                    UserControllers.saveUser(JSON.parse(body))
                    .then(user => {
                        res.writeHead(201, { "Content-Type": "application/json" });
                        res.end(toJSON(user)); 
                    })
                    .catch(err => {
                        console.log(err);
                        res.end(toJSON(err)); 
                    });
                });
                break;
            case 'DELETE':
                UserControllers.deleteUser(id)
                    .then(user => {
                        res.writeHead(200, { "Content-Type": "application/json" });
                        res.end(toJSON(user)); 
                    })
                    .catch(err => {
                        console.log(err);
                        res.end(toJSON(err)); 
                    });
                break;
            case 'PUT':
                onReceivedBody(req, body => {
                    UserControllers.updateUser(id, JSON.parse(body))
                    .then(user => {
                        res.writeHead(200, { "Content-Type": "application/json" });
                        res.end(toJSON(user)); 
                    })
                    .catch(err => {
                        console.log(err);
                        res.end(toJSON(err)); 
                    });
                });
                break;
        }
    }
})

server.listen(8000, () => console.log(`Server listening on port 8000`));