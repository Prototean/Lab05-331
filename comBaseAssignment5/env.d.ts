/// <reference types="vite/client" />
/// <reference types="vue-media-upload" />

declare module '@jamescoyle/vue-icon' {
  import type { DefineComponent } from 'vue'
  const SvgIcon: DefineComponent<{
    type?: string
    path: string
    size?: string | number
    viewbox?: string
    flip?: 'horizontal' | 'vertical' | 'both' | 'none'
    rotate?: number | string
  }>
  export default SvgIcon
}
