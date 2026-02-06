import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GALLERY_DIR = path.join(__dirname, 'public/images/gallery');
const OUTPUT_FILE = path.join(__dirname, 'src/data/galleryImages.ts');

// Date Ranges (Approximated based on Feb 20, 2026 Due Date)
// Conception: ~May 16, 2025
const DATES = {
    TRIMESTER_1_END: new Date('2025-08-08'), // 0-12 weeks
    TRIMESTER_2_END: new Date('2025-11-14'), // 13-26 weeks
    // Trimester 3 is until birth
};

function getImageDate(filePath) {
    try {
        // Try mdls first (MacOS metadata)
        const output = execSync(`mdls -name kMDItemContentCreationDate -raw "${filePath}"`, { encoding: 'utf8' }).trim();
        if (output && output !== '(null)') {
            return new Date(output);
        }
    } catch (e) {
        // Ignore and fallback
    }

    try {
        // Fallback to file creation time
        const stats = fs.statSync(filePath);
        return stats.birthtime; 
    } catch (e) {
        return new Date(0); // Unknown date
    }
}

const albums = {
    all: [],
    trimester1: [],
    trimester2: [],
    trimester3: [],
    newborn: [] 
};

// Get all images
const files = fs.readdirSync(GALLERY_DIR).filter(file => /\.(jpg|jpeg|png|heic)$/i.test(file));

console.log(`Scanning ${files.length} images...`);

files.forEach(file => {
    const filePath = path.join(GALLERY_DIR, file);
    const date = getImageDate(filePath);
    
    // Add to 'All'
    albums.all.push(file);

    // Sort into Trimesters
    // If year is 2026 before Feb 20, it's 3rd Trimester.
    if (date < new Date('2025-05-15')) {
         // Keep in All, do not categorize if too early (e.g. random old photos)
         // But let's assume if it is 2025 it belongs to earliest bucket
         if (date.getFullYear() >= 2025) albums.trimester1.push(file);
    } else if (date <= DATES.TRIMESTER_1_END) {
        albums.trimester1.push(file);
    } else if (date <= DATES.TRIMESTER_2_END) {
        albums.trimester2.push(file);
    } else {
        albums.trimester3.push(file);
    }
});

// Generate TypeScript Content
const content = `export interface Album {
  id: string;
  title: string;
  images: string[];
}

export const albums: Album[] = [
  {
    id: 'all',
    title: '全部照片',
    images: ${JSON.stringify(albums.all, null, 2)}
  },
  {
    id: 'trimester1',
    title: '第一孕期 (0-12w)',
    images: ${JSON.stringify(albums.trimester1, null, 2)}
  },
  {
    id: 'trimester2',
    title: '第二孕期 (13-26w)',
    images: ${JSON.stringify(albums.trimester2, null, 2)}
  },
  {
    id: 'trimester3',
    title: '第三孕期 (27w+)',
    images: ${JSON.stringify(albums.trimester3, null, 2)}
  }
];

export const galleryImages = albums[0].images;
`;

fs.writeFileSync(OUTPUT_FILE, content);
console.log('Gallery data generated successfully!');
