import React from "react";
import styled from "styled-components";

const Container = styled.div`
	margin: 0 auto	
`;

const Title = styled.h1`
	font-size: 0.9em;
`;

const Error404 = () =>
	<Container>
		<Title>Error 404</Title>
		<p>Page was not found</p>
	</Container>
;

export default Error404;