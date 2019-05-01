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

export const callDeletePLIDdb = (id, PL) => {
  const indb = getDB();
  indb.then((db) => {
    const tx = db.transaction(DB_STORE_PL, 'readwrite');
    const store = tx.objectStore(DB_STORE_PL).get(0);
    store.then((elem) => {
      elem.PlaylistArray[PL].items.splice(id, 1);
      tx.objectStore(DB_STORE_PL).put({
        id: 0,
        PlaylistArray: elem.PlaylistArray,
      });
    });
    return tx.complete;
  });
};

export const callDeletePL = (index, caller) => {
  const indb = getDB();
  indb.then((db) => {
    // for now stick with this lame method of delete.
    const tx = db.transaction(DB_STORE_PL, 'readwrite');
    const store = tx.objectStore(DB_STORE_PL).get(0);
    store.then((elem) => {
      elem.PlaylistArray.splice(index, 1);
      tx.objectStore(DB_STORE_PL).put({
        id: 0,
        PlaylistArray: elem.PlaylistArray,
      });
      caller.setState({
        currentPL: 0,
        tmpCurrentPL: 1,
      });
    });
    return tx.complete;
  });
};

export const callInitDB = (caller) => {
  const indb = getDB();
  const { PLAddSongArr, hidePLBut } = caller.state;
  indb.then((db) => { // Getting the 'obj'
    let tx = db.transaction(DB_STORE_NAME, 'readwrite');
    const obj = tx.objectStore(DB_STORE_NAME).getAll();
    const tmpArray = [];
    obj.then((object) => {
      object.forEach((elem) => {
        tmpArray.push(elem.id);
        PLAddSongArr.push(true);
      });
    });
    tx = db.transaction(DB_STORE_PL, 'readwrite');
    const PLStore = tx.objectStore(DB_STORE_PL).getAll();
    PLStore.then((elem) => {
      if (elem[0] === undefined) {
        // Void array is there for the fade effect when changing playlist
        const initArr = [{
          name: 'Void',
          items: [],
        }, {
          name: 'Main',
          items: tmpArray,
        }];
        tx.objectStore(DB_STORE_PL).put({
          id: 0,
          // create new on first run and append
          PlaylistArray: initArr,
        });
        obj.then((object) => {
          caller.setState({
            dbItem: object,
            PLArrayParent: initArr,
            PLAddSongArr,
            hidePLBut: [false, false], // for Void and Main
          });
        });
      } else {
        tx.objectStore(DB_STORE_PL).put({
          id: 0,
          // the list on 2nd run
          PlaylistArray: elem[0].PlaylistArray,
        });
        /* eslint-disable no-param-reassign */
        elem[0].PlaylistArray[1].items = tmpArray;
        /* eslint-disable no-param-reassign */
        elem[0].PlaylistArray.forEach(() => {
          hidePLBut.push(false); // For hiding button when drag
        });
        obj.then((object) => {
          caller.setState({
            dbItem: object,
            PLArrayParent: elem[0].PlaylistArray,
            PLAddSongArr,
            hidePLBut,
          });
        });
      }
    });
    return tx.complete;
  });
};

// export const callInitDBMW = (caller) => {
//   const indb = getDB();
//   indb.then((db) => {
//     const tx = db.transaction(DB_STORE_NAME, 'readwrite');
//     const obj = tx.objectStore(DB_STORE_NAME).getAll();
//     obj.then((object) => {
//       caller.setState({
//         dbItem: object,
//       });
//     });
//     return tx.complete;
//   });
// };

export const callUpdateDB = (caller) => {
  const indb = getDB();
  const tmpIDArray = [];
  const tmpPLAddSongArr = [];
  // Just to get the last added song id
  indb.then(db => db.transaction(DB_STORE_NAME)
    .objectStore(DB_STORE_NAME)
    .getAll()).then((obj) => {
    obj.forEach((elem) => {
      tmpIDArray.push(elem.id);
      tmpPLAddSongArr.push(true);
    });
    caller.setState({
      dbItem: obj,
      dropClassName: 'droppableClass',
    });
  });

  indb.then((db) => {
    const tx = db.transaction(DB_STORE_PL, 'readwrite');
    const PLStore = tx.objectStore(DB_STORE_PL).getAll();
    PLStore.then((elem) => {
      // push last id to the PL DB and append it.
      elem[0].PlaylistArray[1].items = tmpIDArray;
      tx.objectStore(DB_STORE_PL).put({
        id: 0,
        PlaylistArray: elem[0].PlaylistArray,
      });
      caller.setState({
        PLArrayParent: elem[0].PlaylistArray,
        PLAddSongArr: tmpPLAddSongArr, // make newly added song opacity: 1
      });
    });
    return tx.complete;
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
