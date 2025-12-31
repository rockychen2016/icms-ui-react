module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{ts,tsx,js,jsx}',
    // also scan the repo root src so library component classes are picked up
    '../src/**/*.{ts,tsx,js,jsx}'
  ],
  theme: {
    extend: {}
  },
  plugins: []
}
