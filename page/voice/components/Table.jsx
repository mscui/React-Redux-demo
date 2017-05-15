import 'Table.css';
import { setPageParams, fetchList } from '/page/module/Actions/Actions.jsx';

let Table = ReactBootstrap.Table;
let Pagination = ReactBootstrap.Pagination;


class Tables extends React.Component{
    constructor(props) {
        super(props);
    }
    handleSelect(eventKey) {
        this.props.setPageParams({
            pageNo: eventKey
        });
        this.props.fetchList();
    }
    render() {
        return (
            <div>

                <Table striped bordered condensed hover>
                    <thead>
                      <tr>
                        <th>event_day</th>
                        <th>query</th>
                        <th>source</th>
                        <th>uv</th>
                        <th>pv</th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.lists.map((item, index)=>{
                                return (
                                    <tr key={index}>
                                        <td>{item.event_day}</td>
                                        <td>{item.query}</td>
                                        <td>{item.source}</td>
                                        <td>{item.uv}</td>
                                        <td>{item.pv}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
                <Pagination
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    className='voice-pagination'
                    items={Math.ceil(+this.props.totalCount/+this.props.pageSize)}
                    maxButtons={5}
                    activePage={this.props.pageNo}
                    onSelect={this.handleSelect.bind(this)} />
            </div>

        )
    }
}
const mapStateToProps = state => {
    return {
        pageSize: state.page.pageSize,
        pageNo: state.page.pageNo,
        totalCount: state.page.totalCount,
        lists: state.data.lists

    }
}
const mapDispatchToProps = dispatch => {
    return {
        setPageParams: Redux.bindActionCreators(setPageParams,dispatch),
        fetchList: Redux.bindActionCreators(fetchList, dispatch)
    }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Tables)