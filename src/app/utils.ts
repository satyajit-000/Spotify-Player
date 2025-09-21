import { Song } from "./interfaces/songs";

export function getRandomIntegerInRange(min: number, max = 0): number {
  if (min > max) {
    [min, max] = [max, min]
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


export function downloadSong(songUrl: string): void {
  const fileName = songUrl.split('/').pop(); // Extract file name from URL
  const anchor = document.createElement('a');
  anchor.href = songUrl;
  anchor.download = fileName || 'download'; // Use extracted name or fallback
  anchor.click();
  anchor.remove();
}

export function retriveSource(sourceUrl: string): string {
  return sourceUrl.trim().split('/').filter((item: string) => item.includes('.')).join('');
}

export function scrollToCard(id: string) {
  
  const card = document.getElementById(id);
  setTimeout(() => {
    card?.scrollIntoView({ behavior: 'smooth' })
  }, 500);
}

export async function initFavorite(songs:Song[]) {
  const favoriteList = await JSON.parse(localStorage.getItem('favoriteList') || '[]');
  songs.forEach((song:Song, index:number) => {
    song.isFavorite = favoriteList[index];
  })
}

export function convertDuration(duration: string): number {
  if (!duration || duration === '') return 0;
  const parts = duration.split(':').map(Number);
  return parts.length === 2 ? parts[0] * 60 + parts[1] : 0;
}
