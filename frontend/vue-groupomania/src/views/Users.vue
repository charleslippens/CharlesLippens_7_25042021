<template>
<div>
	<Nav />
    <div class="field">
        <div class="content">
            <h3>Groupomania Users</h3>
            <hr />

            <div class="card" v-for="user in users" :key="user.id">
                <p class="title font-weight-bold">
                    Créé le :{{ user.createdAt }}
                </p>
                <span class="title font-weight-bold"
                    >username : {{ user.username }}</span
                >
                <p class="title font-weight-bold">Email : {{ user.email }}</p>
                <br />
            </div>
        </div>
    </div>
</div>

</template>


<script>
import axios from "axios";

import Nav from "@/components/Nav.vue";

export default {
	name: "Users",
	components: {
		Nav,
	},

	data() {
		return {
			user: "",
			users: [],
			error: "",
		};
	},
	created() {
		axios
			.get("http://localhost:3000/api/admin/users", {
				headers: { Authorization: "Bearer " + localStorage.token },
			})
			.then((response) => {
					this.users = response.data.users;
					console.log("this.user:",this.users);
					console.log("isadmin:",this.users.isAdmin);
				})
			.catch((err) => console.log(err));
	},
};
</script>
<style scoped lang="scss">
h1,
h2 {
	margin-top: 2rem;
}

h3 {
	font-size: 1.9em;
	color: black;
}
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	min-width: 40%;
	max-width: 60%;
	margin: 3rem auto;
	background: grey;
	border-radius: 25px;
	@media (max-width: 500px) {
		min-width: 80%;
	}
}
</style>
