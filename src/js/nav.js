
//Fix for githug pages update
document.addEventListener('DOMContentLoaded', () => {
    // Dynamically set the base path for local development and GitHub Pages
    const base = import.meta.env.BASE_URL || '/';  
    console.log('Base URL:', base); 
  
    // Select all the links in the navigation
    document.querySelectorAll('#nav-links a').forEach(link => {
      const page = link.getAttribute('data-page');
      console.log('Found nav item:', page); 
  
      // If the page attribute is found, update the href
      if (page) {
        const finalHref = `${base}${page}`;
        link.setAttribute('href', finalHref);  
        console.log(`Set href to: ${finalHref}`); 
      }
    });
  });
  