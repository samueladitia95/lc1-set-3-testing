const Model = require("../models/model");
const View = require("../views/view");

class Controller {
  // Tambahkan parameter sesuai kebutuhanmu
  static show(testCB) {
    Model.readData((err, playlists) => {
      //! Testing Only
      if (testCB) {
        testCB(err, playlists);
      }

      if (err) {
        View.readError(err.error);
      } else {
        View.show(playlists);
      }
    });
  }

  static delete(id) {
    Model.delete(+id, (err, deletedData) => {
      if (err) {
        if (err.code === 1) {
          View.readError(err.error);
        } else {
          View.findPlaylistError();
        }
      } else {
        View.delete(deletedData);
      }
    });
  }

  static addToPlaylist(id, name, group, duration) {
    Model.addSongToPlaylist(+id, name, group, +duration, (err, playlist) => {
      if (err) {
        if (err.code === 2) {
          View.findPlaylistError();
        } else if (err.code === 3) {
          View.limitError(err.playlist);
        } else {
          View.readError(err.error);
        }
      } else {
        View.addSong(playlist);
      }
    });
  }

  static upgradeLimitPlaylist(id) {
    Model.upgradeLimitPlaylist(+id, (err, playlist) => {
      if (err) {
        if (err.code === 2) {
          View.findPlaylistError();
        } else {
          View.readError(err.error);
        }
      } else {
        View.upLimit(playlist);
      }
    });
  }

  static detail(id) {
    Model.findOne(+id, (err, playlist) => {
      if (err) {
        if (err.code === 2) {
          View.findPlaylistError();
        } else {
          View.readError(err.error);
        }
      } else {
        View.detail(playlist);
      }
    });
  }
}

module.exports = Controller;
