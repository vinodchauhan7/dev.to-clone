import { testConn } from "./testConn";

console.log("Calling testConn");
testConn(true).then(() => process.exit());
