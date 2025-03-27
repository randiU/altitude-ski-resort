// const base = import.meta.env.BASE_URL || '/';
// console.log('Base URL:', base); // ✅ Test log

// document.querySelectorAll('#nav-links a').forEach(link => {
//   const page = link.getAttribute('data-page');
//   console.log('Found nav item:', page); // ✅ Test log
//   if (page) {
//     const finalHref = `${base}${page}`;
//     link.setAttribute('href', finalHref);
//     console.log(`Set href to: ${finalHref}`);
//   }
// });


//Fix for githug pages update
document.addEventListener('DOMContentLoaded', () => {
    // Dynamically set the base path for local development and GitHub Pages
    const base = import.meta.env.BASE_URL || '/';  // If BASE_URL is set (from vite), use it, otherwise use '/'
    console.log('Base URL:', base); // ✅ Check if the base URL is correct
  
    // Select all the links in the navigation
    document.querySelectorAll('#nav-links a').forEach(link => {
      const page = link.getAttribute('data-page');
      console.log('Found nav item:', page); // ✅ Check which pages are being found
  
      // If the page attribute is found, update the href
      if (page) {
        const finalHref = `${base}${page}`;
        link.setAttribute('href', finalHref);  // Set the new href for the link
        console.log(`Set href to: ${finalHref}`); // ✅ Log the href update
      }
    });
  });
  