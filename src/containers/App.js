import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import Header from '../components/Header';
import './App.css';
import { setSearchField, requestRobots } from '../actions';

const mapStateToProps = state => {
	return {
		searchField: state.searchRobots.searchField,
		isPending: state.requestRobots.isPending,
		robots: state.requestRobots.robots,
		error: state.requestRobots.error
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
		onRequestRobots: () => dispatch(requestRobots())
	}
}

class App extends Component {

	componentDidMount() {
		this.props.onRequestRobots();
		
	}

	render() {
		const { searchField, onSearchChange, isPending, robots } = this.props;
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase());
		});
		return isPending ?
			<h1 className='tc'>Loading robots...</h1> :
			(
				<div className='tc'>
					<Header />
					<SearchBox searchChange={ onSearchChange }/>
					<Scroll>
						<ErrorBoundry>
							<CardList robots={ filteredRobots }/>
						</ErrorBoundry>
					</Scroll>
				</div>
			)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);