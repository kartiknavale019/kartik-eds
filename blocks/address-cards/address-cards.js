export default function decorate(block) {
  // Clear out any default empty HTML AEM generates for this block
  block.textContent = ''; 

  // 1. Hardcoded static data (you will replace this with real data later)
  const tempAddresses = [
    {
      Title: "Pune Office",
      Address: "Aundh, Pune, Maharashtra",
      LinkText: "Get Directions"
    }
  ];

  // 2. Loop through our static data and build the cards
  tempAddresses.forEach((row) => {
    const card = document.createElement('div');
    card.className = 'address-card';
    
    // Encode the address for the URL
    const encodedAddress = encodeURIComponent(row.Address);
    
    // Build the official Google Maps search URL
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    
    // Inject the HTML layout
    card.innerHTML = `
      <h3>${row.Title}</h3>
      <p>${row.Address}</p>
      <a href="${googleMapsUrl}" class="button" target="_blank" rel="noopener noreferrer">${row.LinkText}</a>
    `;
    
    block.append(card);
  });
}