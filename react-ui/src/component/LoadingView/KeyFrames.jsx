import { keyframes } from 'styled-components';

export const blink = keyframes`
	0% {
		opacity: .2;
	},
	50% {
		opacity: 1;
	},
	100% {
		opacity: .2;
	}
`;

export const wave = keyframes`
	0%, 60%, 100% {
		transform: initial;
	}

	30% {
		transform: translateY(-15px);
	}
}`;
