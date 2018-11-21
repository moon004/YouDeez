import React from 'react';
import { DlButton, DivDownload } from '../styling/Media.style';
import { truncate } from '../utils/converter';
import '../index.css';

const DownloadButton = (classMedia, songObject, state) => {
  console.log('DOWNLOAD BUTTON', songObject);
  return (

    <div>
      {songObject.songName.length > 0
        ? (
          <DivDownload>
            <div>
              <DlButton // Progress dl button
                type="button"
                onClick={classMedia.handleClickDownload}
                downloadState
              />
            </div>
            {state === 'progress' ? (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
              }}
              >
                <div id="downloadText">
                  {truncate(`Downloading ${songObject.songName}`, 40)}
                </div>
                <div id="yodaQuote">
                  {'be patience, you must - Master Yoda'}
                </div>
              </div>
            ) : (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
              }}
              >
                <div id="IdledownloadText">
                  {truncate(songObject.songName, 40)}
                </div>
                <div id="IdleQuote">
                  {'There are always hopes and dreams'}
                </div>
              </div>
            ) }

          </DivDownload>
        ) : (
          <DivDownload>
            <DlButton
              type="button"
              onClick={classMedia.handleClickDownload}
              downloadState
            />
            <div style={{
              display: 'flex',
              flexDirection: 'column',
            }}
            >
              <div id="noInfoDownloadText">
                {'Click the icon to download selected music'}
              </div>
              <div id="myQuote">
                {'Everyone deserves music for free - Anonymous'}
              </div>
            </div>
          </DivDownload>
        )

    }
    </div>
  );
};


export default DownloadButton;
