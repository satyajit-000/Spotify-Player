import { Song } from "../interfaces/songs";

export class Playlist { 
    id: string | number ;
    name: string;
    description: string | null = null;
    songs: Song[];
    thumbnail: string | null = null;

    constructor(id: string | number, name:string, songs:Song[]) {
        this.id = id;
        this.name = name;
        this.songs = songs;
    }
}