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
  apiurl: 'https://eubezqwowmaahphqywys.supabase.co/rest/v1/rpc/get_feed?p_user_id=1&apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1YmV6cXdvd21hYWhwaHF5d3lzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgyMDIxNTAsImV4cCI6MTk5Mzc3ODE1MH0.TBXYiMPSBsKp9S0Yqrfvn4xuJZutQ6w5bmvajVlGuAs',
  loading: false,
};

export const Loading = Template.bind({});
Loading.args = {
  apiurl: '',
  loading: true,
};