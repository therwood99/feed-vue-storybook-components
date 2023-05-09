<template>
    <div class="feedcard">
        <div class="row">
            <div class="avatar"><img :src=this.avatar /></div>
            <div class="row-text">
                <div class="author">{{ this.author }}</div>
                <div class="date">{{ timeago }}</div>
            </div>
        </div>
        <div class="media" v-if="this.feeditem.item_type !== 'sub'">
            <img class="image" :src=this.media />
        </div>
        <div class="kicker">{{ this.kicker }}</div>
        <div class="title">{{ this.title }}</div>
        <div class="detail-wrapper">
            <div class="detail" v-html="this.detail"></div>
        </div>
        <div class="social">
            <div class="social-likes">
                <div v-if="!this.feeditem.liked_by_user" @click="likeItem">
                    <img class="social-icon" src="likes-icon.png" width="20" />
                </div>
                <div v-else @click="unlikeItem">
                    <img class="social-icon" src="liked-icon.png" width="20" />
                </div>
                <div class="social-count">{{ this.feeditem.like_count }}</div>
            </div>
            <div class="social-comments">
                <img class="social-icon" src="comments-icon.png" width="20" />
                <div class="social-count">{{ this.feeditem.comment_count }}</div>
                <div class="view-comments-wrapper">
                    <a class="view-comments" v-if="!commentsShown && this.feeditem.comment_count !== 0"
                        @click="getComments">View comments</a>
                    <a class="view-comments" v-else-if="commentsShown" @click="commentsShown = false">Hide comments</a>
                </div>
            </div>
        </div>
        <div class="comment-wrapper">
            <div v-if="commentsShown">
                <ul flat>
                    <li v-for="(comment, index) in this.comments" :key="index"
                        :class="(comment.comment_level > 1) ? 'li-comment li-reply' : 'li-comment'">
                        <div class="comment-author">{{ comment.display_name }}</div>
                        <div class="comment-text">{{ comment.comment_text }}</div>
                        <div class="comment-extra">
                            <div class="social-likes">
                                <div v-if="!comment.liked_by_user"
                                    @click="likeComment(comment.feed_item_comment_id, index)">
                                    <img class="social-icon" src="likes-icon.png" width="20" />
                                </div>
                                <div v-else @click="unlikeComment(comment.feed_item_comment_id, index)">
                                    <img class="social-icon" src="liked-icon.png" width="20" />
                                </div>
                                <div class="social-count">{{ comment.like_count }}</div>
                            </div>
                            <a class="comment-reply" @click="startReply(index)">Reply</a>
                            <span class="comment-date">{{ commentTimeAgo(comment.create_dt) }}</span>
                        </div>
                        <div class="add-comment">
                            <input v-if="replyShown === index" :id="'reply' + index" size="sm" label=""
                                placeholder="Add a reply" v-model="reply"
                                v-on:keyup.native.enter="addReply(comment.feed_item_comment_id, comment.comment_level, comment.parent_comment_id, index)"
                                class="u-stack-sm" />
                        </div>
                    </li>
                </ul>
            </div>
            <div class="add-comment">
                <input id="comment" size="sm" label="" placeholder="Add a comment" v-model="comment"
                    v-on:keyup.native.enter="addComment" />
            </div>
        </div>
    </div>
</template>
<script>
import moment from 'moment';
export default {
    name: "FeedItem",
    props: {
        apikey: '',
        feeduser: null,
        feeditem: {
            type: Object,
            required: true,
            default: () => ({
                feed_item_id: 0,
                item_id: "",
                user_display_name: "",
                item_dt: new Date(),
                asset_id: 0,
                item_type: "",
                primary_com_name: "",
                loc_name: "",
                region: "",
                item_text: "",
                description: "",
                comment_count: 0,
                like_count: 0,
                liked_by_user: false,
            }),
            validator: (feeditem) => ["feed_item_id",
                "item_id",
                "user_display_name",
                "item_dt",
                "asset_id",
                "item_type",
                "primary_com_name",
                "loc_name",
                "region",
                "item_text",
                "description",
                "comment_count",
                "like_count",
                "liked_by_user",].every((key) => key in feeditem),
        },
    },
    data() {
        return {
            unliked: true,
            likes: 0,
            comment: '',
            comments: [],
            reply: '',
            commentsShown: false,
            replyShown: null,
        };
    },
    computed: {
        media() {
            return `https://cdn.download.ams.birds.cornell.edu/api/v1/asset/${this.feeditem.asset_id}/2400`;
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
                return `Checklist Submission`;
            } else if (this.feeditem.item_type == 'obs') {
                return `Notable Observation -- ${this.feeditem.description}`;
            } else if (this.feeditem.item_type == 'article') {
                return 'Fun Fact';
            };
        },
        title() {
            if (this.feeditem.item_type == 'sub') {
                return this.feeditem.description;
            } else {
                return this.feeditem.primary_com_name;
            }
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
        detail() {
            if (this.feeditem.item_type == 'species_trend' || this.feeditem.item_type == 'article') {
                return this.feeditem.item_text;
            } else if (this.feeditem.region == null) {
                return this.feeditem.loc_name;
            } else {
                return `${this.feeditem.loc_name}, ${this.feeditem.region}`;
            };
        },
    },
    methods: {
        async likeItem() {
            const res = await fetch(`https://eubezqwowmaahphqywys.supabase.co/rest/v1/rpc/react_item`, {
                method: "POST", headers: {
                    "Content-Type": "application/json",
                    "apikey": this.apikey
                }, body: JSON.stringify({
                    p_feed_user_id: this.feeduser,
                    p_feed_item_id: this.feeditem.feed_item_id,
                    p_react_type: 'like'
                })
            });
            console.log("res", res);
            const success = await res.json();
            if (success == 1) {
                this.feeditem.liked_by_user = true
                this.feeditem.like_count++
            }
        },
        async unlikeItem() {
            const res = await fetch(`https://eubezqwowmaahphqywys.supabase.co/rest/v1/rpc/unreact_item`, {
                method: "POST", headers: {
                    "Content-Type": "application/json",
                    "apikey": this.apikey
                }, body: JSON.stringify({
                    p_feed_user_id: this.feeduser,
                    p_feed_item_id: this.feeditem.feed_item_id,
                    p_react_type: 'like'
                })
            });
            const success = await res.json();
            if (success == 1) {
                this.feeditem.liked_by_user = false
                this.feeditem.like_count--
            }
        },
        async likeComment(commentId, index) {
            const res = await fetch(`https://eubezqwowmaahphqywys.supabase.co/rest/v1/rpc/react_comment`, {
                method: "POST", headers: {
                    "Content-Type": "application/json",
                    "apikey": this.apikey
                }, body: JSON.stringify({
                    p_feed_user_id: this.feeduser,
                    p_feed_item_comment_id: commentId,
                    p_react_type: 'like'
                })
            });
            const success = await res.json();
            if (success) {
                this.comments[index].liked_by_user = true
                this.comments[index].like_count++
            }
        },
        async unlikeComment(commentId, index) {
            const res = await fetch(`https://eubezqwowmaahphqywys.supabase.co/rest/v1/rpc/unreact_comment`, {
                method: "POST", headers: {
                    "Content-Type": "application/json",
                    "apikey": this.apikey
                }, body: JSON.stringify({
                    p_feed_user_id: this.feeduser,
                    p_feed_item_comment_id: commentId,
                    p_react_type: 'like'
                })
            });
            const success = await res.json();
            if (success) {
                this.comments[index].liked_by_user = false
                this.comments[index].like_count--
            }
        },
        async addComment() {
            console.log("comment", this.comment)
            if (this.comment !== '') {
                const commentData = {
                    p_feed_item_id: this.feeditem.feed_item_id,
                    p_feed_user_id: this.feeduser,
                    p_comment_text: this.comment,
                    p_comment_level: 1,
                    p_parent_comment_id: null,
                    p_reply_to_id: null
                }
                const res = await fetch(`https://eubezqwowmaahphqywys.supabase.co/rest/v1/rpc/add_comment`, {
                    method: "POST", headers: {
                        "Content-Type": "application/json",
                        "apikey": this.apikey
                    }, body: JSON.stringify(commentData)
                });
                this.feeditem.comment_count++
                this.comments.push(commentData)
                this.comment = ''
                this.getComments()
            }
        },
        async addReply(replyToId, replyToLevel, replyToParent, replyToIndex) {
            console.log("reply", this.reply)
            if (this.reply !== '') {
                const commentData = {
                    p_feed_item_id: this.feeditem.feed_item_id,
                    p_feed_user_id: this.feeduser,
                    p_comment_text: this.reply,
                    p_comment_level: replyToLevel + 1,
                    p_parent_comment_id: replyToParent ? replyToParent : replyToId,
                    p_reply_to_id: replyToId
                }
                const res = await fetch(`https://eubezqwowmaahphqywys.supabase.co/rest/v1/rpc/add_comment`, {
                    method: "POST", headers: {
                        "Content-Type": "application/json",
                        "apikey": this.apikey
                    }, body: JSON.stringify(commentData)
                });
                this.feeditem.comment_count++
                this.comments.splice(replyToIndex + 1, 0, commentData)
                this.reply = ''
                this.replyShown = null
                this.getComments()

            }
        },
        async getComments() {
            const res = await fetch(`https://eubezqwowmaahphqywys.supabase.co/rest/v1/rpc/get_comments`, {
                method: "POST", headers: {
                    "Content-Type": "application/json",
                    "apikey": this.apikey
                }, body: JSON.stringify({
                    p_user_id: this.feeduser,
                    p_feed_item_id: this.feeditem.feed_item_id,
                })
            });
            const finalRes = await res.json();
            this.comments = finalRes
            this.commentsShown = true
        },
        commentTimeAgo(dt) {
            return moment(dt).fromNow()
        },
        startReply(index) {
            this.replyShown = index
        }
    }
};
</script>