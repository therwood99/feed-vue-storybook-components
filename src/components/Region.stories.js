import Region from './Region.vue';

export default {
  component: Region,
  title: 'Region',
};

const Template = args => ({
  components: { Region },
  setup() {
    return { args };
  },
  template: '<Region v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
    region: {
    region_code: "",
    user_id: 0,
    apikey: "",
  }
};