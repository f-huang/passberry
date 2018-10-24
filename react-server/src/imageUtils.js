const { getFileExtension } = require("./database/utils");

const fs = require('fs');
const path = require('path');

const UPLOAD_DIR = "/../uploads/";

const saveImage = async (image, index) => {
	const { createReadStream, mimetype, encoding, filename } = await image;
	const rStream = createReadStream(filename);
	const extension = getFileExtension(filename);
	const newFilename = `${Date.now()+index+Math.floor(Math.random())}.${extension}`;
	const storingPath = path.join(__dirname + UPLOAD_DIR, newFilename);
	const wStream = fs.createWriteStream(storingPath);
	rStream.pipe(wStream);
	return storingPath;
};

const convertPathToImage = (path) => {
	const extension = getFileExtension(path);
	const body = fs.readFileSync(path, { encoding: 'base64' });
	return `data:image/${extension};base64,${body}`;
};

module.exports = {
	saveImage: saveImage,
	convertPathToImage: convertPathToImage
};