const Controller = require("../controllers/controller");
const fs = require("fs");

function durationInMinute(duration) {
  return (
    (duration - (duration %= 60)) / 60 + (9 < duration ? ":" : ":0") + duration
  );
}

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

describe("Release 4", () => {
  test("failed detail playlist, playlist id not found", (done) => {
    const playlistId = 4;
    function callback(err) {
      if (err) {
        expect(err).not.toBe(null);
        done();
        return;
      } else {
        done(err);
      }
    }

    Controller.detail(playlistId, callback);
  });

  test("playlist detail success", (done) => {
    const playlistId = 1;
    function callback(err, playlist) {
      if (err) {
        done(err);
        return;
      }
      try {
        expect(playlist).toHaveProperty("id", 1);
        done();
      } catch (err) {
        done(err);
      }
    }

    Controller.detail(playlistId, callback);
  });

  test("method durationInMinute successfully created", (done) => {
    const playlistId = 1;
    function callback(err, playlist) {
      if (err) {
        done(err);
        return;
      }
      try {
        playlist.songs.forEach((song) => {
          const durationInSeconds = song.duration;
          const convertedTime = song.durationInMinute();
          expect(durationInMinute(durationInSeconds)).toBe(convertedTime);
        });
        done();
      } catch (err) {
        done(err);
      }
    }

    Controller.detail(playlistId, callback);
  });
});
