import React from 'react';
import { DlButton, DivDownload } from '../styling/Media.style';
import { truncate } from '../utils/converter';
import '../index.css';

const DownloadButton = (classMedia, songObject, state) => (

  <div>
    {songObject.songName.length > 0
      ? (
        <DivDownload>
          <div>
            <DlButton // Progress dl button
              type="button"
              id="dlbuttonReal"
              onClick={classMedia.handleClickDownload}
              downloadState={state === 'progress'}
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
                {'We need to reinvent current music streaming system - Anonymous'}
              </div>
            </div>
          ) }

        </DivDownload>
      ) : (
        <DivDownload>
          <DlButton
            type="button"
            onClick={classMedia.handleClickDownload}
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
              {'Musicians deserve to get paid more - Anonymous'}
            </div>
          </div>
        </DivDownload>
      )

    }
  </div>
);


export default DownloadButton;
