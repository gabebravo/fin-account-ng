const extendedSpacing = {};
for (let i = 30; i <= 100; i += 2) {
  extendedSpacing[`${i * 4}`] = `${i}rem`;
}

module.exports = {
  content: ["./src/**/*.{html,js,ts}"],
  theme: {
    extend: {
      spacing: extendedSpacing
    },
  },
  plugins: [],
}
