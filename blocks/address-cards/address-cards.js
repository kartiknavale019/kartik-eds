export default async function decorate(block) {
  const jsonUrl = '/blocks/address-cards/_address-cards.json'; 
  
  try {
    const resp = await fetch(jsonUrl);
    const data = await resp.json();
    
    block.textContent = '';
    
    data.forEach((row) => {
      const card = document.createElement('div');
      card.className = 'address-card';
      
      const encodedAddress = encodeURIComponent(row.Address);
      
      //Google map url
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
      
      card.innerHTML = `
        <h3>${row.Title}</h3>
        <p>${row.Address}</p>
        <a href="${googleMapsUrl}" class="button" target="_blank" rel="noopener noreferrer">${row.LinkText}</a>
      `;
      
      block.append(card);
    });
  } catch (error) {
    console.error('Failed to load addresses:', error);
  }
}