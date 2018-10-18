import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Root = styled.div`
	display: flex;
	flex-direction: column;
`;

const Precision = styled.span`
	font-style: italic;
`;

const AttractionPrice = ({ price }) => {
	return (
		<Root>
			{"Adulte : "}{price.adult.toFixed(2)+'€'}
			{price.child && (
				<div>
					{`Enfant `}
					{price.maxAgeForChild &&
					<Precision>{`moins de ${price.maxAgeForChild} ans`}</Precision>
					}
					{`: ${price.child.toFixed(2)}€`}
				</div>
			)}
			{price.student && (
				<div>
					{`Étudiant`}
					<Precision>{`(avec justificatif)`}</Precision>
					{`: ${price.student.toFixed(2)}€`}
				</div>
			)}
		</Root>
	);
};

AttractionPrice.propTypes = {
	price: PropTypes.shape({
		adult: PropTypes.number.isRequired,
		child: PropTypes.number,
		student: PropTypes.number,
		maxAgeForChild: PropTypes.number,
	})
};

export default AttractionPrice;