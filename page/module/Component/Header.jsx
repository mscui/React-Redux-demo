import 'Header.css';
import { fetchVolume, fetchList, setQueryParams, fetchBaseData } from '/page/module/Actions/Actions.jsx';

let Navbar = ReactBootstrap.Navbar;
let FormGroup = ReactBootstrap.FormGroup;
let FormControl = ReactBootstrap.FormControl;
let Button = ReactBootstrap.Button;
let Nav = ReactBootstrap.Nav;
let NavItem = ReactBootstrap.NavItem;
let MenuItem = ReactBootstrap.MenuItem;
let NavDropdown = ReactBootstrap.NavDropdown;

export default class Header extends React.Component{
    constructor(props) {
        super(props);
        this.formatSearchValue = this.formatSearchValue.bind(this);
    }
    formatSearchValue(value) {
        let str = value.replace(/\s+/g,'').replace(/\，+/g, ',');
        return str;
    }
    handleChange(e) {
        this.props.setQueryParams(e.target.value);
    }
    handleKeyPress(e) {
        if(e.key == 'Enter'){
            let str = this.formatSearchValue(ReactDOM.findDOMNode(this.searchInput).value);
            this.props.setQueryParams(str);

            if (this.props.name === 'voice') {
                // this.props.fetchList(pageNo)
                this.props.fetchList({pageNo: 1});
                this.props.fetchVolume();
            } else if (this.props.name === 'data') {
                // this.props.fetchBaseData(pageNo)
                this.props.fetchBaseData({pageNo: 1});
            }
        }

    }
    onSearchQuery() {
        let str = this.formatSearchValue(ReactDOM.findDOMNode(this.searchInput).value);
        this.props.setQueryParams(str);
        if (this.props.name === 'voice') {
            this.props.fetchList({pageNo: 1});
            this.props.fetchVolume();
        } else if (this.props.name === 'data') {
            this.props.fetchBaseData({pageNo: 1});
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.name === 'voice' || this.props.name === 'data') {
            ReactDOM.findDOMNode(this.searchInput).value = nextProps.query;
        }
    }
    componentDidMount() {
        if (this.props.name === 'voice' || this.props.name === 'data') {
            ReactDOM.findDOMNode(this.searchInput).value = this.props.query;
        }
    }
    render() {
        return (
            <Navbar inverse>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#" id="voice-icon">demo产品</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Nav activeKey={+this.props.activeKey}>
                    <Navbar.Form pullLeft>
                        <FormGroup>
                            <FormControl
                                bsStyle="custom"
                                type="text"
                                placeholder="输入搜索关键词"
                                ref={(input) => { this.searchInput = input; }}
                                onKeyPress={this.handleKeyPress.bind(this)}/>
                        </FormGroup>
                        {' '}
                        <Button type="submit" onClick={this.onSearchQuery.bind(this)}>Submit</Button>
                    </Navbar.Form>
                    <NavItem eventKey={1} href="/page/data/data.html">基础能力</NavItem>
                    <NavDropdown eventKey={2} title="A模块" id="basic-nav-dropdown">
                        <MenuItem eventKey={2.1}>A模块对比</MenuItem>
                    </NavDropdown>
                    <NavDropdown eventKey={3} title="B模块" id="basic-nav-dropdown">
                        <MenuItem href="/page/voice/voice.html" eventKey={3.1}>B趋势</MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar>
        )
    }
}
const mapStateToProps = state => {
    return {
        query: state.query
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchVolume: Redux.bindActionCreators(fetchVolume, dispatch),
        fetchList: Redux.bindActionCreators(fetchList, dispatch),
        setQueryParams: Redux.bindActionCreators(setQueryParams, dispatch),
        fetchBaseData: Redux.bindActionCreators(fetchBaseData, dispatch)
    }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Header)