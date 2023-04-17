import FeedItem from './FeedItem.vue';

export default {
  component: FeedItem,
  title: 'FeedItem',
};

const Template = args => ({
  components: { FeedItem },
  setup() {
    return { args };
  },
  template: '<FeedItem v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  feeditem: {
    feed_id: "1",
    user_display_name: 'First Last',
    item_dt: new Date(),
    asset_id: 0,
    item_type: 'Kicker',
    primary_com_name: 'Title',
    loc_name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    region: 'More lorem ipsum',
    item_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    description: "Description",
  }
};