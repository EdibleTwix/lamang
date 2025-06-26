fetch('spots.json')
  .then(response => response.json())
  .then(spots => {
    const markerLayer = document.getElementById('marker-layer');

    spots.forEach(spot => {
      const marker = document.createElement('div');
      marker.className = 'marker';
      marker.style.top = spot.top;
      marker.style.left = spot.left;
      marker.setAttribute('data-name', spot.name);
      marker.setAttribute('data-info', spot.info);
      marker.setAttribute('data-imgs', spot.images.join(','));

      const icon = document.createElement('img');
      icon.src = 'images/marker.svg';
      icon.alt = 'Marker';
      icon.className = 'marker-icon';
      marker.appendChild(icon);

      markerLayer.appendChild(marker);
    });

    document.querySelectorAll('.marker').forEach(marker => {
      marker.addEventListener('click', () => {
        const name = marker.getAttribute('data-name');
        const info = marker.getAttribute('data-info');
        const imgList = marker.getAttribute('data-imgs')?.split(',') || [];

        document.getElementById('spot-name').textContent = name;
        document.getElementById('spot-info').textContent = info;

        const spotImages = document.getElementById('spot-images');
        spotImages.innerHTML = '';

        imgList.forEach(src => {
          const img = document.createElement('img');
          img.src = src.trim();
          img.className = 'preview-img';
          spotImages.appendChild(img);
        });
      });
    });
  });
