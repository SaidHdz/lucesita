const fs = require('fs');

const data = JSON.parse(fs.readFileSync('src/assets/DATOS.json', 'utf8'));

// Format name in a string
const replaceName = (str) => {
  if (!str) return str;
  return str;
};

let allSongs = [];
data.forEach(item => {
  // It seems each item has a `songs` array, but the item itself also has title/artist/cover for the album.
  // Wait, let's extract all the `songs` from inside the items, or maybe the items themselves are what we want?
  // Let's print the structure of the first item to understand it.
  if (item.songs && Array.isArray(item.songs)) {
    item.songs.forEach(song => {
      allSongs.push({
        id: song.id,
        title: replaceName(song.title),
        artist: replaceName(item.artist || 'Unknown Artist'), // using album artist if available
        cover: item.cover, // using album cover
        quote: replaceName(song.quote),
        interpretation: replaceName(song.interpretation)
      });
    });
  } else {
    // maybe it's just a flat list?
    allSongs.push({
      id: item.id || Math.random().toString(),
      title: replaceName(item.title),
      artist: replaceName(item.artist),
      cover: item.cover,
      quote: replaceName(item.quote),
      interpretation: replaceName(item.interpretation)
    });
  }
});

// Since the data could be large, let's write out a JS file with the first 10-20 songs just to see, or all of them.
// Let's save the processed data back to src/assets/songs.js
const jsContent = `export const songs = ${JSON.stringify(allSongs, null, 2)};`;
fs.writeFileSync('src/assets/songs.js', jsContent);
console.log(`Processed ${allSongs.length} songs and saved to src/assets/songs.js`);
