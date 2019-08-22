import { Router } from "../commons/router";
import { Server } from "restify";

export class MessagesRouter extends Router {
    applyRoutes(application: Server) {
        application.get('/messages/user/:id', (req, resp, next) => {
            
        })
    }
}

export const messagesRouter = new MessagesRouter()