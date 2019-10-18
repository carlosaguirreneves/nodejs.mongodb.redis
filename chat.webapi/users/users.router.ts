import * as restify from 'restify'
import { User } from "./users.model";
import { ModelRouter } from '../commons/model-router'

class UsersRouter extends ModelRouter<User> {
    constructor() {
        super(User)

        this.on('beforeRender', document => {
            document.password = undefined
        })
    }
    
    applyRoutes(application: restify.Server) {
        application.get('/users', this.findAll)
        application.get('/users/:id', [this.validateId, this.findById])
        application.post('/users', this.save)
    }
}

export const usersRouter = new UsersRouter()