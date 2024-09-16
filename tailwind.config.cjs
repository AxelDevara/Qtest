const config = {
  mode: 'jit',
  purge: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'system-ui'],
    },
    extend: {
      outline: {
        qubic: '1px solid black',
      },
    },
  },
};

module.exports = config;
