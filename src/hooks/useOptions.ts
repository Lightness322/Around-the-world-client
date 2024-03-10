export function useOptions() {
  const options = {
    selector: '#map',
    map: 'world_merc',
    backgroundColor: '#DCF2F1',
    zoomButtons: false,
    zoomMax: 20,
    regionStyle: {
      initial: {
        fill: '#fff',
        stroke: '#76453B',
        strokeWidth: 0.4
      },
      selected: { fill: '#9DBC98' },
      selectedHover: { fill: '#AAD9BB' }
    },
    selectedRegions: ['RU', 'GB', 'DE'],
    markerStyle: {
      initial: {
        image: 'pin2.svg'
      }
    },
    markers: [
      { name: 'Cairo', coords: [26.8206, 30.8025] },
      { name: 'Moscow', coords: [55.7558, 37.6178] },
      { name: 'Saint Petersburg', coords: [59.95, 30.3167] },
      { name: 'Yekaterinburg', coords: [56.8356, 60.6128] },
      { name: 'London', coords: [51.5072, -0.1275] },
      { name: 'Birmingham', coords: [52.48, -1.9025] },
      { name: 'Liverpool', coords: [53.4, -2.9833] },
      { name: 'Manchester', coords: [53.4794, -2.2453] }
    ],
    labels: {
      markers: {
        render(marker) {
          return marker.name
        }
      }
    },
    markerLabelStyle: {
      initial: {
        fontFamily: "'Inter', sans-serif",
        fontSize: 14,
        fontWeight: 600,
        fill: '#35373e'
      },
      // You can control the hover and selected state for labels as well.
      hover: {
        fill: 'red'
      },
      selected: {
        fill: 'blue'
      }
    }
    // focusOn: {
    //   region: 'GB',
    //   animate: true
    // }
  }

  return options
}
