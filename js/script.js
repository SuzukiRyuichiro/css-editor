// States
import state from "./state.js"
import toKebab from "./toKebab.js"

const attributes = ["padding", "backgroundColor", "color", "fontSize"]

const blocks = [
	document.getElementById("block1"),
	document.getElementById("block2"),
	document.getElementById("block3"),
]

attributes.forEach((attribute) => {
	window[`${attribute}Editor`] = document.getElementById(
		`${toKebab(attribute)}-editor`
	)
})

const indicator = document.getElementById("current")

blocks.forEach((block, index) => {
	// Initialize the state with the default values that is already written in the html
	attributes.forEach((attribute) => {
		state[`block${index + 1}`][attribute] = block.style[attribute]
	})

	block.addEventListener("click", () => {
		state.currentBlock = parseInt(block.id.slice(-1), 10) // get integer of `block1` => 1
		indicator.innerText = state.currentBlock

		// Update the editor values to match the current block
		attributes.forEach((attribute) => {
			eval(
				`${attribute}Editor.value = state.block${state.currentBlock}.${attribute}`
			)
		})
	})
})

// Function to update the state and the style
const update = (event, attribute) => {
	state[`block${state.currentBlock}`][attribute] = event.target.value
	blocks[state.currentBlock - 1].style[attribute] = event.target.value
}

// Add event listeners
attributes.forEach((attribute) => {
	window[`${attribute}Editor`].addEventListener("input", (event) =>
		update(event, attribute)
	)
})

blocks[0].click()
