<template>
    <div class="search-result">
        <div class="result">{{ (this.region_code).toUpperCase() }}</div>
        <button v-if="unfollowed" class="follow-action follow" @click="followRegion">Follow</button>
        <button v-else class="follow-action unfollow" @click="unfollowRegion">Unfollow</button>
    </div>
</template>
<script>
import Region from "./Region.vue";
export default {
    name: "Region",
    props: {
        region_code: {
            type: String,
            required: true,
            default: () => ("Reg-Code"),
        },
        user_id: {
            type: Number,
            required: true,
            default: () => (0),
        },
        apikey: {
            type: String,
            required: true,
            default: () => (""),
        }
    },
    data() {
        return {
            apiurl: `https://eubezqwowmaahphqywys.supabase.co/rest/v1/rpc/region_followed?p_user_id=${this.user_id}&p_region_code=${this.region_code}&apikey=${this.apikey}`,
            unfollowed: true,
        }
    },
    components: {
        Region
    },
    methods: {
        async getData() {
            const res = await fetch(this.apiurl);
            const finalRes = await res.json();
            this.unfollowed = !finalRes;
        },
        followRegion() {
            fetch(`https://eubezqwowmaahphqywys.supabase.co/rest/v1/rpc/follow_region?`, {
                method: "POST", headers: {
                    "Content-Type": "application/json",
                    "apikey": this.apikey
                }, body: JSON.stringify({
                    p_user_id: this.user_id,
                    p_region_code: this.region_code
                })
            });
            this.unfollowed = !this.unfollowed;
        },
        unfollowRegion() {
            fetch(`https://eubezqwowmaahphqywys.supabase.co/rest/v1/rpc/unfollow_region?`, {
                method: "POST", headers: {
                    "Content-Type": "application/json",
                    "apikey": this.apikey
                }, body: JSON.stringify({
                    p_user_id: this.user_id,
                    p_region_code: this.region_code
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