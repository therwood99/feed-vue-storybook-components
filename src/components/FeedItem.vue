<template>
    <div class="feedcard">
        <div class="row">
            <div class="avatar"><img :src=this.avatar /></div>
            <div class="row-text">
                <div class="author">{{ feeditem.user_display_name }}</div>
                <div class="date">{{ timeago }}</div>
            </div>
        </div>
        <div class="media">
            <img class="image" :src=this.media />
        </div>
        <div class="kicker">{{ this.kicker }}</div>
        <div class="title">{{ feeditem.primary_com_name }}</div>
        <div class="comment-wrapper">
            <div class="comment">{{ feeditem.loc_name }}</div>
        </div>
        <div class="social">
            <div class="social-likes">
                <img class="social-icon" src="likes-icon.png" width="20" />
                <div class="social-count">0</div>
            </div>
            <div class="social-comments">
                <img class="social-icon" src="comments-icon.png" width="20" />
                <div class="social-count">0</div>
            </div>
        </div>
    </div>
</template>
<script>
import moment from 'moment';
export default {
    name: "FeedItem",
    props: {
        feeditem: {
            type: Object,
            required: true,
            default: () => ({ item_id: "", user_display_name: "", item_dt: new Date(), asset_id: 0, item_type: "", primary_com_name: "", loc_name: "" }),
            validator: (feeditem) => ["item_id", "user_display_name", "item_dt", "asset_id", "item_type", "primary_com_name", "loc_name"].every((key) => key in feeditem),
        },
        avatar: {
            type: String,
            required: false,
            default: () => ('profile-image-loading.png')
        }
    },
    computed: {
        media() {
            if (this.feeditem.item_type == 'sub') {
                return 'submission-media.png'
            } else {
                return `https://cdn.download.ams.birds.cornell.edu/api/v1/asset/${this.feeditem.asset_id}/2400`;
            }
        },
        timeago() {
            return moment(this.feeditem.item_dt).fromNow();
        },
        kicker() {
            if (this.feeditem.item_type == 'species_trend') {
                return 'Migration Alert';
            }
            else if (this.feeditem.item_type == 'asset') {
                return 'Recently Uploaded Media';
            }
            else if (this.feeditem.item_type == 'sub') {
                return 'Checklist Submission'
            }
            else if (this.feeditem.item_type == 'obs') {
                return 'Notable Observation'
            }
        }
    }
};
</script>