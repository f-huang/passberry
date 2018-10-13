"use strict";

exports.getColumnsAliasesAsString = (columns, aliases) => {
	let ret = "";

	if (columns.length !== aliases.length)
		throw "Columns and aliases not the same si´";
	for (let i = 0; i < columns.length; i++) {
		ret += `\`${columns[i]}\` AS '${aliases[i]}'` + (i + 1 === columns.length ? "" : ", ");
	}
	return ret;
};

exports.getFileExtension = (filename) => filename.split('.').pop();

exports.getColumnsAsString = (columns, usual) => {
	let ret = "";
	columns = (columns !== undefined && columns.length > 0) ? [...new Set([...columns, ...usual])] : usual;
	for (let i = 0; i < columns.length; i++) {
		ret += `\`${columns[i]}\`` + (i + 1 === columns.length ? "" : ", ");
	}
	return ret;
};


exports.getValuesAsString = (columns)  => {
	let str = "";
	const count = (columns.match(/,/g) || []).length;
	if (count === 0)
		return str;
	for (let i = 0; i < count + 1; i++)
		str += (i === count) ? "?" : "?, ";
	return (str);
};