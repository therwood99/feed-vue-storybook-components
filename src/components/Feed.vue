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
                    <FeedItem v-for="item in FeedItems" :feeditem="item"></FeedItem>
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
        apiurl: {
            type: String,
            required: true,
            default: () => (""),
        },
        loading: {
            type: Boolean,
            required: true,
            default: () => (true),
        }
    },
    components: {
        FeedItem
    },
    data() {
        return {
            FeedItems: []
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