import { EnumLanguages } from "./enum/languages";
import { Playlist } from "./models/playlists";
import { Song } from "./interfaces/songs";
import song_details from '../../data/song_details.json';
import iswar_song_details from '../../data/iswar_song_details.json';
// import fs from 'fs';

export const DEFAULT_THUMBNAIL = 
// 'https://play-lh.googleusercontent.com/paopOTA1eG7p2sMJ2OLjTIYnHlOQbEpkgIRv_Qjh2HsAOdo93be_RejZo1NlUwdnqA=w240-h480-rw';
'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/00/3a/25/003a25a6-ae68-a4e7-fbe8-f853e3f06b90/AppIcon-0-0-1x_U007emarketing-0-11-0-85-220.png/256x256bb.jpg';
// 'https://play-lh.googleusercontent.com/AI0jHBwb1wwPWHXh9fnoGep-VMbIJNuFquD1u_WJaQ0orzO-pecRuIPvamcoYq0DxoZM=w240-h480-rw';


export const ALL_SONGS: Song[] = song_details;


export const PLAYLISTS : Playlist[] = 
[
  {
    id:0,
    name: 'All Songs',
    thumbnail: 'https://mosaic.scdn.co/300/ab67616d00001e0211da5b553f0151f0fe3f5513ab67616d00001e02a7c6dd3e1d7c0389907a253aab67616d00001e02f3cce927d49a1874848f4674ab67616d00001e02fac323bc0e319edae0243c18',
    description: 'All Songs Description',
    songs: ALL_SONGS,
  },
  {
    id:1,
    name: 'Odia',
    thumbnail: 'https://mosaic.scdn.co/300/ab67616d00001e021676aa97945163ddeb7b7859ab67616d00001e0247692ea43baf0313eff8153fab67616d00001e02581ec406ca1886b1d0f994e8ab67616d00001e02bff1db01b2a0aff275d2986d',
    description: 'Odia Description',
    songs: ALL_SONGS.filter(song => song.language === EnumLanguages.Odia),
  },
  {
    id:2,
    name: 'Hindi',
    thumbnail: 'https://mosaic.scdn.co/300/ab67616d00001e02a2ef89ae0f8d1848081c1449ab67616d00001e02da50894e074ecd5ce61de0a1ab67616d00001e02fb8beb3f9399d900c52bb82aab67616d00001e02ff1cda069aac9352c258f8d1',
    description: 'Hindi Description',
    songs: ALL_SONGS.filter(song => song.language === EnumLanguages.Hindi),
  },
  {
    id:3,
    name: 'Telugu',
    thumbnail: 'https://mosaic.scdn.co/640/ab67616d00001e0217e013ccb50703f3e9bcf1d8ab67616d00001e0225124a0889229d757f95b02fab67616d00001e022fa4bdcc685d0bb72b9cf072ab67616d00001e026f3d477e1f31b354c5de3d56',
    description: 'Telugu Description',
    songs: ALL_SONGS.filter(song => song.language === EnumLanguages.Telugu),
  },
  {
    id: 6,
    name: 'Tamil',
    thumbnail: 'https://mosaic.scdn.co/640/ab67616d00001e020114543aaab6382e633ceb1dab67616d00001e0224f3ca794c241a2673b8c9a2ab67616d00001e0234b1bdfeeb594c3295a2c17fab67616d00001e029ff7b9bef6b774eef7fda62d',
    description: 'Tamil Description',
    songs: ALL_SONGS.filter(song => song.language === EnumLanguages.Tamil),
  },
  {
    id: 7,
    name: 'Kannada',
    thumbnail: 'https://mosaic.scdn.co/300/ab67616d00001e020600c34b83daeb5c70fe1147ab67616d00001e027c9e8dcb1c45cd8d72f239f2ab67616d00001e02bc90b347733d714292c51244ab67616d00001e02d6e4f82df9d904c326319e36',
    description: 'Kannada Description',
    songs: ALL_SONGS.filter(song => song.language === EnumLanguages.Kannada),
  },
  {
    id: 5,
    name: 'Bengali',
    thumbnail: 'https://mosaic.scdn.co/640/ab67616d00001e02085e4d99465cd29f83f55955ab67616d00001e02232f53bb30b861074fff5762ab67616d00001e02613dde65dda4a74577168118ab67616d00001e0282a7a6e3dcb2a24452977b4d',
    description: 'Bengali Description',
    songs: ALL_SONGS.filter(song => song.language === EnumLanguages.Bengali),
  },
  {
    id:4,
    name: 'English',
    thumbnail: 'https://www.shutterstock.com/image-vector/music-type-playlist-vector-cover-260nw-1757894120.jpg',
    description: 'English Description',
    songs: ALL_SONGS.filter(song => song.language === EnumLanguages.English),
  },
  {
    id:8,
    name: 'Iswar\'s Playlist',
    thumbnail: 'https://s3.amazonaws.com/files.freshteam.com/production/70980/attachments/5015488217/medium/WhatsApp_Image_2023-12-25_at_18.35.23_62bfbe2c.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIARX2EI6XT4266NZQM%2F20250114%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250114T134413Z&X-Amz-Expires=604800&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB0aCXVzLWVhc3QtMSJGMEQCIAtnU2GfYuFtbUXv3WJhhLCcSX9aDMvF0%2BJIQh%2BHB%2FosAiBCGfIodj1qw2j6iBllKMiiRGPIJM%2F4a8nb1vIbKeQCkCqvBQgVEAUaDDExOTg2NTQwNjk1MSIMhWQi8%2By8WkOrhM1gKowFGv3dxujJkmzJKXPguJ1DNxn3t7dctOevPrGLT6WfNlqWaiwNa30zR6fVNl1Q8ytgm31NMz5h%2F6lVlOZWMtQBoJrV1xuRSTATohHF0Xq6z6ixRw7Vgp2K8lo5%2BidW68Ht0y94bDb4tRerlJ5GXTsX3YU4con%2B3QE53yiQx8n1ZE8hI0nzmIkpgVH1bEJbJPlefh0EXvqMoFK7B7qr9zKUNrhba7Z%2FNug2CHrqxA5HhibY%2B94J22k6Oh2bsBzPdbMEeHPlQme%2FwfQuShen2OaZQsoAtSo6mSJ%2B1ObPaqaHdLxItdUlexZFyOQ3Bvc9nBGN0LU3I7k5iJlVn7potEswbGFu%2FFBTIIA%2BsI7kwoLCPFu0tZxJaF9PfhwrCkhgvOzqAdyEVOfpnkhkg5HGX%2Fxe6Gc2DImhjACo3HGrOorL4OEQGxlMUrEWaS%2FbuRSc30zyh0QsxQ9NHMarhSsMKF20vl9O3%2F313zaC2yVSL54o%2FTlY0H884p1gobFIRAaS41qkQczWChnSGUCxw%2BFl3rN9TSVzD%2BWLx4fo8v%2FEZCrGGoSQBT9TjrXML63Wnn3lzxevga5DvcaaR%2FrzGYg0CvBucTHESfXszLJiD9SmtsvyflJz9A1ySxlogVnVkJDpFQdOFOhfeyQZqD32%2BM%2F%2B71Jvs69pC1MWFuL4iKABwby3eWsdB70TR0Vy56pbTd4erX4Qctove3P0bgQKMm%2B0DtpS6iqVBm0xQRg4X2CaE0Ewc8APZsDSvYi6ZN5PbOMG%2B%2BB5LXVsYv5GJ07ym72j8iBJjUl6mYhsSjP66kjtLlGXj62U%2B7HUCQXkCY7S85hERSur9ni6Z1hPdsugi0qQh6CNIwfV1oy0mAIiEDcqVzDcpZm8BjqyAXJYkzcoiSA0A%2FnWX2Uyg93Y7vKYVsdxYKBiJd3OOBNiOqm6q7Y5zQXdDx%2BMAmC5OoTttlKDpMW7pg%2FkKveY7Z4w66PXuvptzPiisSS06c0sSTwaYScJb7SBZOKJuRqxSP7weEEHnxMvuCEvqYTond60xINntPwd3yzBqVqSahy4xzxqNs7uD2PYB520N68BC4gC3RYW2h8gvfSImRvl13xtjOr5LqeAVEucPwU%2FbYgzV%2BI%3D&X-Amz-SignedHeaders=host&X-Amz-Signature=4eb555779d44d5fd9d4576235ef1ab99a48ad0f1a9550a1961e81762cae93275',
    description: 'Iswar song Description',
    songs: iswar_song_details as Song[],
  },
  {
    id: 100,
    name: 'Others',
    thumbnail: 'https://www.figma.com/community/resource/214888db-27b3-44dd-9f6b-b82a04fbf9a3/thumbnail',
    description: 'Others Description',
    songs: ALL_SONGS.filter(song => !song.language),
  }
];
