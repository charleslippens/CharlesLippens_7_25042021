<template>
	<div>
		<Nav />
		<div class="bg">
			<div class="field">
				<h1>Groupomania Users</h1>
				<hr />
				<div class="content">
					<div class="test" v-for="user in users" :key="user.id">
						<p class="title font-weight-bold">ID : {{ user.id }}</p>
						<p class="title font-weight-bold">Pseudo : {{ user.username }}</p>
						<p class="title font-weight-bold">
							Créé le : {{ dateFormat(user.createdAt) }}
						</p>
						<p class="title font-weight-bold">Email : {{ user.email }}</p>
						<button class="users-list_delete-link" @click="deleteUser(user.id)">
							<i class="far fa-trash-alt"></i>Supprimer
						</button>
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
import moment from "moment";
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

		// afficher la date de publication au bon format
		dateFormat(date) {
			if (date) {
				return moment(String(date)).format("DD/MM/YYYY");
			}
		},

		displayUser() {
			axios
				.get("http://localhost:3000/api/admin/users", {
					headers: { Authorization: "Bearer " + localStorage.token },
				})
				.then((response) => {
					this.users = response.data.users;
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
.test {
	border: solid;
	border-radius: 5px;
	background-color: white;
	padding: 10px;
	margin: 0px 10px 10px 0px;
}

.content {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	min-width: 40%;
	max-width: 80%;
	margin: 3rem auto;
	border-radius: 25px;

	@media (max-width: 500px) {
		min-width: 80%;
	}
}
</style>
