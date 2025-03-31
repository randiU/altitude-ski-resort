// import { defineConfig } from 'vite';

// export default defineConfig({
//   // Set the base to "/" for both local and production (since no need for subpath like GitHub Pages)
//   base: '/', 

//   build: {
//     rollupOptions: {
//       input: {
//         main: './index.html',          // Main page
//         activities: './pages/activities.html',  // Activities page
//         weather: './pages/weather.html',       // Weather page
//         passes: './pages/passes.html',         // Passes page
//         lessons: './pages/lessons.html',       // Lessons page
//       }
//     }
//   },

//   server: {
//     // For local dev, base stays "/"
//     base: '/',
//   }

// });

import { defineConfig } from 'vite';

export default defineConfig({
  base: '/', 
  build: {
    rollupOptions: {
      input: {
        main: './index.html',          
        activities: './pages/activities.html',  
        weather: './pages/weather.html',       
        passes: './pages/passes.html',        
        lessons: './pages/lessons.html', 
      }
    }
  },

  server: {
    base: '/', 
  }
});
