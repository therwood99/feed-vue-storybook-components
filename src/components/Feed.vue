<template>
    <div class="feed-items">
        <template v-if="loading">
            <div class="loading-feed">
                <img class="loader" src="media-loading.gif" />
            </div>
        </template>
        <template v-else>
            <section>
                <div class="feed">
                    <FeedItem v-for="item in FeedItems" :feeditem="item" :apikey="apikey" :feeduser="user_id"></FeedItem>
                </div>
            </section>
        </template>
    </div>
</template>
<script>
import FeedItem from "./FeedItem.vue";
export default {
    name: "Feed",
    props: {
        apikey: {
            type: String,
            required: true,
            default: () => (""),
        },
        user_id: {
            type: Number,
            required: true,
            default: () => (0),
        },
        loading: {
            type: Boolean,
            required: true,
            default: () => (true),
        },
        item_type: {
            type: String,
            required: true,
            default: () => ("all"),
        }
    },
    components: {
        FeedItem
    },
    data() {
        return {
            FeedItems: [],
            apiurl: `https://eubezqwowmaahphqywys.supabase.co/rest/v1/rpc/get_feed?p_item_type=${this.item_type}&p_user_id=${this.user_id}&apikey=${this.apikey}`
        }
    },
    methods: {
        async getData() {
            const res = await fetch(this.apiurl);
            const finalRes = await res.json();
            this.FeedItems = finalRes;
        }
    },
    mounted() {
        this.getData()
    }
}
</script>