
import { fetchBaseData } from '/page/module/Actions/Actions.jsx';
import 'DataApp.css';
import Header from '/page/module/Component/Header.jsx';
import AddKeyWords from '/page/module/Component/AddKeyWords.jsx';

import Tables from 'dataComponents/Table.jsx';
import Filter from 'dataComponents/Filter.jsx';


class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          // activePage: 1
      }
  }

  componentDidMount() {
    this.props.fetchBaseData();

  }
  render() {
    let list = '';

    if (this.props.baseData.length !== 0) {

        list = this.props.baseData.map((item, index) => {
                    return (<li key={index}>{item.pv}</li>);
                });
    }
    return (
      <div className="data">
            <div className="data-header">
                <Header name="data" activeKey={1}/>
            </div>
            <div className="data-main">
                <div className="data-control">
                    <AddKeyWords name="data"/>
                    <div className="data-filter">
                        <Filter/>
                    </div>
                </div>
                <div className="data-table">
                    <div>
                        <Tables data={list}/>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

const mapStateToProps = state => {
    return {
        baseData: state.baseData.baseData
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchBaseData: Redux.bindActionCreators(fetchBaseData, dispatch)
    }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App)