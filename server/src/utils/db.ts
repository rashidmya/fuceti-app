import pool from "../config/db.config";

abstract class SessionStore {
    findSession(id: any){}
    saveSession(id: any, session: any){}
    findAllSessions(){}
}

export class InMemorySessionStore extends SessionStore {
    sessions;

    constructor(){
        super();
        this.sessions = new Map();
    }

    findSession(id: any): any {
        return this.sessions.get(id);
    }

    saveSession(id: any, session: any): void {
        this.sessions.set(id, session)
    }

    findAllSessions(): any{
        return [...this.sessions.values()];
    }
}
