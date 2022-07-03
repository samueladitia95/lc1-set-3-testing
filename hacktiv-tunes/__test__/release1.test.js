const Controller = require("../controllers/controller");
const fs = require("fs");

// SETUP data
// no need for beforeAll because sync
const playlists = [
  {
    id: 1,
    name: "Funtastic Kpop",
    type: "Mythic",
    songs: [
      {
        name: "Mr Chu",
        group: "Apink",
        duration: 180,
      },
      {
        name: "No No NO",
        group: "Apink",
        duration: 200,
      },
      {
        name: "Wishlist",
        group: "Apink",
        duration: 180,
      },
      {
        name: "Mr Chu",
        group: "Apink",
        duration: 320,
      },
    ],
    limit: 10,
  },
  {
    id: 2,
    name: "Waktunya Hacktivtunes",
    type: "Legend",
    songs: [
      {
        name: "Waktunya BUlan",
        group: "Hivi",
        duration: 145,
      },
      {
        name: "Saling Merindu",
        group: "RAN",
        duration: 180,
      },
    ],
    limit: 6,
  },
  {
    id: 3,
    name: "HipHop",
    type: "Epic",
    songs: [
      {
        name: "Monkey Dance",
        group: "RnBGang",
        duration: 300,
      },
      {
        name: "Alone in The Dark",
        group: "Reggae,",
        duration: 90,
      },
    ],
    limit: 4,
  },
];
fs.writeFileSync("./data.json", JSON.stringify(playlists, null, 2));

describe("Release 1 Success", () => {
  test("is an Array", (done) => {
    function callback(err, playlists) {
      if (err) {
        done(err);
        return;
      }
      try {
        expect(playlists.constructor.name).toBe("Array");
        expect(playlists.length).toBe(3);
        done();
      } catch (err) {
        done(err);
      }
    }

    Controller.show(callback);
  });

  test("is an Array of Mythic, Legend and Epic class", (done) => {
    function callback(err, playlists) {
      if (err) {
        done(err);
        return;
      }
      try {
        expect(playlists[0].constructor.name).toBe("Mythic");
        expect(playlists[1].constructor.name).toBe("Legend");
        expect(playlists[2].constructor.name).toBe("Epic");
        done();
      } catch (err) {
        done(err);
      }
    }

    Controller.show(callback);
  });

  test("is Mythic class child of Playlist class", (done) => {
    function callback(err, playlists) {
      if (err) {
        done(err);
        return;
      }
      try {
        const regex = /Mythic extends Playlist/;
        expect(playlists[0].constructor.toString().match(regex)).not.toBe(null);
        done();
      } catch (err) {
        done(err);
      }
    }

    Controller.show(callback);
  });

  test("is Legend class child of Playlist class", (done) => {
    function callback(err, playlists) {
      if (err) {
        done(err);
        return;
      }
      try {
        const regex = /Legend extends Playlist/;
        expect(playlists[1].constructor.toString().match(regex)).not.toBe(null);
        done();
      } catch (err) {
        done(err);
      }
    }

    Controller.show(callback);
  });

  test("is Epic class child of Playlist class", (done) => {
    function callback(err, playlists) {
      if (err) {
        done(err);
        return;
      }
      try {
        const regex = /Epic extends Playlist/;
        expect(playlists[2].constructor.toString().match(regex)).not.toBe(null);
        done();
      } catch (err) {
        done(err);
      }
    }

    Controller.show(callback);
  });

  test("songs properties is an Array of Song class", (done) => {
    function callback(err, playlists) {
      if (err) {
        done(err);
        return;
      }
      try {
        expect(playlists[0].songs.constructor.name).toBe("Array");
        expect(playlists[0].songs.length).toBe(4);
        expect(playlists[0].songs[0].constructor.name).toBe("Song");
        done();
      } catch (err) {
        done(err);
      }
    }

    Controller.show(callback);
  });
});
