import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import VueRouteMiddleware from "vue-route-middleware";

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/signup",
		name: "Signup",
		component: () => import(/* webpackChunkName: "about" */ "../views/Signup.vue"),
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

router.beforeEach(VueRouteMiddleware());

export default router;
