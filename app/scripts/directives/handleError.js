
const handleError = () => {
	
	const template = (
		`<div class="error-box" ng-show="error">
			<h2>Oops! Something went wrong. Please refresh and try again.</h2>
			<span ng-click="error=false">X</span>
		</div>`
	);

	return { template };
};


export default handleError;