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

describe("Release 3", () => {
  test("success add limit Mythic", (done) => {
    const playlistId = 1;
    function callback(err, playlist) {
      if (err) {
        done(err);
        return;
      }
      try {
        expect(playlist).toHaveProperty("limit", 15);
        done();
      } catch (err) {
        done(err);
      }
    }

    Controller.upgradeLimitPlaylist(playlistId, callback);
  });

  test("success add limit Legend", (done) => {
    const playlistId = 2;
    function callback(err, playlist) {
      if (err) {
        done(err);
        return;
      }
      try {
        expect(playlist).toHaveProperty("limit", 9);
        done();
      } catch (err) {
        done(err);
      }
    }

    Controller.upgradeLimitPlaylist(playlistId, callback);
  });

  test("success add limit Epic", (done) => {
    const playlistId = 3;
    function callback(err, playlist) {
      if (err) {
        done(err);
        return;
      }
      try {
        expect(playlist).toHaveProperty("limit", 6);
        done();
      } catch (err) {
        done(err);
      }
    }

    Controller.upgradeLimitPlaylist(playlistId, callback);
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
