class View {
  // Tambahkan parameter sesuai kebutuhanmu
  static show(playlists) {
    console.log(playlists);
  }

  static success() {
    console.log("=======");
    console.log("SUCCESS");
    console.log("=======");
  }

  static error() {
    console.log("=======");
    console.log("ERROR");
    console.log("=======");
  }

  static table(array) {
    console.table(array);
  }

  static readError(err) {
    View.error();
    console.log(err);
  }

  static findPlaylistError() {
    View.error();
    console.log("Invalid playlist ID");
  }

  static delete(deletedData) {
    View.success();
    console.log(`Succesfully delete a playlist with id ${deletedData.id}`);
  }

  static limitError(playlist) {
    const { type, limit } = playlist;
    View.error();
    console.log(
      `You have reach the limit for playlist with type ${type} and limit ${limit}`
    );
  }

  static addSong(playlist) {
    const { type, limit, songs } = playlist;
    View.success();
    console.log(
      `Succesfully adding new song to playlist type ${type}, and remaining available slot for song on playlist: ${
        limit - songs.length
      }`
    );
  }

  static upLimit(playlist) {
    const { name, type, limit } = playlist;
    View.success();
    console.log(
      `Succesfully upgrade limit for playlist ${name} with ${type} and limit ${limit}`
    );
  }

  static detail(playlist) {
    const songs = playlist.songs.map((song) => {
      const { name, group } = song;
      return {
        name,
        group,
        durationInMinute: song.durationInMinute(),
      };
    });
    View.table(songs);
  }
}

module.exports = View;
