
import { RecognitionResult } from '@/types/image';

// Category mapping for automatic categorization
export const categoryMapping: Record<string, string> = {

  "ai": "Technology",
  "airplane": "Vehicles",
  "anniversary": "Celebrations",
  "ant": "Animals",
  "app": "Technology",
  "architecture": "Design",
  "artwork": "Art",
  "autumn": "Season",
  "backup": "Misc",
  "baseball": "Sports",
  "basketball": "Sports",
  "beach": "Nature",
  "bee": "Animals",
  "bicycle": "Vehicles",
  "bird": "Animals",
  "birthday": "Celebrations",
  "boat": "Vehicles",
  "book": "Education",
  "branding": "Work",
  "breakfast": "Food",
  "bridge": "Architecture",
  "butterfly": "Animals",
  "cake": "Food",
  "camera": "Technology",
  "camping": "Outdoor Activities",
  "campus": "Education",
  "candid shot": "People",
  "candid": "People",
  "canoe": "Vehicles",
  "car": "Vehicles",
  "carnival": "Holiday",
  "castle": "Historical",
  "cat": "Animals",
  "chicken": "Animals",
  "chinese new year": "Holiday",
  "chinese": "Food",
  "christmas": "Holiday",
  "city": "Travel",
  "classroom": "Education",
  "cloud": "Weather",
  "cocktail": "Food",
  "coffee": "Food",
  "color": "Misc",
  "conference": "Education",
  "coral reef": "Marine Life",
  "country": "Travel",
  "cow": "Animals",
  "coworker": "Work",
  "cycling": "Sports",
  "dance": "Performing Art",
  "desert": "Nature",
  "design": "Work",
  "desk": "Work",
  "dinner": "Food",
  "diwali": "Holiday",
  "diy project": "Craft",
  "doctor": "Health",
  "dog": "Animals",
  "dolphin": "Animals",
  "drawing": "Education",
  "drone": "Technology",
  "easter": "Holiday",
  "eiffel tower": "Landmark",
  "elephant": "Animals",
  "event": "People",
  "experiment": "Education",
  "fair": "Entertainment",
  "family gathering": "People",
  "family": "People",
  "fashion": "Fashion",
  "festival": "Culture",
  "fish": "Animals",
  "flower": "Plants",
  "fog": "Weather",
  "food": "Culture",
  "forest": "Nature",
  "funny image": "Misc",
  "gallery": "Art",
  "gameplay": "Entertainment", // Renamed from 'game' as it was duplicate
  "garden": "Plants",
  "golf": "Sports",
  "graduation": "Celebrations",
  "group photo": "People",
  "group": "People",
  "gym workout": "Fitness", // Fixed typo (was "Fitnes")
  "gym": "Health",
  "halloween": "Holiday",
  "handmade item": "Craft",
  "headshot": "People",
  "healthy meal": "Health",
  "helicopters": "Vehicles",
  "hiking": "Outdoor Activities",
  "home decor": "Design",
  "home office": "Work",
  "horse": "Animals",
  "hospital": "Health",
  "house": "Architecture",
  "ice cream": "Food",
  "independence day": "Holiday",
  "indian": "Food",
  "individual portrait": "People",
  "ingredient": "Food",
  "insect": "Animals",
  "internet culture": "Misc",
  "italian": "Food",
  "kitchen scene": "Food",
  "lab": "Education",
  "landmark": "Travel",
  "laptop": "Technology",
  "librarie": "Education",
  "lightning": "Weather",
  "lion": "Animals",
  "live performance": "Entertainment",
  "local event": "Entertainment",
  "local tradition": "Culture",
  "locomotive": "Vehicles",
  "lunch": "Food",
  "map": "Travel",
  "marathon": "Sports",
  "marine life": "Animals",
  "meditation": "Health",
  "meeting": "Work",
  "motivational image": "Misc",
  "motorcycle": "Vehicles",
  "mountain": "Nature",
  "mural": "Art",
  "music festival": "Entertainment",
  "music": "Performing Art",
  "nature photography": "Photography",
  "note": "Education",
  "office": "Design",
  "oktoberfest": "Holiday",
  "old photo": "Misc",
  "outing": "People",
  "painting": "Education",
  "parade": "Entertainment",
  "pastrie": "Food",
  "pattern": "Misc",
  "plant": "Plants",
  "portrait": "Photography",
  "postcard": "Travel",
  "presentation": "Work",
  "product": "Work",
  "professional headshot": "People",
  "prototype": "Work",
  "quote": "Misc",
  "race": "Sports",
  "rain": "Weather",
  "recipe": "Food",
  "relaxation": "Health",
  "research": "Education",
  "restaurant": "Design",
  "road trip": "Outdoor Activities",
  "robot": "Technology",
  "ruin": "Historical",
  "running": "Fitness",
  "sailboat": "Vehicles",
  "sculpting": "Education",
  "seminar": "Education",
  "shark": "Marine Life",
  "skier": "Sports",
  "skiing": "Sports",
  "skincare": "Health",
  "skyscraper": "Architecture",
  "smart home device": "Technology",
  "smartphone": "Technology",
  "smoothie": "Food",
  "snow": "Weather",
  "soccer": "Sports",
  "spa": "Health",
  "speaker": "Technology",
  "spring": "Season",
  "startup": "Work",
  "statue of liberty": "Landmark",
  "storm": "Weather",
  "street photography": "Photography",
  "study session": "Education",
  "subway transport": "Vehicles", // Renamed to avoid duplicate
  "summer": "Season",
  "sunrise": "Nature",
  "sunset": "Nature",
  "supplement": "Health",
  "swimming": "Sports",
  "taj mahal": "Landmark",
  "tea": "Food",
  "temple": "Historical",
  "texture": "Misc",
  "thanksgiving": "Holiday",
  "theater": "Performing Art",
  "therapy": "Health",
  "ticket": "Travel",
  "tournament_event": "Sports", // Renamed to avoid duplicate
  "train": "Vehicles",
  "training": "Education",
  "tram": "Vehicles",
  "treatment": "Health",
  "tree": "Plants",
  "tv": "Technology",
  "unclassified": "Misc",
  "unique photo": "Misc",
  "valentine's day": "Holiday",
  "virtual meeting": "Work",
  "waterfall": "Nature",
  "website": "Technology",
  "wedding": "Celebrations",
  "wellness routine": "Health",
  "wild animal": "Animals",
  "winter": "Season",
  "yacht": "Vehicles",
  "yoga": "Fitness"
};

/**
 * Determines the most appropriate category based on recognition results
 */
export const determineCategory = (results: RecognitionResult[]): string => {
  if (!results || results.length === 0) return "Uncategorized";
  
  // Check each result label against our mapping
  for (const result of results) {
    const label = result.label.toLowerCase();
    
    // Direct match with keys in the mapping
    if (categoryMapping[label]) {
      return categoryMapping[label];
    }
    
    // Check if any key in the mapping is contained within the label
    for (const [key, category] of Object.entries(categoryMapping)) {
      if (label.includes(key)) {
        return category;
      }
    }
    
    // Check if any word in the label matches a key in the mapping
    const words = label.split(/\s+/);
    for (const word of words) {
      if (categoryMapping[word]) {
        return categoryMapping[word];
      }
    }
  }
  
  // Default category if no matches found
  return "Uncategorized";
};
