import React from 'react';
import { Text, View, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Markdown from 'react-native-simple-markdown';

class Order extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			options: this.props.options,
			selectedOrder: [],
			currentPointer: 0
		};
	}

	componentWillMount() {
		this.props = {
			...this.props,
			...this.getNavigationParams
		};
	}

	getNavigationParams() {
		return this.props.navigation.state.params || {};
	}

	checkAnswer(actualSolution, userSolution) {
		console.log(actualSolution, userSolution);
		if (JSON.stringify(actualSolution) == JSON.stringify(userSolution)) {
			this.props.showResult({ correct: true, message: 'Solid ordering!' });
			this.props.changeScore(true);
		} else {
			this.props.showResult({ correct: false, message: 'Sorry, wrong order.' });
			this.props.changeScore(false);
		}
	}

	updateViewAndUpdateSolution(originalIdx) {
		// undo
		if (this.state.selectedOrder[originalIdx] || this.state.selectedOrder[originalIdx] === 0) {
			// can only select the last one
			// originalIdx starts at 0, currentPointer is 1 ahead
      console.log(this.state.selectedOrder[originalIdx], this.state.currentPointer);  // 0, 1
      // if the previously selected position(+1) does not equal the current pointer
      // meaning it is not the last selection
			if (this.state.selectedOrder[originalIdx]+1 !== this.state.currentPointer) {
				return;
			}

			// if selected, unselect
			delete this.state.selectedOrder[originalIdx];
			this.setState({ currentPointer: this.state.currentPointer - 1 });
		} else {
			// set order
			console.log(`setting index ${originalIdx} to ${this.state.currentPointer}`);
			this.state.selectedOrder[originalIdx] = this.state.currentPointer;
			this.setState({ currentPointer: this.state.currentPointer + 1 });
		}

		if (this.state.selectedOrder.length === this.state.options.length) {
			this.checkAnswer(this.props.solution, this.state.selectedOrder);
		}
	}

	render() {
		return (
			<View>
				<View style={{ marginBottom: 20, padding: 20 }}>
					<Markdown>
						### Tap on the below steps in the order they occur for *
						{this.props.question}*
					</Markdown>
				</View>
				{this.state.options.map((text, originalIdx) => {
					const title =
						this.state.selectedOrder[originalIdx] || this.state.selectedOrder[originalIdx] == 0
							? `${this.state.selectedOrder[originalIdx]+1}. ${text}`
							: text;

					return (
						<View key={originalIdx} style={{ marginBottom: 20 }}>
							<Button
								small
								raised
								onPress={() => this.updateViewAndUpdateSolution(originalIdx)}
								backgroundColor="#303952"
								title={title}
							/>
						</View>
					);
				})}
				{this.props.questionImage && (
					<Image
						source={{ uri: this.props.questionImage }}
						style={{
							width: 200,
							height: 200,
							resizeMode: 'contain',
							alignSelf: 'center'
						}}
					/>
				)}
			</View>
		);
	}
}

export default Order;
