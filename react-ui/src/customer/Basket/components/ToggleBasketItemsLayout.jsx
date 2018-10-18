import React from "react";
import styled from "styled-components";
import theme from "../../../app/theme";

import { connect } from "react-redux";
import { toggleItemsLayout } from "../basketActions";

import EnumToggleItems from "../EnumItemsLayout";

const Container = styled.div`
	display: flex;
	flex-direction: row;
	margin: 0 auto;
	border: 1px solid ${theme.colorPrimary};
	width: 60vw;
`;

const ButtonLayout = styled.div`
	background-color: ${ props => props.isSelected ? theme.colorPrimary : theme.colorInverse };
	color: ${ props => props.isSelected ? theme.colorInverse : theme.colorPrimary };
	font-size: 13px;
	text-align: center;
	padding: 8px 12px;
	width: 50%;
`;

const layouts = [...Object.values(EnumToggleItems)];

const ToggleBasketItemsLayout = ({ itemsLayout, onClickToggleLayout }) => {
	return (
		<Container>
			{layouts.map(layout =>
				<ButtonLayout
					key={ layout.value }
					isSelected={ itemsLayout === layout.value }
					onClick={ e => onClickToggleLayout(layout.value) }
				>{ layout.display }
				</ButtonLayout>
			)}
		</Container>
	)
};

const mapStateToProps = state => {
	return ({
		itemsLayout: state.basketPage.itemsLayout
	})
};

const mapDispatchToProps = dispatch => {
	return ({
		onClickToggleLayout: (layout) => dispatch(toggleItemsLayout({ itemsLayout: layout }))
	})
};

export default connect(mapStateToProps, mapDispatchToProps)(ToggleBasketItemsLayout);