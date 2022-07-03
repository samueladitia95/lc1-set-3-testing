class Factory {
  static createPlaylist(id, name, type, songs, limit) {
    switch (type) {
      case "Mythic":
        return new Mythic(id, name, songs, limit);

      case "Legend":
        return new Legend(id, name, songs, limit);

      case "Epic":
        return new Epic(id, name, songs, limit);
    }
  }
  static createSong(name, group, duration) {
    return new Song(name, group, duration);
  }
}

class Playlist {
  #limit;
  constructor(id, name, type, songs, limit) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.songs = songs;
    this.#limit = limit;
  }

  get limit() {
    return this.#limit;
  }

  set limit(add) {
    this.#limit = +add;
  }

  upLimit() {
    this.#limit += 100;
  }
}

class Mythic extends Playlist {
  constructor(id, name, songs, limit = 10) {
    super(id, name, "Mythic", songs, limit);
  }

  upLimit() {
    this.limit += 5;
  }
}

class Legend extends Playlist {
  constructor(id, name, songs, limit = 6) {
    super(id, name, "Legend", songs, limit);
  }

  upLimit() {
    this.limit += 3;
  }
}

class Epic extends Playlist {
  constructor(id, name, songs, limit = 4) {
    super(id, name, "Epic", songs, limit);
  }
  upLimit() {
    this.limit += 2;
  }
}

class Song {
  constructor(name, group, duration) {
    this.name = name;
    this.group = group;
    this.duration = duration;
  }

  durationInMinute() {
    return (
      (this.duration - (this.duration %= 60)) / 60 +
      (9 < this.duration ? ":" : ":0") +
      this.duration
    );
  }
}

module.exports = Factory;
