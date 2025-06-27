fetch('spots.json')
  .then(response => response.json())
  .then(spots => {
    const mapImage = document.getElementById('map-image');
    const markerLayer = document.getElementById('marker-layer');

    function placeMarkers() {
      markerLayer.innerHTML = '';

      const rect = mapImage.getBoundingClientRect();

      spots.forEach(spot => {
        const marker = document.createElement('div');
        marker.className = 'marker';

        const x = (spot.xPercent / 100) * rect.width;
        const y = (spot.yPercent / 100) * rect.height;

        marker.style.left = `${x}px`;
        marker.style.top = `${y}px`;

        marker.setAttribute('data-name', spot.name);
        marker.setAttribute('data-info', spot.info);
        marker.setAttribute('data-sections', JSON.stringify(spot.sections));

        const icon = document.createElement('img');
        icon.src = 'images/marker.svg';
        icon.alt = 'Marker';
        icon.className = 'marker-icon';
        marker.appendChild(icon);

        markerLayer.appendChild(marker);
      });

      bindMarkerClicks();

      const targetSpotName = "Pha Lang Airfield";
      const targetMarker = Array.from(document.querySelectorAll('.marker')).find(marker => marker.getAttribute('data-name') === targetSpotName);

      if (targetMarker) {
        setTimeout(() => {
          targetMarker.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }, 100);
      }
    }

    function bindMarkerClicks() {
      document.querySelectorAll('.marker').forEach(marker => {
        marker.addEventListener('click', () => {
          const name = marker.getAttribute('data-name');
          const info = marker.getAttribute('data-info');
          const sections = JSON.parse(marker.getAttribute('data-sections'));

          document.getElementById('spot-name').textContent = name;
          document.getElementById('spot-info').textContent = info;

          const tabs = document.getElementById('tabs');
          const spotImages = document.getElementById('spot-images');
          tabs.innerHTML = '';
          spotImages.innerHTML = '';

          sections.forEach((section, index) => {
            const tab = document.createElement('button');
            tab.className = 'tab-button';
            tab.textContent = section.label;
            if (index === 0) tab.classList.add('active');

            tab.addEventListener('click', () => {
              document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
              tab.classList.add('active');
              spotImages.innerHTML = '';
              section.images.forEach(src => {
                const img = document.createElement('img');
                img.src = src;
                img.className = 'preview-img';
                spotImages.appendChild(img);
              });
            });

            tabs.appendChild(tab);
          });

          sections[0].images.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.className = 'preview-img';
            spotImages.appendChild(img);
          });
        });
      });
    }

    window.addEventListener('resize', placeMarkers);
    mapImage.addEventListener('load', placeMarkers);
    if (mapImage.complete) placeMarkers();
  });
