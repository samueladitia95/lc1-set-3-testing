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

describe("Release 2", () => {
  test("failed add new song to playlist, id not found", (done) => {
    const playlistId = 4;
    const name = "Daddy Daddy Do";
    const group = "JPop";
    const duration = 100;
    function callback(err) {
      if (err) {
        expect(err).not.toBe(null);
        const playlists = JSON.parse(fs.readFileSync(testFilePath));
        expect(playlists[0].songs.length).toBe(4);
        expect(playlists[1].songs.length).toBe(2);
        expect(playlists[2].songs.length).toBe(4);

        done();
        return;
      } else {
        done(err);
      }
    }

    Controller.addToPlaylist(playlistId, name, group, duration, callback);
  });

  test("failed add new song to playlist, playlist already reach limit", (done) => {
    const playlistId = 3;
    const name = "Daddy Daddy Do";
    const group = "JPop";
    const duration = 100;
    function callback(err) {
      if (err) {
        expect(err).not.toBe(null);
        const playlists = JSON.parse(fs.readFileSync(testFilePath));
        expect(playlists[2].songs.length).toBe(4);

        done();
        return;
      } else {
        done(err);
      }
    }

    Controller.addToPlaylist(playlistId, name, group, duration, callback);
  });

  test("success add new song to playlist", (done) => {
    const playlistId = 1;
    const name = "Daddy Daddy Do";
    const group = "JPop";
    const duration = 100;
    function callback(err, newPlaylist) {
      if (err) {
        done(err);
        return;
      }
      try {
        const regex = /Mythic extends Playlist/;
        expect(newPlaylist.constructor.toString().match(regex)).not.toBe(null);
        expect(newPlaylist.songs.length).toBe(5);
        expect(newPlaylist.songs[4]).toHaveProperty("name", name);
        expect(newPlaylist.songs[4]).toHaveProperty("group", group);
        expect(newPlaylist.songs[4]).toHaveProperty("duration", duration);
        done();
      } catch (err) {
        done(err);
      }
    }

    Controller.addToPlaylist(playlistId, name, group, duration, callback);
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
