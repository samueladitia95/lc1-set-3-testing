const Controller = require("../controllers/controller");
const fs = require("fs");

// SETUP data
// no need for beforeAll because sync
const testFilePath = "./data.json";
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
fs.writeFileSync(testFilePath, JSON.stringify(playlists, null, 2));

describe("Release 1 Show", () => {
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

  test("Mythic class properties check", (done) => {
    function callback(err, playlists) {
      if (err) {
        done(err);
        return;
      }
      try {
        expect(playlists[0]).toHaveProperty("id", 1);
        expect(playlists[0]).toHaveProperty("name");
        expect(playlists[0]).toHaveProperty("type", "Mythic");
        expect(playlists[0]).toHaveProperty("songs");
        expect(playlists[0]).toHaveProperty("limit");
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

  test("Legend class properties check", (done) => {
    function callback(err, playlists) {
      if (err) {
        done(err);
        return;
      }
      try {
        expect(playlists[1]).toHaveProperty("id", 2);
        expect(playlists[1]).toHaveProperty("name");
        expect(playlists[1]).toHaveProperty("type", "Legend");
        expect(playlists[1]).toHaveProperty("songs");
        expect(playlists[1]).toHaveProperty("limit");
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

  test("Epic class properties check", (done) => {
    function callback(err, playlists) {
      if (err) {
        done(err);
        return;
      }
      try {
        expect(playlists[2]).toHaveProperty("id", 3);
        expect(playlists[2]).toHaveProperty("name");
        expect(playlists[2]).toHaveProperty("type", "Epic");
        expect(playlists[2]).toHaveProperty("songs");
        expect(playlists[2]).toHaveProperty("limit");
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

  test("Song class properties check", (done) => {
    function callback(err, playlists) {
      if (err) {
        done(err);
        return;
      }
      try {
        expect(playlists[0].songs[0]).toHaveProperty("name");
        expect(playlists[0].songs[0]).toHaveProperty("group");
        expect(playlists[0].songs[0]).toHaveProperty("duration");
        done();
      } catch (err) {
        done(err);
      }
    }

    Controller.show(callback);
  });
});

describe("Release 1 Delete", () => {
  test("failed delete id 4, should return error", (done) => {
    const playListId = 4;
    function callback(err) {
      if (err) {
        expect(err).not.toBe(null);
        const afterDeletePlaylists = JSON.parse(fs.readFileSync(testFilePath));
        expect(afterDeletePlaylists.length).toBe(3);
        done();
        return;
      } else {
        done(err);
      }
    }

    Controller.delete(playListId, callback);
  });

  test("success delete id 1", (done) => {
    const playListId = 1;
    function callback(err, deletedPlaylist) {
      if (err) {
        done(err);
        return;
      }
      try {
        expect(deletedPlaylist.constructor.name).toBe("Mythic");
        expect(deletedPlaylist).toHaveProperty("id", playListId);

        const afterDeletePlaylists = JSON.parse(fs.readFileSync(testFilePath));
        expect(afterDeletePlaylists.length).toBe(2);
        done();
      } catch (err) {
        done(err);
      }
    }

    Controller.delete(playListId, callback);
  });

  test("is JSON format still the same", () => {
    const playlists = JSON.parse(fs.readFileSync(testFilePath));
    playlists.forEach((playlist) => {
      expect(playlist).toHaveProperty("id");
      expect(playlist).toHaveProperty("name");
      expect(playlist).toHaveProperty("type");
      expect(playlist).toHaveProperty("songs");
      expect(playlist.songs.constructor.name).toBe("Array");
      expect(playlist).toHaveProperty("limit");

      playlist.songs.forEach((song) => {
        expect(song).toHaveProperty("name");
        expect(song).toHaveProperty("group");
        expect(song).toHaveProperty("duration");
      });
    });
  });
});
