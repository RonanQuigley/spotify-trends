var obj = {
	fourWeeks : {
		dataOne : {name:'ronan1'}, 
		dataTwo : {name:'ronan2'}
	},
	sixMonths : {
		dataOne : {name:'ronan3'}, 
		dataTwo : {name:'ronan4'}
	},
	allTime : {
		dataOne : {name:'ronan5'}, 
		dataTwo : {name:'ronan6'}
	}
}

function props(obj){
	return Object.keys(obj)[0];
};

props(obj);