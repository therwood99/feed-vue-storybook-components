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
    id: 1,
    avatar: 'test-avatar.png',
    author: 'First Last',
    timeago: '0 mins ago',
    media: 'media-loading.gif',
    kicker: 'Kicker',
    title: 'Title',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at mauris a leo congue condimentum. Etiam auctor luctus ante in facilisis. Donec placerat mauris lacinia, mattis nulla et, molestie nunc. In hac habitasse platea dictumst. Aenean maximus lorem nec lectus euismod, ac egestas mauris dapibus. Pellentesque viverra in nibh eu malesuada. Etiam fermentum neque tincidunt dictum luctus. Praesent viverra dictum rutrum. Quisque tincidunt, velit et scelerisque dictum, orci mauris feugiat urna, gravida maximus arcu dolor nec tellus. Praesent malesuada diam ac massa ultricies elementum. Nunc ultricies, enim at fermentum ultrices, risus tellus tincidunt purus, a feugiat urna erat et libero. Aliquam consectetur orci ipsum.',
    isliked: false,
    numlikes: 0,
    numcomments: 0,
  },
};