// @flow

import { GridLayer as LeafletGridLayer } from 'leaflet'

import MapLayer from './MapLayer'
import type { GridLayerProps } from './types'

export default class GridLayer<
  LeafletElement: LeafletGridLayer,
  Props: GridLayerProps,
> extends MapLayer<LeafletElement, Props> {
  createLeafletElement(props: Props): LeafletElement {
    return new LeafletGridLayer(this.getOptions(props))
  }

  updateLeafletElement(fromProps: Props, toProps: Props) {
    const { opacity, zIndex } = toProps
    if (opacity !== fromProps.opacity) {
      this.leafletElement.setOpacity(opacity)
    }
    if (zIndex !== fromProps.zIndex) {
      this.leafletElement.setZIndex(zIndex)
    }
  }

  getOptions(props: Props): Props {
    const options = super.getOptions(props)
    const { map } = props.leaflet
    if (map != null) {
      if (options.maxZoom == null && map.options.maxZoom != null) {
        options.maxZoom = map.options.maxZoom
      }
      if (options.minZoom == null && map.options.minZoom != null) {
        options.minZoom = map.options.minZoom
      }
    }
    return options
  }

  render() {
    return null
  }
}
