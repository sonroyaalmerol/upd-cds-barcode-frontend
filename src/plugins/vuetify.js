import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    dark: true,
    themes: {
      dark: {
        background: '#424242',
        primary: '#cf6679', // #E53935
        secondary: '#a8d0db', // #FFCDD2
        accent: colors.indigo.base, // #3F51B5
      },
      light: {
        background: '#fff',
        primary: '#cf6679', // #E53935
        secondary: '#a8d0db', // #FFCDD2
        accent: colors.indigo.base, // #3F51B5
      }
    },
  }
});
