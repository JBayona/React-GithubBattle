var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');

//Que define un componente
/*
1. State
2. LifeCycle events
3. UI
*/

//Stateless, no tiene estado
function SelectedLanguage(props){
	var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
	return (
		<ul className= "languages">
     	{
     		languages.map(lang => {
     			return <li key = {lang}
     								 style = {lang === props.selectedLanguage ? {color : '#d0021b'} : null}
     								 onClick = {props.onSelect.bind(null, lang)}>{lang}</li>
     		})
     	} 	
    </ul>
  );
}

function RepoGrid(props){
	return (
		<ul className = 'popular-list'>
			{props.repos.map((repo, index) => {
				return (
					<li key={repo.name} className='popular-item'>
						<div className="popular-rank">#{index+1}</div>
						<ul className="space-list-items">
							<li>
								<img 
										className = "avatar"
										src={repo.owner.avatar_url}
										alt={'Avatar for ' + repo.owner.login}/>
							</li>
							<li>
								<a href ={repo.html_url}>{repo.name}</a>
							</li>
							<li>@{repo.owner.login}</li>
							<li>{repo.stargazers_count} stars</li>
						</ul>
					</li>
				);
			})}
		</ul>
	);
}

RepoGrid.propTypes = {
	repo: PropTypes.array.isRequired
}

SelectedLanguage.propTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired
}

class Popular extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			selectedLanguage: 'All',
			repos: null
		};
		//this.updateLanguage = this.updateLanguage.bind(this);
	}
	componentDidMount(){
		//AJAX
		this.updateLanguage(this.state.selectedLanguage);
	}
	updateLanguage(lang){
		this.setState({
			selectedLanguage: lang,
			repos: null
		});

		api.fetchPopularRepos(lang)
				.then(function(response){
					this.setState(function(){
						return {
							repos: response
						}
					});
				}.bind(this));
	}
  render() {
    return (
      <div>
      	<SelectedLanguage 
      		selectedLanguage= {this.state.selectedLanguage}
      		onSelect= {this.updateLanguage.bind(this)}/>
      	{!this.state.repos ? <p>LOADING</p> : <RepoGrid repos={this.state.repos} />}
      </div>
    )
  }
}

module.exports = Popular;