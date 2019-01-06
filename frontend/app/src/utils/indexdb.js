import idb from 'idb';
import { DB_NAME, DB_STORE_NAME, DB_STORE_PL } from '../constants/constant';

const version = 6;

export const initDB = () => {
  idb.open(DB_NAME, version, (upgradeDB) => {
    if (!upgradeDB.objectStoreNames.contains(DB_STORE_NAME)) {
      const store = upgradeDB.createObjectStore(DB_STORE_NAME, { keyPath: 'id', autoIncrement: true });
      store.createIndex('songTitle', 'songTitle', { unique: false }); // false meaning songTitle can be same
      console.log('db Upgraded');
    }
    if (!upgradeDB.objectStoreNames.contains(DB_STORE_PL)) {
      const PLstore = upgradeDB.createObjectStore(DB_STORE_PL, { keyPath: 'id', autoIncrement: false });
      PLstore.createIndex('PLid', 'PLid', { unique: false });
      console.log('db Upgraded with PL!');
    }
  });
  console.log('db started!');
};

export const addToDB = (songName, songImg, duration, artistName, albumName, stream) => {
  const indb = idb.open(DB_NAME, version);
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

export const getDB = () => idb.open(DB_NAME, version);

export const callDeleteDB = (key) => {
  const indb = getDB();
  indb.then((db) => {
    const tx = db.transaction(DB_STORE_NAME, 'readwrite');
    const store = tx.objectStore(DB_STORE_NAME);
    store.delete(key);
    return tx.complete;
  }).then((deleted) => { console.log('Item delete', deleted); });
};

export const callInitDB = (caller) => {
  const indb = getDB();
  const { PLAddSongArr } = caller.state;
  indb.then(db => db.transaction(DB_STORE_PL)
    .objectStore(DB_STORE_PL)
    .getAll()).then((obj) => {
    console.log('obj', obj[0].PlaylistArray);
    caller.setState({
      PLArrayParent: obj[0].PlaylistArray,
    });
  });
  indb.then(db => db.transaction(DB_STORE_NAME)
    .objectStore(DB_STORE_NAME)
    .getAll()).then((obj) => {
    console.log('current db item', obj);
    const tmpArray = [];
    obj.forEach((elem) => {
      const { id } = elem;
      tmpArray.push(id);
    });
    for (let i = 0; i <= obj.length; i += 1) {
      PLAddSongArr[i] = true;
    }
    caller.setState({
      dbItem: obj,
      PLAddSongArr,
    });
  });
};

export const callUpdateDB = (caller) => {
  const indb = getDB();
  indb.then(db => db.transaction(DB_STORE_NAME)
    .objectStore(DB_STORE_NAME)
    .getAll()).then((obj) => {
    caller.setState({
      dbItem: obj,
    });
  });
};

export const addToDBPL = (PL) => {
  const indb = idb.open(DB_NAME, version);
  indb.then((db) => {
    const tx = db.transaction(DB_STORE_PL, 'readwrite');
    tx.objectStore(DB_STORE_PL).put({
      id: 0,
      PlaylistArray: PL,
    });
    return tx.complete;
  });
};
