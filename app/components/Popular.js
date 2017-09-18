var React = require("react");
var PropTypes = require("prop-types");
var api = require("../utils/api");
var Loading = require("./Loading");


function SelectLang (props) {
        var languages = ["All", "Ruby", "Python", "Java", "JavaScript"];
        return (
        <ul className="languages">
            {languages.map(function (lang) {
                return(
                    <li style = {lang === props.selectedLang ? {color:'#d0030b'}: null}
                        onClick={props.onSelect.bind(null, lang)}
                        key={lang}>
                        {lang}
                    </li>
                )
            })}
        </ul>
    )}

    function RepoGrid(props) {
        return (
            <ul className="popular-list">
                {props.repos.map(function (repo, index) {
                    return (
                        <li key={repo.name} className="popular-item">
                            <div className="popular-rank">#{index+1}</div>
                            <ul className="space-list-items">
                                <li>
                                    <img
                                    className="avatar"
                                    src={repo.owner.avatar_url}
                                    alt={'Avatar for ' + repo.owner.login}
                                    />
                                </li>
                                <li><a href={repo.html_url}>{repo.name}</a></li>
                                <li>@{repo.owner.login}</li>
                                <li>{repo.stargazers_count} stars</li>
                            </ul>
                        </li>
                    )
                })}
            </ul>
        )
    }

SelectLang.propTypes = {
  selectedLang: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
};

class Popular extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedLang: "All",
            repos: null
        };
        this.updateLang = this.updateLang.bind(this);
    }
    componentDidMount(){
        this.updateLang(this.state.selectedLang);
    }
    updateLang(lang){
        this.setState(function () {
            return {
                selectedLang: lang,
                repos: null
            };
        });

        api.fetchPopularRepos(lang)
            .then(function (repos) {
                this.setState(function () {
                    return {
                        repos: repos
                    }
                })
            }.bind(this));
    }
    render() {
        return (
            <div>
                <SelectLang
                    selectedLang={this.state.selectedLang}
                    onSelect={this.updateLang}
                />
                {!this.state.repos ? <Loading /> :
                <RepoGrid repos={this.state.repos}/> }
            </div>
        )
    }
}

module.exports = Popular;