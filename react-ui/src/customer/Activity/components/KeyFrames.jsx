import { keyframes } from 'styled-components';

export const showActivityKeyFrame = keyframes`
	0% {
		height: 20vh;
	},
	100% {
		height: 80vh;
	}
`;

export const hideActivityKeyFrame = keyframes`
	0% {
		height: 80vh;
	}
	100% {
		height: 20vh;
	}
`;