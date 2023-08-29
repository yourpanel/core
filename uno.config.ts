import { defineConfig, presetUno, presetIcons, presetAttributify } from 'unocss'

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
})