

setInterval( function() {
	// remove all buttons except the selected one, change its color, and make unclickable
	var buttons = document.getElementsByClassName( "ac-pushButton" );
	for ( let i = 0; i < buttons.length; i++ ) {
		buttons[i].addEventListener( "click", selectOption );
		buttons[i].addEventListener( "click", adaptiveCardsOption );

		var allChildren = buttons[i].childNodes;
		for ( let j = 0; j < allChildren.length; j++ ) {
			allChildren[j].addEventListener( "click", selectParentOption );
		}
	}
}, 10 );


function selectOption( event ) {
	disableButtons( event.target );
}

function selectParentOption( event ) {
	var children = event.target.parentNode.parentNode.childNodes;
	disableParentButtons( children, event.target.innerText );
	//parentNode.parentNode
}

function adaptiveCardsOption( event ) {
	var columnSet = $( event.target ).closest( ".ac-columnSet" )[0];
	if ( columnSet ) {
		var buttonsInColumnSets = columnSet.childNodes;
		for ( let j = 0; j < buttonsInColumnSets.length; j++ ) {
			var columnSetButtons = buttonsInColumnSets[j].querySelectorAll( "button" );
			if ( columnSetButtons ) {
				disableParentButtons( columnSetButtons, event.target.parentNode.parentNode.innerText );
			}
		}
	}
}

function grayButton( button ) {
	button.style.backgroundColor = "#d9d9d9";
	button.style.color = "#ffffff";
	button.height = "37px";
}

function blueButton( button ) {
	button.style.backgroundColor = "#0078d7";
	button.style.color = "white";
	button.height = "37px";
}

function disableParentButtons( children, targetButton ) {
	for ( let i = 0; i < children.length; i++ ) {
		var alreadhClicked = false;
		for ( var j = 0; j < children[i].classList.length; j++ ) {
			if ( children[i].classList[j] === "old-button" || children[i].classList[j] === "expandable" ) {
				alreadhClicked = true;
				break;
			}
		}

		if ( children[i].nodeName === "BUTTON" && !alreadhClicked ) {
			if ( children[i].innerText ) {

				if ( children[i].innerText !== targetButton ) {
					grayButton( children[i] );
				} else {
					blueButton( children[i] );
				}
				children[i].classList.remove( "ac-pushButton" );
				children[i].classList.add( "old-button" );
				setTimeout( function() {
					if ( children[i] != null ) {
						children[i].onclick = "null";
					}
				}, 50 );
				children[i].removeEventListener( "click", selectOption );
				children[i].style.outline = "none";
				children[i].style.cursor = "not-allowed";
			}
		}
	}
}

function disableButtons( targetButton ) {
	var alreadyClicked = false;
	for ( var j = 0; j < targetButton.classList.length; j++ ) {
		if ( targetButton.classList[j] === "old-button" || targetButton.classList[j] === "expandable" ) {
			alreadyClicked = true;
			break;
		}
	}
	for ( var k = 0; k < targetButton.parentNode.classList.length; k++ ) {
		if ( targetButton.parentNode.classList[k] === "old-button" || targetButton.parentNode.classList[k] === "expandable" ) {
			alreadyClicked = true;
			break;
		}
	}

	if ( alreadyClicked ) {
		return;
	}

	blueButton( targetButton );
	targetButton.classList.add( "old-button" );
	targetButton.parentNode.parentNode.parentNode.parentNode.style.cursor = "not-allowed";
	var allChildren = targetButton.parentNode.childNodes;

	for ( let i = 0; i < allChildren.length; i++ ) {
		if ( allChildren[i].innerText ) {
			if ( allChildren[i].innerText !== targetButton.innerText ) {
				grayButton( allChildren[i] );
			}
			allChildren[i].classList.remove( "ac-pushButton" );
			allChildren[i].classList.add( "old-button" );
			allChildren[i].onclick = "null";
			allChildren[i].removeEventListener( "click", selectOption );
			allChildren[i].style.outline = "none";
			allChildren[i].style.cursor = "not-allowed";
		}
	}
}
