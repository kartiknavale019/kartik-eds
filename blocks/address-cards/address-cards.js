export default function decorate(block) {
  let title = '';
  let address = '';
  let linkText = 'Get Directions';

  if (block.children.length > 0) {
    const row = block.children[0];
    if (row.children.length >= 3) {
      title = row.children[0].textContent.trim();
      address = row.children[1].textContent.trim();
      linkText = row.children[2].textContent.trim();
    } else if (block.children.length >= 3) {
      title = block.children[0].textContent.trim();
      address = block.children[1].textContent.trim();
      linkText = block.children[2].textContent.trim();
    }
  }

  block.textContent = ''; 
  const encodedAddress = encodeURIComponent(address);
  
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  const card = document.createElement('div');
  card.className = 'address-card';
  
  card.innerHTML = `
    <h3>${title}</h3>
    <p>${address}</p>
    <a href="${googleMapsUrl}" class="button" target="_blank" rel="noopener noreferrer">${linkText}</a>
  `;
  
  block.append(card);
}