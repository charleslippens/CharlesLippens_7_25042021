import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import auth from "../middleware/auth";
import VueRouteMiddleware from "vue-route-middleware";

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
		beforeEnter: (to, from, next) => {
			if (!localStorage.getItem("token")) {
				return next();
			}
			return next("/post");
		},
	},
	{
		path: "/signup",
		name: "Signup",
		component: () => import(/* webpackChunkName: "about" */ "../views/Signup.vue"),
		beforeEnter: (to, from, next) => {
			if (!localStorage.getItem("token")) {
				return next();
			}
			return next("/post");
		},
	},
	{
		path: "/post",
		name: "Post",
		component: () => import(/* webpackChunkName: "about" */ "../views/Post.vue"),
		meta: {
			middleware: auth,
		},
	},
	{
		path: "/profile",
		name: "Profile",
		component: () => import(/* webpackChunkName: "about" */ "../views/Profile.vue"),
		meta: {
			middleware: auth,
		},
	},
	{
		path: "/users",
		name: "Users",
		component: () => import(/* webpackChunkName: "about" */ "../views/Users.vue"),
		beforeEnter: (to, from, next) => {
			if (localStorage.getItem("isAdmin")) {
				return next();
			}
			return next("/post");
		},
		meta: {
			middleware: auth,
		},
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

router.beforeEach(VueRouteMiddleware());

export default router;
