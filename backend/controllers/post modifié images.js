// Imports
const jwt = require("jsonwebtoken");
const db = require("../models/index");
const fs = require("fs");

const Post = require("../models/Post");
const User = require("../models/User");

const Comment = require("../models/Comment");
const multer = require("../middleware/multer-config");
//- test suppression fichiers images
var filename=new Array();
var files=fs.readdirSync("./images");
console.log("files:",files[1]);
for (var i=0;i<files.length;i++)
{
 filename[i] = "http://localhost:3000/images/"+files[i];
console.log("filename:",filename[i]);
}

db.Post.findAll({
	attributes: ["imagePost"],
	raw:true
})
// Crée le message du user trouvé dans la BD Post: texte + adresse de l'image en local (/images)
.then((PostFound) => {
	if (PostFound) {
		//var ima=res.status(200).JSON(PostFound);
		console.log("post found entier:",PostFound);
		//console.log("post found1:",PostFound[1].imagePost);
		//console.log("post found2:",PostFound[2].imagePost);
		let a=Array();
		//a[1] = PostFound[0].imagePost;
		//a[2] = PostFound[1].imagePost;

		//console.log("a=",a[1],a[2]);
		for (var j=1;j<3;j++)
		var k=j-1;
		console.log
		a[j]=PostFound[k].imagePost;
		//var tab=Array();

		//tab[j]=j;
		console.log("tabj:",a[1])
		console.log("post found:",PostFound[j].imagePost);
		//for (var j=0;j<PostFound.length;j++)
		//for (var i=0;i<files.length;i++)
		//{
		// if (filename[i] == PostFound[j].imagePost) {console.log("trouvé:",filename[i] )
		//}else{
		//	console.log("non trouvé")}
		//}

	} else {
		console.log("post not found");
	}
})
//console.log("tab:",PostFound);

db.User.findAll({
	attributes: ["imageProfile"],
	raw:true
})
// Crée le message du user trouvé dans la BD Post: texte + adresse de l'image en local (/images)
.then((PostFound) => {
	if (PostFound) {
		//var ima=res.status(200).JSON(PostFound);
		console.log("post found entier:",PostFound);
		for (var j=0;j<PostFound.length;j++)
		console.log("post found:",PostFound[j].imageProfile);
		
	} else {
		console.log("post not found");
	}
})



// Permet de créer un nouveau message
exports.createPost = (req, res, next) => {
	const content = req.body.content;

	const token = req.headers.authorization.split(" ")[1];
	const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
	const userId = decodedToken.userId;

	// Permet de vérifier que tous les champs sont complétés
	if (content == null || content == "") {
		return res.status(400).json({ error: "Tous les champs doivent être renseignés" });
	}

	// Permet de contrôler la longueur du titre et du contenu du message
	if (content.length <= 4) {
		return res
			.status(400)
			.json({ error: "Le contenu du message doit contenir au moins 4 caractères" });
	}

	db.User.findOne({
		where: { id: userId },
	})

		.then((userFound) => {
			if (userFound) {
				const post = db.Post.build({
					content: req.body.content,
					imagePost: req.file
						? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
						: req.body.imagePost,
					UserId: userFound.id,
				});
				post.save()
					.then(() =>
						res.status(201).json({ message: "Votre message a bien été créé !" })
					)
					.catch((error) =>
						res.status(400).json({ error: "Oops, une erreur s'est produite !" })
					);
			} else {
				return res.status(404).json({ error: "Utilisateur non trouvé" });
			}
		})
		.catch((error) => res.status(500).json({ error: "Oops, une erreur s'est produite !" }));
};

// Permet d'afficher tous les messages
exports.getAllPosts = (req, res, next) => {
	db.Post.findAll({
		order: [["createdAt", "DESC"]],
		include: [
			{
				model: db.User,
				attributes: ["username", "imageProfile"],
			},
			{
				model: db.Comment,
			},
		],
	})
		.then((postFound) => {
			if (postFound) {
				res.status(200).json(postFound);
			} else {
				res.status(404).json({ error: "Aucun message trouvé" });
			}
		})
		.catch((error) => {
			res.status(500).send({ error: "Oops, une erreur s'est produite !" });
		});
};

// Permet de modifier un message
exports.modifyPost = (req, res, next) => {
	console.log("file", req.file);
	console.log("content", req.body.content);
	console.log("bodypost", req.body.post);
	const postObject = req.file
		? {
				content: req.body.content,
				imagePost: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
		  }
		: { ...req.body };

	console.log("body", req.body);
	console.log(req.params.postId);

	db.Post.findOne({
		where: { id: req.params.postId },
	})
		.then((postFound) => {
			if (postFound) {
				db.Post.update(postObject, {
					where: { id: req.params.postId },
				})
					.then((post) =>
						res.status(200).json({ message: "Votre message a bien été modifié !" })
					)
					.catch((error) =>
						res.status(400).json({ error: "Oops, une erreur s'est produite !" })
					);
			} else {
				res.status(404).json({ error: "Message non trouvé" });
			}
		})
		.catch((error) => res.status(500).json({ error: "Oops, une erreur s'est produite !" }));
};

// Permet de supprimer un message
exports.deletePost = (req, res, next) => {
	db.Post.findOne({
		attributes: ["id"],
		where: { id: req.params.postId },
	})
		.then((post) => {
			if (post) {
				if (post.imagePost != null) {
					const filename = post.imagePost.split("/images/")[1];

					fs.unlink(`images/${filename}`, () => {
						db.Post.destroy({
							where: { id: req.params.postId },
						})
							.then(() =>
								res.status(200).json({ message: "Votre message a été supprimé" })
							)
							.catch(() =>
								res.status(500).json({ error: "Oops, une erreur s'est produite !" })
							);
					});
				} else {
					db.Post.destroy({
						where: { id: req.params.postId },
					})
						.then(() =>
							res.status(200).json({ message: "Votre message a été supprimé" })
						)
						.catch(() =>
							res.status(500).json({ error: "Oops, une erreur s'est produite !" })
						);
				}
			} else {
				return res.status(404).json({ error: "Message non trouvé" });
			}
		})
		.catch((error) => res.status(500).json({ error: "Oops, une erreur s'est produite !" }));
};
