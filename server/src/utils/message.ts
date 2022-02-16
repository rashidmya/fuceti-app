abstract class MessageStore {
    saveMessage(message: any): any{}
    findMessagesForUser(userId: any): any{}
}

export class InMemoryMessageStore extends MessageStore {
    messages: Array<any>;

    constructor(){
        super();
        this.messages = []
    };

    saveMessage(message: any) {
        this.messages.push(message);
    };

    findMessagesForUser(userId: any) {
        return this.messages.filter(
            ({from,to}) => from === userId || to === userId
        );
    }
}