export default function auth(to, from, next) {
	if (localStorage.getItem("token")) {
		next({ name: "Post" });
		return false;
	}
	return next();
}
