
import { fetchList, fetchVolume } from '/page/module/Actions/Actions.jsx';
import 'App.css';
import Header from '/page/module/Component/Header.jsx';
import AddKeyWords from '/page/module/Component/AddKeyWords.jsx';
import Charts from 'components/Charts.jsx';
import Filter from 'components/Filter.jsx';
import Tables from 'components/Table.jsx';


class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          // activePage: 1
      }
  }

  componentDidMount() {

    this.props.fetchList();
    this.props.fetchVolume();

  }
  render() {
    let list = '';

    if (this.props.list.length !== 0) {

        list = this.props.list.map((item, index) => {
                    return (<li key={index}>{item.pv}</li>);
                });
    }
    return (
      <div className="voice">
            <div className="voice-header">
                <Header name="voice" activeKey="3.1"/>
            </div>
            <div className="voice-main">
                <div>
                    <AddKeyWords name="voice"/>
                    <div className="voice-filter">
                        <Filter/>
                    </div>
                </div>
                <div>
                    <div className="voice-charts">
                        {
                            (()=>{
                                if (this.props.volumeCharts.length !== 0) {
                                    return <Charts/>
                                } else {
                                    return <div style={{margin: '20px auto', textAlign: 'center'}}>抱歉，没有数据！</div>
                                }
                            })()
                        }
                    </div>
                    <div>
                        {
                            (()=>{
                                if (this.props.list.length !== 0) {
                                    return <Tables data={list}/>
                                }
                            })()
                        }
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

const mapStateToProps = state => {
    return {
        list: state.data.lists,
        volumeCharts: state.volumeChart.volumeChart
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchList: Redux.bindActionCreators(fetchList, dispatch),
        fetchVolume: Redux.bindActionCreators(fetchVolume, dispatch)
    }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App)