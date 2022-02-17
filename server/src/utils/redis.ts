import { Redis} from "ioredis";

abstract class MessageStore {
  saveMessage(message: any): any {}
  findMessagesForUser(userId: any): any {}
}

abstract class SessionStore {
  findSession(id: any) {}
  saveSession(id: any, session: any) {}
  findAllSessions() {}
}

const CONVERSATION_TTL = 24 * 60 * 60;

export class RedisMessageStore extends MessageStore {
  redisClient: Redis;

  constructor(redisClient: Redis) {
    super();
    this.redisClient = redisClient;
  }

  saveMessage(message: any) {
    const value = JSON.stringify(message);
    this.redisClient
      .multi()
      .rpush(`messages:${message.from}`, value)
      .rpush(`messages:${message.to}`, value)
      .expire(`messages:${message.from}`, CONVERSATION_TTL)
      .expire(`messages:${message.to}`, CONVERSATION_TTL)
      .exec();
  }

  findMessagesForUser(userId: any): any {
    return this.redisClient
      .lrange(`messages:${userId}`, 0, 1)
      .then((results) => {
        return results.map((result) => JSON.parse(result));
      });
  }
}

const SESSION_TTL = 24 * 60 * 60;
const mapSession = ([userId, username, connected]: any) =>
  userId ? { userId, username, connected: connected === "true" } : undefined;

export class RedisSessionStore extends SessionStore {
  redisClient: Redis;

  constructor(redisClient: Redis) {
    super();
    this.redisClient = redisClient;
  }

  findSession(id: string): any {
    return this.redisClient
      .hmget(`sessionL${id}`, "userId", "username", "connected")
      .then(mapSession);
  }

  saveSession(id: any, { userId, username, connected }: any): any {
    this.redisClient
      .multi()
      .hset(
        `session:${id}`,
        "userId",
        userId,
        "username",
        username,
        "connected",
        connected
      )
      .expire(`session${id}`, SESSION_TTL)
      .exec();
  }

  async findAllSessions(): Promise<any> {
    const keys = new Set();
    let nextIndex = 0;
    do {
      const [nextIndexAsStr, results] = await this.redisClient.scan(
        nextIndex,
        "MATCH",
        "session:*",
        "COUNT",
        100
      );
      nextIndex = parseInt(nextIndexAsStr, 10);
      results.forEach((s) => keys.add(s));
    } while (nextIndex !== 0);
    const commands:any = [];
    keys.forEach(key => {
        commands.push(["hmget",key, "userId", "username", "connected"]);
    });
    return this.redisClient
        .multi(commands)
        .exec()
        .then(results => {
            return results
                .map(([err, session]) => (err ? undefined : mapSession(session)))
                .filter((v) => !!v);
        });
  };
}
