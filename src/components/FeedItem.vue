<template>
    <div class="feedcard">
        <div class="row">
            <div class="avatar"><img :src=this.avatar /></div>
            <div class="row-text">
                <div class="author">{{ this.author }}</div>
                <div class="date">{{ timeago }}</div>
            </div>
        </div>
        <div class="media">
            <img class="image" :src=this.media />
        </div>
        <div class="kicker">{{ this.kicker }}</div>
        <div class="title">{{ feeditem.primary_com_name }}</div>
        <div class="comment-wrapper">
            <div class="comment">{{ this.comment }}</div>
        </div>
        <div class="social">
            <div class="social-likes">
                <div v-if="unliked" @click="unliked = !unliked & likes++"><img class="social-icon" src="likes-icon.png" width="20" /></div>
                <div v-else @click="unliked = !unliked & likes--"><img class="social-icon" src="liked-icon.png" width="20" /></div>
                <div class="social-count">{{likes}}</div>
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
            default: () => ({ item_id: "", user_display_name: "", item_dt: new Date(), asset_id: 0, item_type: "", primary_com_name: "", loc_name: "", region: "", item_text: "", description: "" }),
            validator: (feeditem) => ["item_id", "user_display_name", "item_dt", "asset_id", "item_type", "primary_com_name", "loc_name", "region", "item_text", "description"].every((key) => key in feeditem),
        }
    },
    data() {
        return {
            unliked: true,
            likes: 0,
        };
    },
    computed: {
        media() {
            if (this.feeditem.item_type == 'sub') {
                return 'submission-media.png';
            } else {
                return `https://cdn.download.ams.birds.cornell.edu/api/v1/asset/${this.feeditem.asset_id}/2400`;
            }
        },
        timeago() {
            if (this.feeditem.item_type == 'article') {
                return '';
            } else {
                return moment(this.feeditem.item_dt).fromNow();
            }
        },
        kicker() {
            if (this.feeditem.item_type == 'species_trend') {
                return `Migration Alert -- ${this.feeditem.description}`;
            } else if (this.feeditem.item_type == 'asset') {
                return `Recently Uploaded Media -- ${Number(this.feeditem.description)} stars`;
            } else if (this.feeditem.item_type == 'sub') {
                return `Checklist Submission -- ${this.feeditem.description}`;
            } else if (this.feeditem.item_type == 'obs') {
                return `Notable Observation -- ${this.feeditem.description}`;
            } else if (this.feeditem.item_type == 'article') {
                return 'Fun Fact';
            };
        },
        author() {
            if (this.feeditem.item_type == 'species_trend' || this.feeditem.item_type == 'article') {
                return 'Merlin';
            } else {
                return (this.feeditem.user_display_name == null) ? ('Anonymous eBirder') : (this.feeditem.user_display_name);
            };
        },
        avatar() {
            if (this.feeditem.item_type == 'species_trend' || this.feeditem.item_type == 'article') {
                return 'lab-logo.png';
            } else if (this.feeditem.user_display_name == null) {
                return 'profile-image-loading.png';
            } else {
                return `https://ui-avatars.com/api/?name=${(this.feeditem.user_display_name).replace(/\s/g, '+')}`;
            };
        },
        comment() {
            if (this.feeditem.item_type == 'species_trend' || this.feeditem.item_type == 'article') {
                return this.feeditem.item_text;
            } else if (this.feeditem.region == null) {
                return this.feeditem.loc_name;
            } else {
                return `${this.feeditem.loc_name}, ${this.feeditem.region}`;
            };
        }
    }
};
</script>