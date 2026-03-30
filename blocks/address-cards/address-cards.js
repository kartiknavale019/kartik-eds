export default function decorate(block) {
  // 1. Setup default variables
  let title = '';
  let address = '';
  let linkText = 'Get Directions';

  // 2. Read the dynamic data authored in Universal Editor
  // AEM Edge Delivery Services puts your authored fields inside nested divs
  if (block.children.length > 0) {
    // Check if the fields are rendered in a single row with columns
    const row = block.children[0];
    if (row.children.length >= 3) {
      title = row.children[0].textContent.trim();
      address = row.children[1].textContent.trim();
      linkText = row.children[2].textContent.trim();
    } else if (block.children.length >= 3) {
      // Fallback: If AEM rendered them as separate rows
      title = block.children[0].textContent.trim();
      address = block.children[1].textContent.trim();
      linkText = block.children[2].textContent.trim();
    }
  }

  // 3. Clear out the raw unstyled text from the screen
  block.textContent = ''; 

  // 4. Create the dynamically generated Google Maps URL
  // We use encodeURIComponent so spaces in the address become valid URL characters
  const encodedAddress = encodeURIComponent(address);
  
  // NOTE: Notice the ${encodedAddress} - this is what makes the link dynamic!
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  // 5. Build your styled card with the dynamic data
  const card = document.createElement('div');
  card.className = 'address-card';
  
  // Inject the HTML layout using your authored data
  card.innerHTML = `
    <h3>${title}</h3>
    <p>${address}</p>
    <a href="${googleMapsUrl}" class="button" target="_blank" rel="noopener noreferrer">${linkText}</a>
  `;
  
  block.append(card);
}