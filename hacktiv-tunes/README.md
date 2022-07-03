# Hacktiv Tunes

> ⏰ Time Estimation ~120 minutes

## Summary

Kalian diminta untuk membuat aplikasi bernama `Hacktiv Tunes` yang akan menampilkan `Playlist` yang merupakan kumpulan `lagu` yang disukai oleh user.
> Kerjakan Live Code ini didalam folder `hacktiv-tunes` yang sudah disediakan dengan template MVC.

## Release 0

Buatlah sebuah class `Playlist` yang memiliki property:

| property | description                                                 |
| -------- | ----------------------------------------------------------- |
| id       | `id` dari sebuah `Playlist`                                 |
| name     | `name` dari sebuah `Playlist`                               |
| type     | `type` dari sebuah `Song`                                   |
| songs    | Kumpulan instance dari class `Song`                         |
| limit    | `limit` `Song` yang bisa ditambahkan pada sebuah `Playlist` |

Dimana class `Song` memiliki property:

| property | description                                                    |
| -------- | -------------------------------------------------------------- |
| name     | `name` dari sebuah `Song`                                      |
| group    | `group` yang menyanyikan sebuah `Song`                         |
| duration | `duration` dari sebuah `Song` yang dibuat dalam hitungan detik |

> Property **limit** merupakan property yang menentukan jumlah `Song` yang bisa ditambah pada Playlist. \
> Buatlah property ini menjadi private dan buatlah getter & setter apabila dibutuhkan. 

Terdapat tiga type `Playlist` yang bisa didaftarkan yaitu:

- Mythic

  - Memiliki `limit` awal 10 `Song` yang dapat ditampung. 

* Legend

  - Memiliki `limit` awal 6 `Song` yang dapat ditampung

- Epic

  - Memiliki `limit` awal 4 `Song` yang dapat ditampung

Buatlah class class yang diperlukan sesuai dengan requirement diatas.

> Lihat data.json sebagai data awal. Property `limit` merupakan value yang dinamis dari data.json

## Release 1

`FORMAT DATA PADA "data.json" TIDAK BOLEH DIUBAH.`

Buatlah sebuah controller yang memiliki fitur:

1.  Buatlah fitur untuk menampilkan seluruh `Playlist` bersamaan dengan `Song` yang terdapat pada `Playlist` tersebut berdasarkan data yang ada pada file `data.json`.

    - Command yang dijalankan

      ```bash
        $ node index.js show
      ```

    - Output yang diharapkan

      <img src="./assets/list-playlist.png" alt="list-playlist">

2.  Buatlah fitur untuk menghapus `Playlist` yang ada:

    - Command ini akan menghapus `Playlist` yang berada pada `data.json` sesuai dengan `id` yang diminta
    - Format command yang harus dilakukan untuk menghapus `Playlist` baru adalah
      ```bash
        $ node index.js delete <id>
      ```
    - Contoh penggunaan command ini
      ```bash
        $ node index.js delete 1
      ```
    - Lakukan validasi terhadap `id` yang diminta. Jika tidak ada  tampilkan pesan error.

      <img src="./assets/validasi-id.png" alt="validasi-id">

    - Output yang diharapkan ketika Success

      <img src="./assets/success-delete-playlist.png" alt="delete-playlist">

## Release 2

Buatlah sebuah fitur yang dapat menambahkan sebuah `Song` kepada `Playlist` yang sudah ada.

- Format command yang harus dilakukan untuk menambahkan `Song` baru ke sebuah `Playlist` adalah

  ```bash
  $ node index.js addToPlaylist <idPlaylist> <songName> <songGroup> <songDuration>
  ```

- Contoh penggunaan command ini

  ```bash
   $ node index.js addToPlaylist 3 "Alone in The Dark" "Reggae" 90
  ```

  - Output yang diharapkan

    <img src="./assets/success-addplaylist.png" alt="Add to Playlist">

Ada beberapa rule validasi yang harus dipenuhi untuk menambahkan `Song` baru

1. Pastikan `Playlist` dapat menampung `Song` baru dengan memastikan limit `Playlist` masih lebih besar dibandingkan dengan jumlah `Song` yang sudah ada.

   - Output ketika error terjadi

     <img src="./assets/validasi-limit-addplaylist.png" alt="Reach Limit">

2. Pastikan `id` dari `Playlist` tersebut benar benar ada di dalam `data.json`

   - Output ketika error terjadi

     <img src="./assets/validasi-id-addplaylist.png" alt="Invalid id">

## Release 3

Buatlah sebuah fitur untuk melakukan upgrade limit dari playlist.\
Buatlah instance method 'upgradeLimit' pada masing-masing class yang membutuhkan.\
Method ini akan mengupdate `limit` dari `Playlist` yang dipilih sesuai `id` yang dimasukkan.\
Besar kenaikan limit adalah : 
 - +5 untuk Mythic
 - +3 untuk Legend
 - +2 untuk Epic
> HARUS menggunakan Konsep `Polymorphism` untuk mengimplementasikan fitur ini.

- Format command yang harus dijalankan
  ```bash
    $ node index.js upgradeLimitPlaylist <id>
  ```

- Contoh penggunaan command ini

  ```bash
   $ node index.js upgradeLimitPlaylist 1
  ```

- Output yang diharapkan

  <img src="./assets/upgradeLimitPlaylist.png" alt="upgradeLimitPlaylist">

- Lakukan validasi terhadap `id` yang diminta. Jika tidak ada  tampilkan pesan error.

  <img src="./assets/validasi-id.png" alt="validasi-id">

## Release 4

Buatlah sebuah fitur `detail` yang akan menampilkan list `Song` yang terdapat pada sebuah `Playlist`

- Buatlah sebuah instance method `durationInMinute` yang akan menampilkan `duration` dari sebuah `song` dengan format menit:
  contoh:
  ```txt
    duration = 300
    durationInMinute = 5:00
    =====
    duration = 150
    durationInMinute = 2:30
  ```
- Format command yang harus dijalankan
  ```bash
    $ node index.js detail <id>
  ```
- Expected output

  <img src="./assets/detail-playlist.png" alt="Detail-playlist">

- Dapat mengguanakan `console.table()` untuk mendapatkan format sesuai dengan ekspektasi.

- Lakukan validasi terhadap `id` yang diminta. Jika tidak ada  tampilkan pesan error.

  <img src="./assets/validasi-id.png" alt="validasi-id">
  