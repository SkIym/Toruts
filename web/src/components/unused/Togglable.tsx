import React, { useState, forwardRef, useImperativeHandle, Ref } from "react";
import { ToggleObject } from "../../types/types";

interface Props {
    className: string,
    buttonLabel: string,
    children: React.ReactElement
}

const Togglable = forwardRef((props: Props, refs: Ref<ToggleObject>) => {
	const [visible, setVisible] = useState(false);

	const hideWhenVisible = { display: visible ? "none" : "" };
	const showWhenVisible = { display: visible ? "" : "none" };

	const toggleVisibility = () => {
		setVisible(!visible);
		console.log("toggling invisibility",props.buttonLabel)
	};

	const setInvisible = () => {
		setVisible(false)
		console.log("going invisible...",props.buttonLabel)
	}

	useImperativeHandle(refs, () => {
		return {
			toggleVisibility,
			setInvisible
		};
	});

	return (
		<div className={props.className}>
			<div style={hideWhenVisible} id="add-form-button">
				<button type="button" onClick={toggleVisibility}>{props.buttonLabel}</button>
			</div>
			<div style={showWhenVisible} className="blog-show-when-visible">
				{props.children}
				<button type="button" onClick={toggleVisibility}>Cancel</button>
			</div>
		</div>
	);
});


export default Togglable;