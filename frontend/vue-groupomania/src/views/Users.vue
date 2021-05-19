<template>
	<div>
		<Nav />
		<div class="bg">
			<div class="field">
				<div class="content">
					<h3>Groupomania Users</h3>
					<hr />

					<div class="card" v-for="user in users" :key="user.id">
						<p class="title font-weight-bold">Créé le :{{ user.createdAt }}</p>
						<span class="title font-weight-bold">username : {{ user.username }}</span>
						<p class="title font-weight-bold">Email : {{ user.email }}</p>
						<p class="users-list_delete-link" @click="deleteUser(user.id)">
							<i class="fas fa-user-times"></i>Supprimer
						</p>
						<br />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import { Notyf } from "notyf";

import "notyf/notyf.min.css";

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
			revele: false,
		};
	},
	created() {
		this.displayProfile();
		this.displayUser();

		this.notyf = new Notyf({
			duration: 2000,
			position: {
				x: "center",
				y: "top",
			},
		});
	},
	methods: {
		deleteUser(key) {
			const userId = key;

			axios
				.delete("http://localhost:3000/api/user/" + userId, {
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + localStorage.getItem("token"),
					},
				})
				.then(() => {
					this.notyf.success("Le compte a bien été supprimé");
					this.$router.push("/post");
				})
				.catch((error) => {
					const msgerror = error.response.data;
					this.notyf.error(msgerror.error);
				});
		},
		displayModale() {
			this.revele = !this.revele;
		},

		displayProfile() {
			const userId = localStorage.getItem("userId");

			axios
				.get("http://localhost:3000/api/user/" + userId, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("token"),
					},
				})
				.then((response) => {
					this.user = response.data;
					localStorage.setItem("imageProfile", response.data.imageProfile);
				})
				.catch((error) => {
					const msgerror = error.response.data;
					this.notyf.error(msgerror.error);
				});
		},

		displayUser() {
			axios
				.get("http://localhost:3000/api/admin/users", {
					headers: { Authorization: "Bearer " + localStorage.token },
				})
				.then((response) => {
					this.users = response.data.users;
					console.log("this.user:", this.users);
					console.log("this.user:", this.user);
				})
				.catch((err) => console.log(err));
		},
	},
};
</script>
<style scoped lang="scss">
.bg {
	background: rgb(228, 225, 225);
	background-size: cover, contain;
	height: 100vh;
}

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
	background: #c7c7c7;
	border-radius: 25px;
	@media (max-width: 500px) {
		min-width: 80%;
	}
}
</style>
