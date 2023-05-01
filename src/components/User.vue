<template>
    <div class="search-result">
        <div class="result">{{ (this.username).toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()) }}</div>
        <button v-if="unfollowed" class="follow-action follow" @click="followUser">Follow</button>
        <button v-else class="follow-action unfollow" @click="unfollowUser">Unfollow</button>
    </div>
</template>
<script>
import User from "./User.vue";
export default {
    name: "User",
    props: {
        username: {
            type: String,
            required: true,
            default: () => ("First Last"),
        },
        user_id: {
            type: Number,
            required: true,
            default: () => (0),
        },
        apikey: {
            type: String,
            required: true,
            default: () => ("")
        }
    },
    data() {
        return {
            apiurl: `https://eubezqwowmaahphqywys.supabase.co/rest/v1/rpc/user_followed?p_user_id=${this.user_id}&p_username=${this.username}&apikey=${this.apikey}`,
            unfollowed: true,
        }
    },
    components: {
        User
    },
    methods: {
        async getData() {
            const res = await fetch(this.apiurl);
            const finalRes = await res.json();
            this.unfollowed = !finalRes;
        },
        followUser() {
            fetch(`https://eubezqwowmaahphqywys.supabase.co/rest/v1/rpc/follow_user?`, {
                method: "POST", headers: {
                    "Content-Type": "application/json",
                    "apikey": this.apikey
                }, body: JSON.stringify({
                    p_user_id: this.user_id,
                    p_username: this.username
                })
            });
            this.unfollowed = !this.unfollowed;
        },
        unfollowUser() {
            fetch(`https://eubezqwowmaahphqywys.supabase.co/rest/v1/rpc/unfollow_user?`, {
                method: "POST", headers: {
                    "Content-Type": "application/json",
                    "apikey": this.apikey
                }, body: JSON.stringify({
                    p_user_id: this.user_id,
                    p_username: this.username
                })
            });
            this.unfollowed = !this.unfollowed;
        }
    },
    mounted() {
        this.getData()
    }
}
</script>