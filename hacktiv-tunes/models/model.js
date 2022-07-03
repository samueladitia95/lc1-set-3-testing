const fs = require("fs");
const Factory = require("./class.js");

class Model {
  // Tambahkan parameter sesuai kebutuhanmu
  static readData(cb) {
    fs.readFile("./data.json", "utf-8", (err, playlists) => {
      if (err) {
        cb({ error: err, code: 1 });
      } else {
        playlists = JSON.parse(playlists);
        playlists = playlists.map((playlist) => {
          const { id, name, type, songs, limit } = playlist;

          const songsInstance = songs.map((song) => {
            const { name, group, duration } = song;
            return Factory.createSong(name, group, duration);
          });

          return Factory.createPlaylist(id, name, type, songsInstance, limit);
        });
        cb(null, playlists);
      }
    });
  }

  static writeData(playlists, cb) {
    let dataForJSON = playlists.map((playlist) => {
      const { id, name, type, songs: songsInstance, limit } = playlist;

      const songs = songsInstance.map((song) => {
        const { name, group, duration } = song;
        return { name, group, duration };
      });

      return { id, name, type, songs, limit };
    });

    dataForJSON = JSON.stringify(dataForJSON, null, 2);
    fs.writeFile("./data.json", dataForJSON, (err) => {
      if (err) {
        cb({ error: err, code: 1 });
      } else {
        cb(null);
      }
    });
  }

  /* OPTIONAL if NEEDED */
  static findOne(id, cb) {
    Model.readData((err, playlists) => {
      if (err) {
        cb(err, null);
      } else {
        const foundPlaylist = playlists.find((el) => el.id === id);
        if (!foundPlaylist) {
          cb({ code: 2 }, null);
          return;
        }

        cb(null, foundPlaylist);
      }
    });
  }

  static delete(id, cb) {
    Model.readData((err, playlists) => {
      if (err) {
        cb(err, null);
      } else {
        const deletedData = playlists.find((el) => el.id === id);
        if (!deletedData) {
          cb({ code: 2 }, null);
          return;
        }
        const filteredPlaylists = playlists.filter((el) => el.id !== id);
        Model.writeData(filteredPlaylists, (err) => {
          if (err) {
            cb(err, null);
          } else {
            cb(null, deletedData);
          }
        });
      }
    });
  }

  static addSongToPlaylist(id, name, group, duration, cb) {
    Model.readData((err, playlists) => {
      if (err) {
        cb(err, null);
      } else {
        const foundPlaylist = playlists.find((el) => el.id === id);

        if (!foundPlaylist) {
          cb({ code: 2 }, null);
          return;
        }

        if (foundPlaylist.songs.length >= foundPlaylist.limit) {
          cb({ code: 3, playlist: foundPlaylist }, null);
          return;
        }

        const newSong = Factory.createSong(name, group, duration);
        foundPlaylist.songs.push(newSong);
        Model.writeData(playlists, (err) => {
          if (err) {
            cb(err);
          } else {
            cb(null, foundPlaylist);
          }
        });
      }
    });
  }

  static upgradeLimitPlaylist(id, cb) {
    Model.readData((err, playlists) => {
      if (err) {
        cb(err, null);
      } else {
        const foundPlaylist = playlists.find((el) => el.id === id);

        if (!foundPlaylist) {
          cb({ code: 2 }, null);
          return;
        }
        foundPlaylist.upLimit();
        Model.writeData(playlists, (err) => {
          if (err) {
            cb(err, null);
          } else {
            cb(null, foundPlaylist);
          }
        });
      }
    });
  }
}

module.exports = Model;
