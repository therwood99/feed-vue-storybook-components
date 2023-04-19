<template>
    <div class="region">
        <div class="reg-code">{{ (this.region_code).toUpperCase() }}</div>
        <button v-if="unfollowed" class="follow-action follow">Follow</button>
        <button v-else class="follow-action unfollow">Unfollow</button>
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
            default: () => (""),
        },
        user_id: {
            type: Number,
            required: true,
            default: () => (0),
        }
    },
    data() {
        return {
            apiurl: `https://eubezqwowmaahphqywys.supabase.co/rest/v1/rpc/region_followed?p_user_id=${this.user_id}&p_region_code=${this.region_code}&apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1YmV6cXdvd21hYWhwaHF5d3lzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgyMDIxNTAsImV4cCI6MTk5Mzc3ODE1MH0.TBXYiMPSBsKp9S0Yqrfvn4xuJZutQ6w5bmvajVlGuAs`,
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
        }
    },
    mounted() {
        this.getData()
    }
}
</script>