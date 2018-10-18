import styled, { keyframes } from 'styled-components';

export const showAttractionKeyFrame = keyframes`
	0% {
		height: 20vh;
	},
	100% {
		height: 80vh;
	}
`;

export const hideAttractionKeyFrame = keyframes`
	0% {
		height: 80vh;
	}
	100% {
		height: 20vh;
	}
`;