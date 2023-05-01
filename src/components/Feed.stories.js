import Feed from './Feed.vue';

export default {
  component: Feed,
  title: 'Feed',
};

const Template = args => ({
  components: { Feed },
  setup() {
    return { args };
  },
  template: '<Feed v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  apikey: '',
  user_id: 0,
  loading: false,
};

export const Loading = Template.bind({});
Loading.args = {
  apikey: '',
  user_id: 0,
  loading: true,
};