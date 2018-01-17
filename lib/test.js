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

function objLoop(obj){
    return Object.keys(obj).map((key) => {
        return Object.keys(obj[key]).map((innerKey) => {
           return obj[key][innerKey]; 
        });
    })
    
    // // Object.keys(obj).forEach((key) => {
    // //     Object.keys(obj[key]).forEach((innerkey) => {
    // //         console.log(obj[key][innerkey]);

    // //     })
    // //     return null; // cant use this 
    // // })
	// for(let outerKey in obj){
    //     for(let key in obj[outerKey]){
    //         if(obj[outerKey].hasOwnProperty(key)){
    //             console.log(obj[outerKey][key]);
    //         }
    //     }
    // }
    // return null;
}

objLoop(obj);