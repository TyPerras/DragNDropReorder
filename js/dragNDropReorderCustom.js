//////////////////////////////////////////////////////////////////////
// RENAME BUTTONS, FEEDBACK DIVS, AND ACTIVITY ROOT IDS AND CLASSES //
//////////////////////////////////////////////////////////////////////

// Find and replace all of the collapse component attribute names so that each multi-select activity has unique independent names
const dragNDropReorderActivityRoot = document.getElementsByClassName("DragNDropReorderActivityRoot");

let ia, len;
for (ia = 0, len = dragNDropReorderActivityRoot.length; ia < len; ia++) {
	dragNDropReorderActivityRoot[ia].setAttribute('id', 'dragNDropReorderActivityRoot' + ia);
}

///////////////////////////////////////////////////////////////
// IF THE USER CLICKS ON <span> ELEMENT INSTEAD OF <li> ITEM //
///////////////////////////////////////////////////////////////

// Click Events are not only applied to the <li> item, it is also applied to all of the children nested inside of the <li> (<label>, <input>, <span>, <div>)
$('li.slds-p-around_xx-small').click(function(event) {
	if ($(event.target).is('span')) {
		// This prevents users from selecting and submitting the wrong element (<span> instead of <li>) into the DragNDrop function
		// If the <span> is sent to the function it will not be recognized as a target object. It is recognized as "null" instead and breaks the function.
		event.stopPropagation();
	}
});




//////////////////////////////////
// HIDE BULLET POINT LIST ITEMS //
//////////////////////////////////

const suppliedItemsLists = document.getElementsByClassName("dragNDropReorderList");

let ib;
// let len = 0;
for (ib = 0, len = suppliedItemsLists.length; ib < len; ib++) {
	suppliedItemsLists[ib].setAttribute('id', 'dragNDropReorderListNumber' + ib);
}

// Hide <ul> item list
$(suppliedItemsLists).hide();
// suppliedListItemss.remove();




///////////////////////////////////////////
// DRAG AND DROP REORDER CHECK ORDER BTN //
///////////////////////////////////////////

// Check Answer Button Click Event
$('button.btn-submitDragNDropReorderActivity').click(function(event) {

	const DNDROSubmitBtn = event.target;
	// <section> (current MC section)
	const DNDROSection = DNDROSubmitBtn.parentElement;
	// <section> children
	const DNDROSectionChildren = DNDROSection.children;

	// <div class="dragNDropReorderList"> element
	const DNDROSectionActivtyULListDiv = DNDROSectionChildren[1];
	// <div class="DragNDropReorderActivityRoot"> element
	const DNDROSectionActivtyRootDiv = DNDROSectionChildren[2];


	/////////////////////////
	// GET ANSWER KEY VARS //
	/////////////////////////

	// <div class="DragNDropReorderActivityRoot"> children
	const DNDROSectionActivtyULListDivChildren = DNDROSectionActivtyULListDiv.children;
	// <ul> element
	const dynamicItemsUL = DNDROSectionActivtyULListDivChildren[0];
	// <ul> children
	const dynamicItemsULChildren = dynamicItemsUL.children;



	//////////////////////////////////
	// CURRENT ORDER SUBMITTED VARS //
	//////////////////////////////////

	// <div class="DragNDropReorderActivityRoot"> children
	const DNDROSectionActivtyRootDivChildren = DNDROSectionActivtyRootDiv.children;
	// <div> container element
	const DNDROActivityContainerDiv = DNDROSectionActivtyRootDivChildren[0];
	// <div> container element children
	const DNDROActivityContainerDivChildren = DNDROActivityContainerDiv.children;
	// <ul class="dragNDropReorderListbox"> element
	const DNDROActivityUL = DNDROActivityContainerDivChildren[1];
	// <ul class="dragNDropReorderListbox"> element children
	const DNDROActivityLIItems = DNDROActivityUL.children;


	// Answer Key Array
	const childrenItemsArrayAnswerKey = new Array();
	// Provided Answer Order Array
	const childrenItemsArraySubmittedOrder = new Array();


	let ic;
	// Lop through each of the list items and store them in a properly formatted object array
	for (ic = 0, len = dynamicItemsULChildren.length; ic < len; ic++) {

		// <li> element innerHTML content
		childrenItemsArrayAnswerKey[ic] = dynamicItemsULChildren[ic].innerHTML;
		// <li> element
		const DNDROActivityLiItems = DNDROActivityLIItems[ic];
		// <li> element children
		const DNDROActivityLiItemChild = DNDROActivityLiItems.children;

		// Create <span> for correct/incorrect feedback
		// const DNDROActivityCreateSpan = document.createElement("span");
		// DNDROActivityLiItems.appendChild(DNDROActivityCreateSpan);

		// Remove the dragNDropReorderListItemSelected on the currently selected <li> item so that the css doesn't interfere with the feedback style
		var isLiItemSelected = DNDROActivityLIItems[ic].classList.contains("dragNDropReorderListItemSelected");
		if (isLiItemSelected) {
			DNDROActivityLIItems[ic].classList.remove('dragNDropReorderListItemSelected');
		}

		// <span class="dragNDropReorderListOption__Text"> element
		const DNDROActivityLiItemChildSpan = DNDROActivityLiItemChild[0];
		// <span class="DNDROfeedback"> element
		const DNDROActivityLiItemChildSpanFeedback = DNDROActivityLiItemChild[1];

		childrenItemsArraySubmittedOrder[ic] = DNDROActivityLiItemChildSpan.innerHTML
		// console.log("childrenItemsArrayAnswerKey[ic]: " + childrenItemsArrayAnswerKey[ic]);
		// console.log("childrenItemsArraySubmittedOrder[id]: " + childrenItemsArraySubmittedOrder[ic]);

		// Compare the correct answer order to the answer order provided and apply appropriate class and feedback <span> text
		if (childrenItemsArrayAnswerKey[ic] !== childrenItemsArraySubmittedOrder[ic]) {
			DNDROActivityLIItems[ic].classList.add('incorrect');
			DNDROActivityLiItemChildSpanFeedback.innerHTML = '<i class="fas fa-times"></i> Incorrect';
		} else {
			DNDROActivityLIItems[ic].classList.add('correct');
			DNDROActivityLiItemChildSpanFeedback.innerHTML = '<i class="fas fa-check"></i> Correct';
		}

	}

});


///////////////////////////////////////////////////////////
// DRAG AND DROP REORDER <li> CLICK EVENT FEEDBACK RESET //
///////////////////////////////////////////////////////////

// document ready function is needed because the <li> items are generated dynamically after initial page load
$(document).ready(function(event){



	$("li.dragNDropReorderListItem").mousedown(function(event){





		if ($(event.target).is('li')) {
			removeVisualFeedback(event.target);
		} else if ($(event.target).is('.correct span')) {
			var correctSpan = event.target;
			var listItem = correctSpan.parentElement;
			removeVisualFeedback(listItem);
		} else if ($(event.target).is('.incorrect span')) {
			var incorrectSpan = event.target;
			var listItem = incorrectSpan.parentElement;
			removeVisualFeedback(listItem);
		}

		function removeVisualFeedback(listItem) {

			const DNDROLiItemClick = listItem;
			// <ul class="dragNDropReorderListbox"> (current MC section)
			const DNDROUL = DNDROLiItemClick.parentElement;
			// <ul> children (<li>'s')
			const DNDROULChildren = DNDROUL.children;

			let id;
			// Lop through each of the list items and store them in a properly formatted object array
			for (id = 0, len = DNDROULChildren.length; id < len; id++) {

				// Remove the correct or incorrect class on the <li> times
				var isLiItemScoreIncorrect = DNDROULChildren[id].classList.contains("incorrect");
				var isLiItemScoreCorrect = DNDROULChildren[id].classList.contains("correct");

				var DNDROLiFeedbackChildren = DNDROULChildren[id].children;
				var DNDROLiFeedbackText = DNDROLiFeedbackChildren[1];

				if (isLiItemScoreIncorrect) {
					DNDROULChildren[id].classList.remove('incorrect');
					DNDROLiFeedbackText.innerHTML = '';
				} else if (isLiItemScoreCorrect) {
					DNDROULChildren[id].classList.remove('correct');
					DNDROLiFeedbackText.innerHTML = '';
				}

			}

		}

	});

});





