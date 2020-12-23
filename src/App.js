import React, {useState, useEffect, useRef} from "react"
import iro from "@jaames/iro"

import "./App.css"


function App() {
	const [colorsForShow, setColorsForShow] = useState([
		{h: 0, s: 100, l: 50},
		{h: 120, s: 100, l: 50}
	])
	const wheelColorPicker = useRef(null)
	const wheelContainer = useRef(null)

	useEffect(() => {
		function onColorChange(color) {
			let newTempColorForShow = [...colorsForShow]
			switch (color.index) {
				case 0:
					newTempColorForShow[0] = Object.assign({}, newTempColorForShow[0], {h: color.hue, s: color.saturation})
					break
				case 1:
					newTempColorForShow[1] = Object.assign({}, newTempColorForShow[1], {h: color.hue, s: color.saturation})
					break
				default:
					break
			}
			setColorsForShow(newTempColorForShow)
		}

		wheelColorPicker.current = new iro.ColorPicker(wheelContainer.current, {
			width: 250,
			colors: colorsForShow,
			borderWidth: 0,
			borderColor: "transparent",
			handleRadius: 15,
			layout: [
				{
					component: iro.ui.Wheel
				}
			]
		})
		wheelColorPicker.current.on("color:change", onColorChange)
	}, [wheelColorPicker, wheelContainer])

	const renderGradientBox = () => {
		let output = []
		for (let i = 0; i <= 30; i++) {
			let hue0 = colorsForShow[0].h
			let hue1 = colorsForShow[1].h
			let hue = ((i / 30) * (hue1 - hue0)) + hue0
			output.push(<li style={{ background: `hsl(${hue}, 100%, 50%)` }} />)
		}
		return output.map(i => i)
	}

	return (
		<div className='App' style={{display: "flex"}}>
			<div className="color-wrapper">
				<div style={{ color: '#fff', fontSize: 20 }} className="east-div">0</div>
				<div style={{ color: '#fff', fontSize: 20 }} className="west-div">180</div>
				<div style={{ color: '#fff', fontSize: 20 }} className="north-div">270</div>
				<div id='picker' ref={wheelContainer}/>
				<div style={{ color: '#fff', fontSize: 20 }} className="south-div">90</div>
			</div>
			<ul className="gradient-list">{renderGradientBox()}</ul>
		</div>
	)
}

export default App
