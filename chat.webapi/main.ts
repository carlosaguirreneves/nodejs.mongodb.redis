import { Startup } from './startup/startup'
import { usersRouter } from './users/users.router';
import { messagesRouter } from './messages/messages.router';

let startup = new Startup();
startup.bootstrap([usersRouter, messagesRouter]).then((server) => {
    console.log(`Server is listening on: http://localhost:${server.application.address().port}`)
}).catch(error => {
    console.error('Server failed to start', error)
    process.exit(1)
})

process.on('exit', () => {
    console.log('process=>exit', new Date())
})