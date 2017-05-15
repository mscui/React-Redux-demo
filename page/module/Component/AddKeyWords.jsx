import 'AddKeyWords.css';
import { fetchVolume, fetchList, setQueryParams, fetchBaseData } from '/page/module/Actions/Actions.jsx';

let Button = ReactBootstrap.Button;
let FormControl = ReactBootstrap.FormControl;

export default class AddKeyWords extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            valueArr: this.props.query.split(',')
        }
        this.formatSearchValue = this.formatSearchValue.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }
    formatSearchValue(value) {
        let str = value.replace(/\s+/g,'');
        return str;
    }
    onClickAddKeyWords() {
        let arr = this.state.valueArr;
        arr.push('');
        this.setState({
            valueArr: arr
        });
    }
    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.onSearchQuery();
        }
    }
    onSearchQuery() {

        let queryArray = [];
        for (let i = 0; i < this.state.valueArr.length; i++) {
            let refsValue = ReactDOM.findDOMNode(this.refs["itemInput" + i]).value;
            if (refsValue !== '') {
                queryArray.push(refsValue);
            }
        }

        if (String(queryArray.valueOf()) === String(this.props.query.split(',').valueOf())) {
            this.setState({
                valueArr: queryArray
            });
        }
        this.props.setQueryParams(queryArray.join(','));
        if (this.props.name === 'voice') {
            this.props.fetchList({pageNo: 1});
            this.props.fetchVolume();
        } else if (this.props.name === 'data') {
            this.props.fetchBaseData({pageNo: 1});
        }
    }
    handleChange(index, e) {
        let itemArr = this.state.valueArr;
        itemArr[index] = e.target.value;
        this.setState({
           valueArr: itemArr
        });
    }
    removeItem(index) {
        let queryArray = this.state.valueArr;
        queryArray.splice(index, 1);
        this.setState({
            valueArr: queryArray
        });
        this.props.setQueryParams(queryArray.join(','));
        if (this.props.name === 'voice') {
            this.props.fetchList();
            this.props.fetchVolume();
        } else if (this.props.name === 'data') {
            this.props.fetchBaseData();
        }
    }
    componentWillReceiveProps(nextProps) {

        let propsArr = nextProps.query.split(',');
        this.setState({
           valueArr: propsArr
        });
    }
    componentDidMount() {
        let strArray = this.props.query.split(',');

        strArray.map((item, index) => {
            ReactDOM.findDOMNode(this.refs["itemInput"+index]).value = item;
        });
    }
    render() {

        return (
            <div>
                {
                    this.state.valueArr.map((item, index)=>{
                        return(
                                <div key={index} className="addkeywords-wrapper">
                                    <div className="addkeywords">
                                        <FormControl
                                            key={index}
                                            type="text"
                                            ref={"itemInput" + index}
                                            value={item}
                                            onChange={(e) => this.handleChange(index, e)}
                                            className="addkeywords-input"
                                            onKeyPress={this.handleKeyPress.bind(this)}
                                          />
                                          {(()=>{
                                                if (this.state.valueArr.length > 1) {
                                                    return <span className="addkeywords-input-remove" onClick={() => this.removeItem(index)}>x</span>
                                                }
                                            })()}

                                    </div>


                                        {(()=>{
                                            if (index < this.state.valueArr.length - 1) {
                                                return <span className="addkeywords-input-addicon">+</span>
                                            }
                                        })()}

                                </div>
                        )
                    })
                }
                <Button
                    className="addkeywords-btn"
                    onClick={this.onClickAddKeyWords.bind(this)}>+添加对比词</Button>
                <span onClick={this.onSearchQuery.bind(this)}>确定</span>
            </div>
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

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(AddKeyWords)