from __future__ import print_function
from youtube_dl import YoutubeDL
import sys

def GetSize():
  url = sys.argv[1]
  ytdl = YoutubeDL({'quiet':True})
  info = ytdl.extract_info(url, download=False)
  formats = info['formats']

  for x in formats:
    if x.get('format_id') == '140':
      print(x.get('filesize'))

if __name__ == '__main__':
  GetSize()
