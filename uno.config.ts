import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetAttributify(),
  ],
  rules: [
    ['flex-center', { 'display': 'flex', 'align-items': 'center', 'justify-content': 'center' }],
  ],
})
