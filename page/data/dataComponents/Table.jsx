import 'Table.css';
import { setPageParams, fetchBaseData } from '/page/module/Actions/Actions.jsx';

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
        // console.log(eventKey);
        this.props.fetchBaseData();
    }
    render() {
        // console.log(this.props.lists);
        return (
            <div>

                <Table striped bordered condensed hover>
                    <thead>
                      <tr>
                        <th>event_day</th>
                        <th>key_word</th>
                        <th>type</th>
                        <th>attr</th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.baseData.map((item, index)=>{
                                return (
                                    <tr key={index}>
                                        <td>{item.event_day}</td>
                                        <td>{item.key_word}</td>
                                        <td>{item.type}</td>
                                        <td>{item.attr}</td>
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
                    className='data-pagination'
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
        baseData: state.baseData.baseData
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setPageParams: Redux.bindActionCreators(setPageParams,dispatch),
        fetchBaseData: Redux.bindActionCreators(fetchBaseData, dispatch)
    }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Tables)