import type { CSSProperties } from 'vue'

export interface IMarker {
  name: string
  coords: number[]
}

export const defaultMapParams = {
  selector: '#map',
  map: 'world_merc',
  backgroundColor: '#DCF2F1',
  zoomButtons: false,
  zoomMax: 20,
  regionStyle: {
    initial: {
      fill: '#FFF7F1',
      stroke: '#A87C7C',
      strokeWidth: 0.25
    },
    hover: { fill: '#FFDD95' },
    selected: { fill: '#9DBC98' },
    selectedHover: { fill: '#9DBC98' }
  },
  onRegionTooltipShow(_: Event, tooltip: { css: (styles: CSSProperties) => void }) {
    tooltip.css({ opacity: '1', backgroundColor: '#4F6F52' })
  },
  onMarkerTooltipShow(_: Event, tooltip: { css: (styles: CSSProperties) => void }) {
    tooltip.css({ opacity: '0' })
  },
  markerStyle: {
    initial: {
      image: 'pin4.png'
    }
  },
  labels: {
    markers: {
      render(marker: IMarker) {
        return marker.name
      }
    }
  },
  markerLabelStyle: {
    initial: {
      fontFamily: 'Protest Riot, sans-serif',
      fontSize: 16,
      fill: '#3C3633'
    },
    hover: {
      fill: '#AF2655'
    }
  },
  focusOn: {
    region: '',
    animate: true
  },
  lineStyle: {
    stroke: '#201658',
    strokeWidth: 2,
    fillOpacity: 0.8,
    strokeDasharray: '6 3 6',
    animation: true
  }
}
