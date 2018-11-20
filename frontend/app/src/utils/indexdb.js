import idb from 'idb';
import { DB_NAME, DB_STORE_NAME } from '../constants/constant';


export const initDB = () => {
  idb.open(DB_NAME, 1, (upgradeDB) => {
    if (!upgradeDB.objectStoreNames.contains(DB_STORE_NAME)) {
      const store = upgradeDB.createObjectStore(DB_STORE_NAME, { keyPath: 'id', autoIncrement: true });
      store.createIndex('songTitle', 'songTitle', { unique: false });
      console.log('db Upgraded');
    }
  });
  console.log('db started!');
};

export const addToDB = (songName, songImg, duration, artistName, albumName, stream) => {
  const indb = idb.open(DB_NAME, 1);
  console.log('indb', songName, songImg, duration, artistName, albumName);
  indb.then((db) => {
    const tx = db.transaction(DB_STORE_NAME, 'readwrite');
    tx.objectStore(DB_STORE_NAME).put({
      songTitle: songName,
      img: songImg,
      dur: duration,
      artist: artistName,
      album: albumName,
      bit: stream,
    });
    return tx.complete;
  });
};

// const indb = getDB();
// indb.then(db => db.transaction(DB_STORE_NAME)
//   .objectStore(DB_STORE_NAME)
//   .getAll()).then((obj) => {
//   console.log('obj', obj);
//   this.state.dbItem = obj;
// });

export const getDB = () => idb.open(DB_NAME, 1);
