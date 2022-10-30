module.exports = {
  moduleFileExtensions: [
    "js",
    "json",
    "vue"
  ],
  setupFiles: [
    "<rootDir>/tests/setup"
  ],
  transform: {
    ".*\\.(js)$": "babel-jest"
  },
  preset: "@vue/cli-plugin-unit-jest",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^vuetify/lib$": "vuetify"
  }
}