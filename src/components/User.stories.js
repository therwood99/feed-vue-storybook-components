import User from './User.vue';

export default {
  component: User,
  title: 'User',
};

const Template = args => ({
  components: { User },
  setup() {
    return { args };
  },
  template: '<User v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
    user: {
    username: "",
    user_id: 0,
    apikey: "",
  }
};