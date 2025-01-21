import { EnumLanguages } from "./enum/languages";
import { Playlist } from "./models/playlists";
import { Song } from "./interfaces/songs";
import song_details from '../../public/data/song_details.json';
import iswar_song_details from '../../public/data/iswar_song_details.json';
// import fs from 'fs';

export const DEFAULT_THUMBNAIL = 
// 'https://play-lh.googleusercontent.com/paopOTA1eG7p2sMJ2OLjTIYnHlOQbEpkgIRv_Qjh2HsAOdo93be_RejZo1NlUwdnqA=w240-h480-rw';
'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/00/3a/25/003a25a6-ae68-a4e7-fbe8-f853e3f06b90/AppIcon-0-0-1x_U007emarketing-0-11-0-85-220.png/256x256bb.jpg';
// 'https://play-lh.googleusercontent.com/AI0jHBwb1wwPWHXh9fnoGep-VMbIJNuFquD1u_WJaQ0orzO-pecRuIPvamcoYq0DxoZM=w240-h480-rw';


export const ALL_SONGS: Song[] = song_details;
const reveredSong = [...ALL_SONGS].reverse()

export const PLAYLISTS : Playlist[] = 
[
  {
    id:0,
    name: 'All Songs',
    thumbnail: 'https://mosaic.scdn.co/300/ab67616d00001e0211da5b553f0151f0fe3f5513ab67616d00001e02a7c6dd3e1d7c0389907a253aab67616d00001e02f3cce927d49a1874848f4674ab67616d00001e02fac323bc0e319edae0243c18',
    description: 'All Songs Description',
    songs: reveredSong,
  },
  {
    id:1,
    name: 'Odia',
    thumbnail: 'https://mosaic.scdn.co/300/ab67616d00001e021676aa97945163ddeb7b7859ab67616d00001e0247692ea43baf0313eff8153fab67616d00001e02581ec406ca1886b1d0f994e8ab67616d00001e02bff1db01b2a0aff275d2986d',
    description: 'Odia Description',
    songs: reveredSong.filter(song => song.language === EnumLanguages.Odia),
  },
  {
    id:2,
    name: 'Hindi',
    thumbnail: 'https://mosaic.scdn.co/300/ab67616d00001e02a2ef89ae0f8d1848081c1449ab67616d00001e02da50894e074ecd5ce61de0a1ab67616d00001e02fb8beb3f9399d900c52bb82aab67616d00001e02ff1cda069aac9352c258f8d1',
    description: 'Hindi Description',
    songs: reveredSong.filter(song => song.language === EnumLanguages.Hindi),
  },
  {
    id:3,
    name: 'Telugu',
    thumbnail: 'https://mosaic.scdn.co/640/ab67616d00001e0217e013ccb50703f3e9bcf1d8ab67616d00001e0225124a0889229d757f95b02fab67616d00001e022fa4bdcc685d0bb72b9cf072ab67616d00001e026f3d477e1f31b354c5de3d56',
    description: 'Telugu Description',
    songs: reveredSong.filter(song => song.language === EnumLanguages.Telugu),
  },
  {
    id: 6,
    name: 'Tamil',
    thumbnail: 'https://mosaic.scdn.co/640/ab67616d00001e020114543aaab6382e633ceb1dab67616d00001e0224f3ca794c241a2673b8c9a2ab67616d00001e0234b1bdfeeb594c3295a2c17fab67616d00001e029ff7b9bef6b774eef7fda62d',
    description: 'Tamil Description',
    songs: reveredSong.filter(song => song.language === EnumLanguages.Tamil),
  },
  {
    id: 7,
    name: 'Kannada',
    thumbnail: 'https://mosaic.scdn.co/300/ab67616d00001e020600c34b83daeb5c70fe1147ab67616d00001e027c9e8dcb1c45cd8d72f239f2ab67616d00001e02bc90b347733d714292c51244ab67616d00001e02d6e4f82df9d904c326319e36',
    description: 'Kannada Description',
    songs: reveredSong.filter(song => song.language === EnumLanguages.Kannada),
  },
  {
    id: 5,
    name: 'Bengali',
    thumbnail: 'https://mosaic.scdn.co/640/ab67616d00001e02085e4d99465cd29f83f55955ab67616d00001e02232f53bb30b861074fff5762ab67616d00001e02613dde65dda4a74577168118ab67616d00001e0282a7a6e3dcb2a24452977b4d',
    description: 'Bengali Description',
    songs: reveredSong.filter(song => song.language === EnumLanguages.Bengali),
  },
  {
    id:4,
    name: 'English',
    thumbnail: 'https://www.shutterstock.com/image-vector/music-type-playlist-vector-cover-260nw-1757894120.jpg',
    description: 'English Description',
    songs: reveredSong.filter(song => song.language === EnumLanguages.English),
  },
  {
    id:8,
    name: 'Iswar\'s Playlist',
    thumbnail: 'https://s3.amazonaws.com/files.freshteam.com/production/70980/attachments/5015488217/medium/WhatsApp_Image_2023-12-25_at_18.35.23_62bfbe2c.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIARX2EI6XTZDMDKBLG%2F20250119%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250119T062951Z&X-Amz-Expires=604800&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQDJFRJ8shY8R%2Bg0qPAU7QltuHk4FERZa5rEa3pagpuawQIhAMeBB3XEiNSTVWzoLo2V4ZNMB5I1%2FIsrGFmmrSW39MfzKrgFCIb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQBRoMMTE5ODY1NDA2OTUxIgx8ubOd8VaSLzsRiHAqjAXXgtiGaLnBEAeLPV7jVbBc9HHvrPxDQoHO4hemNQyHYq3WEjYCFwdbNqm1oq%2FH7pwxJpVN7ZOo0Zz%2BCaLpRc0u5OSvesmFcdJne0fcV1WRIEYFr8jp18EWJ7CbhUPYGbDeiSXJLTs8rhqsvKcSt7tvELXFpwLDIUiniWmdilMELdUbQYI%2BGvOdiJHlZBZcdLPvWOMAtVlqQEQfA9I87VuCWVqCNodDIZ4%2BM7HhW5HvOx7nVg268bnj3PzKAcwKblfPq1heir5fCmnlrYAvKrYirR1EGeatOglRnV0kJKHVCW6UtxlP0hS2eDhh0ctuXnzykmjL70Zf2nhWfXA87%2FsP5JXUAS%2FIpjLhEpLVVH6T3roM3Og3%2BTlzgWUtMYxpmJfAkaGkYcdH0uiWkuM6zFaY97%2FnS74T4b4lHUVZWuG8IPuO%2F5cAztokfwiwj8jgPqIaEst01FypUNsrrQ3BK08SFLoLjeeGXHNmBN8awZ31yJFNlWMBteVyILuYEb4wYNTDdHx73OCSwwhurzsHxvdD9%2FznoPd0JAvRHvn9MvTrgFrN2f9IhSKEahnd1UKOBvQ8I6andf2yTQcHdEpWizRkJ2x2uiQo7%2BCFCcO7NGmKTy4WoUeuq2kvvhZL%2FtmjCev49HaS3Haa7cppupvhnkm3OAdc4Gs7ZkN2C%2FDfgINMnNH4OfWemmHuFG1%2F9WGItN1AWEis1e7I3woYcLB6vG49NW0APrezt1wvZ3VhI8MQSlTQMOO%2FkBB1IcfNrVLyBItcWOK%2FPOMvGO1Hk1xASt2BIAk4b4ZLCJcFaaQxJpnsjvD020iTE03V7gBSJO98zN3z%2B9m%2FWCQyF9d64DsDMPcqvDyL1vOua8I0J%2FGQMOaTsrwGOrABuU6dUOV7mCyTX6Jqd6W8mV5WDTYufWXBEdumlJ5gwGDaSRCv5eKxyXebDTwMXa59mxJC3ofTWTKEAz7enNdYseKT%2F7vJEf8N0KDObK99RX5W2j8VHusJjKtyAI7lWNZOmvQSbUIIt6Dkv97b3DILknMoE3hEAGCiAZ7JwS9F8ovBrpEvTC8mCgDhrhJSRR9QN4AoP9p3XluijL04m%2BdF1o11arEFy5%2BUbTEb%2FENOkEE%3D&X-Amz-SignedHeaders=host&X-Amz-Signature=eaf1c323b8884565fb26175555d7fde18e687803e14a61a3271e24c36d54fb57',
    description: 'Iswar song Description',
    songs: iswar_song_details.reverse() as Song[],
  },
  {
    id: 100,
    name: 'Others',
    thumbnail: 'https://static1.anpoimages.com/wordpress/wp-content/uploads/2022/10/spotify-common-issues-feature.jpg',
    description: 'Others Description',
    songs: reveredSong.filter(song => !song.language),
  }
];
