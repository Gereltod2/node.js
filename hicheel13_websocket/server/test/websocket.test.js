const io = require("socket.io-client");
const { expect } = require("chai");

describe("websocket test", function () {
  let socket;
  this.beforeEach((done) => {
    socket = io("http://localhost:3000");
    socket.on("connect", done);
  });

  it("server luu message ilgeeh", (done) => {
    socket.emit("message", (data) => {
      expect(data).to.equal("hello world");
      done();
    });
  });

  this.afterEach(() => {
    socket.close();
  });
});
