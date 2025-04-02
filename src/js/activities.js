// const activitiesJson = '/json/activities.json';
const activitiesJson = `${import.meta.env.BASE_URL}json/activities.json`;

fetch(activitiesJson)
  .then(response => response.json())
  .then(data => {
    const activitySection = document.getElementById('activity-section');
    
    data.forEach(activity => {
      const card = document.createElement('div');
      card.classList.add('activity-card');
      
      card.innerHTML = `
        <img src="${activity.image}" alt="${activity.name}">
        <h3>${activity.name}</h3>
        <p>${activity.description}</p>
      `;

      activitySection.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Error loading the activities data:', error);
  });