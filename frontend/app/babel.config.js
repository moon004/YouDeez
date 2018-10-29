module.exports = {

  env: {
    development: {
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
      ],
      plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-object-rest-spread',
      ],
    },
    test: {
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
      ],
      plugins: [
        '@babel/plugin-proposal-class-properties',
      ],
    },
  },
};
