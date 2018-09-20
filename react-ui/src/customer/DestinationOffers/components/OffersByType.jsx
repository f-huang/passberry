import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Button from "../../../component/Button/Button";
import Offer from "./Offer";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;
const TopContainer = styled.div`
	display: flex;
	overflow: hidden;
	justify-content: space-between;
	align-items: center;
	padding: 16px;
`;

const BottomContainer = styled.div`
	display: flex;
	overflow: hidden;
`;

const Type = styled.h3`
	font-size: 0.8em;
	font-weight: bold;
`;


class OffersByType extends React.Component {
	static propTypes = {
		type: PropTypes.string.isRequired,
		attractions: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired,
		}))
	};

	static defaultProps = {
		type: '',
		attractions: [{ id: 0, name: '' }]
	};

	render() {
		const attractions = this.props.attractions.map(attraction => (
			<Offer offer={attraction} onClick={() => console.log("click")}/>
		));
		return (
			<Container>
				<TopContainer>
					<Type>{this.props.type}</Type>
					<Button backgroundColor={'#3134fd'} value={"VOIR TOUT"}/>
				</TopContainer>
				<BottomContainer>
					{attractions}
				</BottomContainer>
			</Container>
		);
	}
}

export default OffersByType;