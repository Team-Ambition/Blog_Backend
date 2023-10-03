const express = require('express');
const router = express.Router();
const { Post } = require('../models');
const bcrypt = require('bcrypt');

//Write Post
router.post('/', async (req, res) => {
	const { title, desc, nickname, userid } = req.body;

	bcrypt.hash(title, 10).then((hash) => {
		Post.create({
			title: title,
			desc: desc,
			nickname: nickname,
			userid: userid,
			postid: hash,
		});
		res.json('게시글 작성 완료');
	});
});

//Update
router.put('/:id', async (req, res) => {
	const { userid, title, desc, postid } = req.body;

	if (postid === req.params.id) {
		Post.update(
			{
				userid: userid,
				title: title,
				desc: desc,
			},
			{ where: { userid: userid } }
		);
		res.json('글 수정 완료');
	} else {
		res.json('글작성자만 글을 수정할 수 있습니다.');
	}
});

//Delete
router.delete('/:id', async (req, res) => {
	const { userid, title, desc, nickname } = req.body;

	if (userid === req.params.id) {
		Post.destroy({ where: { userid: userid } });
		res.json('게시글 삭제 성공');
	} else {
		res.json('글작성자만 글을 삭제할 수 있습니다.');
	}
});

//Get
router.get('/:id', async (req, res) => {
	const { userid, title, desc, nickname } = req.body;

	if (userid === req.params.id) {
		Post.destroy({ where: { userid: userid } });
		res.json('게시글 삭제 성공');
	} else {
		res.json('글작성자만 글을 삭제할 수 있습니다.');
	}
});

module.exports = router;