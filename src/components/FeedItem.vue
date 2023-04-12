<template>
    <div class="feedcard">
        <div class="row">
            <div class="avatar"><img :src=this.feeditem.avatar /></div>
            <div class="row-text">
                <div class="author">{{ feeditem.author }}</div>
                <div class="date">{{ feeditem.timeago }}</div>
            </div>
        </div>
        <div class="media">
            <img class="image" :src=this.feeditem.media />
        </div>
        <div class="kicker">{{ feeditem.kicker }}</div>
        <div class="title">{{ feeditem.title }}</div>
        <div class="comment-wrapper">
            <div class="comment">{{ feeditem.comment }}</div>
        </div>
        <div class="social">
            <div class="social-likes">
                <img class="social-icon" src="likes-icon.png" width="20" />
                <div class="social-count">{{ feeditem.numlikes }}</div>
            </div>
            <div class="social-comments">
                <img class="social-icon" src="comments-icon.png" width="20" />
                <div class="social-count">{{ feeditem.numcomments }}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "FeedItem",
    props: {
        feeditem: {
            type: Object,
            required: true,
            default: () => ({ id: 0, avatar: "", author: "", timeago: "", media: "", kicker: "", title: "", comment: "", isliked: false, numlikes: 0, numcomments: 0 }),
            validator: (feeditem) => ["id", "avatar", "author", "timeago", "media", "kicker", "title", "comment", "isliked", "numlikes", "numcomments"].every((key) => key in feeditem),
        },
    },
};
</script>