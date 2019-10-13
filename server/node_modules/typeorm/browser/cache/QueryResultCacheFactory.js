import { RedisQueryResultCache } from "./RedisQueryResultCache";
import { DbQueryResultCache } from "./DbQueryResultCache";
/**
 * Caches query result into Redis database.
 */
var QueryResultCacheFactory = /** @class */ (function () {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function QueryResultCacheFactory(connection) {
        this.connection = connection;
    }
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    /**
     * Creates a new query result cache based on connection options.
     */
    QueryResultCacheFactory.prototype.create = function () {
        if (!this.connection.options.cache)
            throw new Error("To use cache you need to enable it in connection options by setting cache: true or providing some caching options. Example: { host: ..., username: ..., cache: true }");
        if (this.connection.options.cache.type === "redis")
            return new RedisQueryResultCache(this.connection, "redis");
        if (this.connection.options.cache.type === "ioredis")
            return new RedisQueryResultCache(this.connection, "ioredis");
        if (this.connection.options.cache.type === "ioredis/cluster")
            return new RedisQueryResultCache(this.connection, "ioredis/cluster");
        return new DbQueryResultCache(this.connection);
    };
    return QueryResultCacheFactory;
}());
export { QueryResultCacheFactory };

//# sourceMappingURL=QueryResultCacheFactory.js.map
